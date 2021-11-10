const getSetupSSE =
  (chat, listenerTuples, onConnectTuples, onCloseTuples) => (req, res) => {
    /*Maintains connection.---------------------*/
    const pump = () => {
      res.write("\n");
    };
    const hbt = setInterval(pump, 30000);

    /* Iterate over the listeners -- each a 3-tuple [eventPrefix, paramKey, callback] */
    listenerTuples.forEach((listenerTuple) => {
      chat.on(
        `${listenerTuple.prefix}-${req.params[listenerTuple.paramKey]}`,
        listenerTuple.callback(res)
      );
    });

    onConnectTuples.forEach((connectTuple) => {
      chat.emit(`${connectTuple.prefix}-${req.params[connectTuple.paramKey]}`, [
        ...connectTuple.payload.paramKeys.map((pk) => req.params[pk]),
        connectTuple.payload.key,
      ]);
    });

    res.on("close", () => {
      /*Clear the heartbeat--------------------*/
      console.log("EventSource stream closed.");
      clearInterval(hbt);
      /*---------------------------------------*/

      /*Cleanup listeners----------------------*/
      listenerTuples.forEach((listenerTuple) => {
        chat.removeListener(
          `${listenerTuple.prefix}-${req.params[listenerTuple.paramKey]}`,
          listenerTuple.callback
        );
      });
      /*----------------------------------------*/

      /*Fire onClose events------------------*/
      onCloseTuples.forEach((closeTuple) => {
        chat.emit(`${closeTuple.prefix}-${req.params[closeTuple.paramKey]}`, [
          ...closeTuple.payload.paramKeys.map((pk) => req.params[pk]),
          closeTuple.payload.key,
        ]);
      });
      /*----------------------------------------*/
    });
  };

module.exports = { getSetupSSE };

const getSetupSSE =
  (
    chat,
    listenerTuples,
    onConnectTuples,
    onCloseTuples,
    onOpenFire,
    onCloseFire,
    Agent,
    Channel
  ) =>
  (req, res) => {
    /*Maintains connection.---------------------*/
    const pump = () => {
      res.write("\n");
    };
    const hbt = setInterval(pump, 3000);

    /*Any functions we need to run on launch fire here.*/
    if (onOpenFire) {
      onOpenFire.forEach((func) => {
        let args = func.args.map((arg) => eval(arg));
        let temp = func.callback(...args);
        temp();
      });
    }

    /* Iterate over the listeners -- each a 3-tuple [eventPrefix, paramKey, callback] */
    listenerTuples.forEach((listenerTuple) => {
      console.log(
        `Setting up listener: ${listenerTuple.prefix}-${
          req.params[listenerTuple.paramKey]
        }`
      );
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
      if (onCloseFire) {
        onCloseFire.forEach((func) => {
          let args = func.args.map((arg) => eval(arg));
          let temp = func.callback(...args);
          temp();
        });
      }

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

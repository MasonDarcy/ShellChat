module.exports = errorTool = {
  error400: (err, res) => {
    console.log(err.type);
    console.log(err.message);
    console.log(err.stack);
    return res.status(400).json({
      errorMessage: err.message,
      errorName: err.name,
      errorStack: err.stack,
    });
  },
};

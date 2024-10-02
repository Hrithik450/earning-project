const CatchAsyncError = (Func) => (req, res, next) => {
  Promise.resolve(Func(req, res, next)).catch(next);
};

module.exports = {
  CatchAsyncError,
};

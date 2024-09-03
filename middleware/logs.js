const myLogger = (req, res, next) => {
  const {method, ip, originalUrl} = req;
  console.log(method, ip, originalUrl);
  next();
}

module.exports = myLogger;
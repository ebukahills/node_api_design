const morgan = require('morgan');

exports.createMiddleware = (...args) => morgan(...args);

exports.formatLog = (data, req, res) => {
  let obj = {};

  obj.url = req.path;
  // obj.params = req.params;
  obj.query = req.query;
  obj.body = req.body;
  obj.response = JSON.parse(res.body || '{}');
  obj.status = res.statusCode;
  obj.responseTime = res._responseTime;

  return JSON.stringify(obj, null, 4);
};

exports.log = data => console.log(data);

exports.streamLog = {
  write: data => console.log(data),
};

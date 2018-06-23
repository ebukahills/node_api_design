exports.captureResponseBody = (req, res, next) => {
  const originalWrite = res.write;
  const originalEnd = res.end;

  // Start Response Timer
  req._requestTime = Date.now();

  // Chunks array to store response body
  let chunks = [];

  // Stream write
  res.write = function(chunk) {
    chunks.push(chunk);
    // Write Response Stream
    originalWrite.apply(res, arguments);
  };

  // End response
  res.end = function(chunk) {
    if (chunk) chunks.push(chunk);
    // End response cycle
    originalEnd.apply(res, arguments);
    321;

    res._responseTime = Date.now() - req._requestTime;

    const body = Buffer.concat(chunks).toString('utf8');
    res.body = body;
  };

  next();
};

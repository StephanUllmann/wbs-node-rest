export const respond = (res, statusCode, contentType, data) => {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', contentType);
  res.end(JSON.stringify(data));
};

export const respond = (res, statusCode, contentType, data) => {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', contentType);
  if (contentType === 'application/json') res.end(JSON.stringify(data));
  else res.end(data);
};

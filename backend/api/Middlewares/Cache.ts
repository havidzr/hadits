import { Request, Response, NextFunction } from 'express';

const cache: any = {};

export default (req: Request, res: Response, next: NextFunction) => {
  if (req.method !== 'GET') {
    return next();
  }

  const key = req.originalUrl;

  // Set Cache-Control headers
  res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=86400, stale-while-revalidate');

  // Check if the response is already cached
  if (cache[key]) {
    res.setHeader('Content-Type', cache[key].contentType);
    return res.status(cache[key].status).send(cache[key].body);
  }

  const originalSend = res.send.bind(res);
  const originalStatus = res.status.bind(res);

  let statusToCache = 200;

  res.status = (statusCode: number) => {
    statusToCache = statusCode;
    return originalStatus(statusCode);
  };

  res.send = (body: any) => {
    if (statusToCache === 200) {
      cache[key] = {
        body,
        contentType: res.get('Content-Type') || 'application/json',
        status: statusToCache,
      };
    }
    return originalSend(body);
  };

  next();
};
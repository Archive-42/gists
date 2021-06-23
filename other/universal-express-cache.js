
// thanks to: https://github.com/rakshans1/express-memory-cache/blob/master/lib/cache.js
// simpler than using on-headers package
// alternative for memory/redis: https://github.com/kwhitley/apicache
module.exports = function createExpressGetCache({get,put}) {
  
  function cache (duration) {
    duration = duration || defaultDuration;
  
    return (req, res, next) => {
      let key = req.originalUrl || req.url
      let cachedBody = get(key, res)
      if (cachedBody) {
        res.send(cachedBody);
        return
      } else {
        res.originalSend = res.send;
        res.send = (body) => {
          put(key, body, duration);
          res.originalSend(body)
        }
        next()
      }
    }
  }
  return cache;
}
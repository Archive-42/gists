/*
USAGE: similar to https://github.com/kwhitley/apicache
  const app = express();
  app.get('/api', cache(1000), apiRouteHandler);
*/

const createExpressCache = require('./universal-express-cache');

module.exports = function createExpressCacheMemory () {
  const cache;
  cache = createExpressCache({

    put (key, value, duration) {
      cache.data[key] = {value, expireTime: Date.now()+duration }
    },

    get (key, res) {
      if (!cache.data[key]) { return null };
      if (cache.data[key].expireTime < Date.now()) {
        delete cache.data[key];
        return null;
      }
      //res.setHeader('Express-Cache', 'true')
      return cache.data[key];
    }

  });

  cache.data = {};

  return cache;
}
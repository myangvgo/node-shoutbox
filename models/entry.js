const redis = require('redis');
const db = redis.createClient();

class Entry {
  constructor(obj) {
    // traverse to pass the keys in the object
    for (let key in obj) {
      this[key] = obj[key];
    }
  }

  /**
   * Get posts from a specific range
   * @param {int} from 
   * @param {int} to 
   * @param {Function} cb 
   */
  static getRange (from, to, cb) {
      db.lrange('entries', from, to, (err, items) => {
          if (err) return cb(err);
          let entries = [];
          items.forEach(item => {
              entries.push(JSON.parse(item));
          });
          cb(null, entries);
      })
  }

  save(cb) {
    const entryJSON = JSON.stringify(this);
    db.lpush('entries', entryJSON, err => {
      if (err) return cb(err);
      cb();
    });
  }
}

module.exports = Entry;
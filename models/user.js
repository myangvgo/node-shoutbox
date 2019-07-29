const redis = require('redis');
const bcrypt = require('bcrypt');
const db = redis.createClient();

class User {
    constructor(obj) {
        for (let key in obj) {
            this[key] = obj[key];
        }
    }

    save(cb) {
        if (this.id) {
            this.update(cb);
        } else {
            db.incr('user: ids', (err, id) => {
                if (err) return cb(err);
                this.id = id;
                this.hashPassword(err => {
                    if (err) return cb(err);
                    this.update(cb);
                });
            });
        }
    }

    update(cb) {
        const id = this.id;
        db.set(`user:id:${this.name}`, id, err => {
            if (err) return cb(err);
            db.hmset(`user:${id}`, this, err => {
                cb(err);
            });
        });
    }

    hashPassword(cb) {
        bcrypt.genSalt(12, (err, salt) => {
            if (err) return cb(err);
            this.salt = salt;

            // need to make sure this.pass is not null or undefined
            // otherwise will get Error: data and salt arguments required
            // TODO: need some validation check here
            bcrypt.hash(this.pass, salt, (err, hash) => {
                if (err) return cb(err);
                this.pass = hash;
                cb();
            });
        });
    }

    static getByName(name, cb) {
        // get user id by name
        User.getId(name, (err, id) => {
            if (err) return cb(err);
            // get user by id
            User.get(id, cb);
        });
    }

    /**
     * get the ID indexed by name
     * @param {*} name
     * @param {*} cb
     */
    static getId(name, cb) {
        db.get(`user:id:${name}`, cb);
    }

    /**
     * get the hash of a normal object
     * @param {*} id
     * @param {*} cb
     */
    static get(id, cb) {
        db.hgetall(`user:${id}`, (err, user) => {
            if (err) return cb(err);
            cb(null, new User(user)); // cast the object to a User object
        });
    }

    /**
     * authenticate user
     * @param {*} name
     * @param {*} pass
     * @param {*} cb
     */
    static authenticate(name, pass, cb) {
        User.getByName(name, (err, user) => {
            if (err) return cb(err);
            if (!user.id) return cb();
            bcrypt.hash(pass, user.salt, (err, hash) => {
                if (err) return cb(err);
                // user found
                if (hash == user.pass) return cb(null, user);
                // invalid password if not found
                cb();
            });
        });
    }

    // remove some sensitive data, like password and salt
    // this will override the default toJSON method when JSON.stringify is called to return JSON data
    toJSON() {
        return {
            id: this.id,
            name: this.name,
        }
    }
}

module.exports = User;

const User = require('../models/user');

module.exports = (req, res, next) => {
    if(req.remoteUser) {
        res.locals.user = req.remoteUser;
    }

    // retrieve user id from authenticated user
    const uid = req.session.uid; 
    if (!uid) return next();
    // retrieve user information from redis
    User.get(uid, (err, user) => {
        if (err) return next(err);
        // populate userinfo to response object
        req.user = res.locals.user = user;
        next();
    })
}
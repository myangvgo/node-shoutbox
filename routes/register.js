var express = require('express');
var router = express.Router();
const User = require('../models/user');

router.get('/register', (req, res) => {
    res.render('register', { title: 'Register' });
});

// User Registration Logic
router.post('/register', (req, res, next) => {
    const data = req.body.user;
    User.getByName(data.name, (err, user) => {
        if (err) return next(err);
        if (user.id) {
            res.error('Username already taken');
            res.redirect('back');
        } else {
            user = new User({
                name: data.name,
                pass: data.pass
            });
            // save new user to database
            user.save(err => {
                if (err) return next(err);
                req.session.uid = user.id;
                res.redirect('/');
            });
        }
    });
});

module.exports = router;

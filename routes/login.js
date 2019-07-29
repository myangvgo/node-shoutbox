var express = require('express');
var router = express.Router();
const User = require('../models/user');

// display login form
router.get('/login', (req, res) => {
    res.render('login', { title: 'Login' });
});

// login logic
// 1. check login credentials
// 2. store User ID as session variable
// 3. redirect user to home page after successfully login
router.post('/login', (req, res, next) => {
    const data = req.body.user;
    console.log(data);
    User.authenticate(data.name, data.pass, (err, user) => {
        if (err) return next(err);
        if (user) {
            // valid user, redirect to user list page
            req.session.uid = user.id;
            res.redirect('/');
        } else {
            res.error('Sorry! Invalid credentials.');
            res.redirect('back'); // redirect to login form
        }
    });
});

router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) throw err;
        res.redirect('/');
    });
});

module.exports = router;

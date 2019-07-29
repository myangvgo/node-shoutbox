const auth = require('basic-auth');
const express = require('express');
const User = require('../models/user');
const router = express.Router();
const Entry = require('../models/entry');
const validate = require('../middleware/validate');

router.get('/user/:id', (req, res, next) => {
    User.get(req.params.id, (err, user) => {
        if (err) return next(err);
        if (!user.id) res.status(404).json();
        res.json(user);
    });
});

// TODO: page is not defined
router.get('/entries/:page?', page(Entry.count), (req, res, next) => {
    const page = req.page;
    Entry.getRange(page.from, page.to, (err, entries) => {
        if (err) return next(err);
        res.json(entries);
    });
});

router.post('/auth', (req, res, next) => {
    const { name, pass } = auth(req);
    User.authenticate(name, pass, (err, user) => {
        if (user) req.remoteUser = user; // add remoteUser to request property
        next(err);
    });
});

/* Add a new post and return JSON */
router.post(
    '/entry',
    validate.required('entry[title]'), // add validation middleware
    validate.lengthAbove('entry[title]', 4),
    (req, res, next) => {
        const data = res.body.entry;
        const user = res.locals.user; // TODO: Implement later
        const username = user ? user.name : null;
        const entry = new Entry({
            username: username,
            title: data.title,
            body: data.body
        });
        entry.save(err => {
            if (err) return next(err);
            if (req.remoteUser) {
                res.json({ message: 'Entry Added.' }); // For API
            }
        });
    }
);

module.exports = router;

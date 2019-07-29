var express = require('express');
var router = express.Router();
const Entry = require('../models/entry');
const validate = require('../middleware/validate');

/** GET post form page */
router.get('/post', (req, res) => {
  res.render('post', { title: 'Make a post' });
});

/* GET entries page */
router.get('/posts', function(req, res, next) {
  Entry.getRange(0, -1, (err, entries) => {
    if (err) return next(err);
    res.render('entries', {
      title: 'Entries',
      entries
    });
  });
});

/* GET posts page */
// router.get('/', (req, res, next) => {
//   res.render('post', { title: 'Post' });
// });

/* Add a new post */
router.post(
  '/post',
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
      res.redirect('/');
    });
  }
);

module.exports = router;

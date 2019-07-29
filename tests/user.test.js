const User = require('../models/user');

// test create a User
// const user = new User({ name: 'Tim', pass: 'Cook' });
// user.save(err => {
//   if (err) console.error(err);
//   console.log(`user id %d`, user.id);
// });

// test get User by Name
User.getByName('Tim', (err, user) => {
    if (err) console.log(err);
    console.log(user);
});

// test authenticate
// User.authenticate('tim', 'Cook', (err, user) => {
//     console.log(user);
// });

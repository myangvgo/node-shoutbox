// PRG - Post/Redirect/Get - avoid duplicate post requests
const express = require('express');

// use session to store information across requests
function message(req) {
    return (msg, type) => {
        type = type || 'info';
        let sess = req.session;
        sess.messages = sess.messages || [];
        sess.messages.push({ type: type, string: msg });
    };
}

// message middleware
module.exports = (req, res, next) => {
    console.log(res);
    res.message = message(req);
    res.error = msg => {
        return res.message(msg, 'error');
    };
    // define a messages variable to store the session messages
    res.locals.messages = req.session.messages || [];
    res.locals.removeMessages = () => {
        req.session.messages = [];
    };
    next();
};

const express = require('express');
const passport = require('passport');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const users = require('../controllers/users');

// SIGNIN FORM ROUTE + SIGNIN ROUTE - ROUTER.ROUTE
router.route('/signin')
    .get(users.signinForm)
    .post(catchAsync(users.signin));


// LOGIN FORM ROUTE + LOGIN ROUTE - ROUTER.ROUTE
router.route('/login')
    .get(users.loginForm)
    .post(passport.authenticate('local', {
        failureFlash: true,
        failureRedirect: '/login'
    }), users.login);
     

// LOGOUT ROUTE
router.get('/logout', users.logout);

module.exports = router;
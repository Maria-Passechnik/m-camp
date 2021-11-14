const User = require('../models/user');

// SIGNIN FORM ROUTE
module.exports.signinForm = (req, res) => {
    res.render('users/signin');
}

// SIGNIN ROUTE
module.exports.signin = async (req, res, next) => {
    try{
        const {email, username, password} = req.body;
        const user = new User({email, username});
        const registeredUser = await User.register(user, password);
        // login automaticlly when signin
        req.login(registeredUser, (err)  => {
            if(err){
                return next(err);
            }
            req.flash('success', 'Welcome to M-Camp');
            res.redirect('/campgrounds');
        });
    } catch(e){
        req.flash('error', e.message);
        res.redirect('/signin');
    }
}

// LOGIN FORM ROUTE
module.exports.loginForm = (req, res) => {
    res.render('users/login');
}

// LOGIN ROUTE
module.exports.login = (req, res) => {
    req.flash('success', 'Welcome back');
    const redirectUrl = req.session.returnTo || '/campgrounds';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
}

// LOGOUT ROUTE
module.exports.logout = (req, res) => {
    req.logOut();
    req.flash('success', 'Goodbye');
    res.redirect('/campgrounds');
}
const Campground = require('./models/campground');
const Review = require('./models/review');
const {campgroundSchema, reviewSchema} = require('./schemas');
const ExpressError = require('./utils/ExpressError');

// LOGIN VERIFY MIDDLEWARE
module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        // store user req.url
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'You must be signed in first');
        return res.redirect('/login');
    }
    next();
}

// CAMPGROUND ERROR MIDDLWARE 
module.exports.validateCampground = (req, res, next) => {
    const {error} = campgroundSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}

// CAMPGROUND AUTHORIZATION MIDDLEWARE
module.exports.isAuthor = async (req, res, next) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    if(!campground.author.equals(req.user._id)){
        req.flash('error', 'You do not have promission to do that !');
        return res.redirect(`/campgrounds/${id}`);
    }
    next();
}

// REVIEW AUTHORIZATION MIDDLEWARE
module.exports.isReviewAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if(!review.author.equals(req.user._id)){
        req.flash('error', 'You do not have promission to do that !');
        return res.redirect(`/campgrounds/${id}`);
    }
    next();
}

// REVIEW ERROR MIDDLWARE
module.exports.validateReview = (req, res, next) => {
    const {error} = reviewSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}


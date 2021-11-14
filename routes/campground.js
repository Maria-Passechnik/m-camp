const express = require('express');
const router = express.Router();
const campgrounds = require('../controllers/campgrounds');
const catchAsync = require('../utils/catchAsync');
const {isLoggedIn, isAuthor, validateCampground} = require('../middleware');

// EXPRESS MULTER
const multer  = require('multer');
// CLOUDINARY STORAGE
const {storage} = require('../cloudinary');
const upload = multer({ storage });

// GET ALL CAMPS +  POST A CAMP - ROUTER.ROUTE
router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn, upload.array('image', 12), validateCampground, catchAsync(campgrounds.postCamp))

// CREATE NEW CAMP
router.get('/new', isLoggedIn, campgrounds.newCamp);

// GET CAMP BY ID + UPDATE CAMP BY ID + DELETE CAMP BY ID - ROUTER.ROUTE
router.route('/:id')
    .get(isLoggedIn, catchAsync(campgrounds.showCamp))
    .put(isLoggedIn, isAuthor, upload.array('image') , validateCampground, catchAsync(campgrounds.updateCamp))
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCamp));

    
// EDIT CAMP BY ID
router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.editCamp));

module.exports = router;
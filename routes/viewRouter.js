const express = require('express');
const viewsController = require('./../controllers/viewsControllers');
const authController = require('./../controllers/authController');
const bookingController = require('./../controllers/bookingController');

const router = express.Router();

router.get('/', authController.isLoggedIn, viewsController.getOverview);
router.get('/tour/:slug', authController.isLoggedIn, viewsController.getTour);
router.get('/login', authController.isLoggedIn, viewsController.getLoginForm);
router.get('/sign-up', authController.isLoggedIn, viewsController.getRegisterForm);
router.get('/account', authController.protect, viewsController.getAccount);
router.get('/my-tours', authController.protect, viewsController.getMyTours);

// router.post('/submit-user-data', authController.protect, viewsController.updateUserData);

module.exports = router;

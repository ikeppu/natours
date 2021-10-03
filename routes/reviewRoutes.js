const express = require('express');
const reviewController = require('./../controllers/reviewController');
const authController = require('./../controllers/authController');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(authController.protect, reviewController.getAllReviews)
  .post(authController.protect, authController.restrictTo('user'), reviewController.setTourAndUserIds, reviewController.createReview);

router
  .route(`/:id`)
  .get(reviewController.getReview)
  .patch(authController.protect, authController.restrictTo('user', 'admin'), reviewController.updateReview)
  .delete(authController.protect, authController.restrictTo('user', 'admin'), reviewController.deleteReview);

module.exports = router;

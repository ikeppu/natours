const AppError = require('../utils/AppError');
const Review = require('./../models/reviewModels');
const APIFeatures = require('./../utils/APIFeatures');
const catchAsync = require(`./../utils/catchAsync`);
const HandlerFactory = require('./handlerFactory');

exports.setTourAndUserIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.getAllReviews = HandlerFactory.getAll(Review);
exports.getReview = HandlerFactory.getOne(Review);
exports.createReview = HandlerFactory.createOne(Review);
exports.updateReview = HandlerFactory.uptadeOne(Review);
exports.deleteReview = HandlerFactory.deleteOne(Review);

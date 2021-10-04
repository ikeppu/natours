const express = require('express');
const multer = require('multer');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

const upload = multer({ dest: 'public/img/users' });

const router = express.Router();

router.post('/login', authController.login);
router.post('/signup', authController.signup);
router.get('/logout', authController.logout);

router.post('/forgot-password', authController.forgotPassword);
router.patch('/reset-password/:token', authController.resetPassword);

//$ Protect all routes after this middleware
router.use(authController.protect);

router.put('/update-password', authController.updatePasswords);
router.get('/me', userController.getMe, userController.getUser);
router.put('/update-self', userController.uploadUserPhoto, userController.resizeUserPhoto, userController.updateSelf);
router.delete('/delete-self', userController.deleteSelf);

router.use(authController.restrictTo('admin'));

router.route('/').get(userController.getAllUsers).post(userController.createUser);

router.route('/:id').get(userController.getUser).patch(userController.updateUser).delete(userController.deleteUser);

module.exports = router;

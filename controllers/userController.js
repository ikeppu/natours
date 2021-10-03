const multer = require('multer');
const sharp = require('sharp');
const User = require('./../models/userModels');
const catchAsync = require(`./../utils/catchAsync`);
const AppError = require(`./../utils/AppError`);
const HandlerFactory = require('./handlerFactory');

// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'public/img/users');
//   },
//   filename: (req, file, cb) => {
//     // user-id-currentstamp
//     const ext = file.mimetype.split('/')[1];
//     cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
//   },
// });

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! please upload only images', 404), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadUserPhoto = upload.single('photo');

exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${req.file.filename}`);

  next();
});

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((item) => {
    if (allowedFields.includes(item)) newObj[item] = obj[item];
  });
  return newObj;
};

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

//$ Users Req, Res
exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({ status: 'success', data: { users } });
});

exports.updateSelf = catchAsync(async (req, res, next) => {
  //$ 1) Create Error if user POST's password data
  if (req.body.password || req.body.passwordConfirm)
    return next(new AppError(`This route is not for password update`, 400));
  //$ 2) Update User document
  const filteredBody = filterObj(req.body, 'name', 'email');

  if (req.file) filteredBody.photo = req.file.filename;

  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

exports.deleteSelf = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({ status: 'success', data: null });
});

exports.getUser = HandlerFactory.getOne(User);
exports.createUser = (req, res) => {
  res.status(201).json({ status: 'success', data: { users: `User created` } });
};
exports.updateUser = (req, res) => {
  res.status(200).json({ status: 'success', data: { users: `User updated` } });
};
exports.deleteUser = HandlerFactory.deleteOne(User);

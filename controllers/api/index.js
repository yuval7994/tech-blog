const router = require('express').Router();

const usersRoutes = require('./user-routes.js');
const blogsRoutes = require('./blogs-routes');
const commentRoutes = require('./comment-routes');

router.use('/users', usersRoutes);
router.use('/blogs', blogsRoutes);
router.use('/comments', commentRoutes);

module.exports = router;


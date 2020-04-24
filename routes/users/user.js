const router = require('express').Router();
const userController = require('../../controllers/users.js');

router.get('/', userController.findUser);
router.get('/:userId', userController.findUserById);
router.post('/', userController.createUser);

module.exports = router;

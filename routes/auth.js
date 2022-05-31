/*
    path: api/login

*/
const {
    Router,
    response
} = require('express');
const {
    check
} = require('express-validator');

const {
    createUser,
    logIn
} = require('../controllers/auth');
const {
    checkFields
} = require('../middlewares/check-fields');


const router = Router();

router.post('/new', [
    check('name', 'name, which is required, is empty').not().isEmpty(),
    check('email', 'email, which is required, is empty').not().isEmpty(),
    check('email', 'Invalid email format').isEmail(),
    check('password', 'password, which is required, is empty').not().isEmpty(),
    checkFields,
], createUser);

router.post('/', [
    check('email', 'email, which is required, is empty').not().isEmpty(),
    check('email', 'Invalid email format').isEmail(),
    check('password', 'password, which is required, is empty').not().isEmpty(),
    checkFields,
], logIn);


module.exports = router;
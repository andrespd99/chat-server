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
    logIn,
    renewToken
} = require('../controllers/auth');
const {
    checkFields
} = require('../middlewares/check-fields');
const {
    checkJWT
} = require('../middlewares/check-jwt');


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

// checkJWT
router.get('/renew', [
    checkJWT,
], renewToken);


module.exports = router;
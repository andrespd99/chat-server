/*
    path: api/users

*/
const {
    Router,
    response
} = require('express');
const {
    check
} = require('express-validator');

const {
    getUsers
} = require('../controllers/users');
const {
    checkJWT
} = require('../middlewares/check-jwt');


const router = Router();
// checkJWT
router.get('/',
    checkJWT,
    getUsers);


module.exports = router;
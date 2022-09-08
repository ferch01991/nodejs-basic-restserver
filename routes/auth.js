const { Router } = require('express');
const { check } = require('express-validator');
const { fieldValidate } = require('../middlewares/field-validate');
const { login } = require('./../controllers/auth');

const router = Router();

router.post('/login', [
    check('email', 'Email is invalid!').isEmail(),
    check('password', 'Password is obligatory!').not().isEmpty(),
    fieldValidate
], login);

module.exports = router;
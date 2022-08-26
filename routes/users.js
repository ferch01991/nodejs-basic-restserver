const { Router } = require('express');
const { check } = require('express-validator');

const {
    isValidRole, isEmalRegistered, hasUserById 
} = require('../helpers/db-validators');
const { fieldValidate } = require('../middlewares/field-validate');

const { usersGet, usersPut, usersPost, usersDelete, usersPatch } = require('../controllers/users');

const router = Router();

router.get('/', usersGet);


router.put('/:id',[
    check('id', 'This ID is not valid!').isMongoId(),
    check('id').custom( hasUserById ),
    check('role').custom( isValidRole ),
    fieldValidate
], usersPut);



// check prepara los errores
router.post('/', [
    check('name', 'The name is not valid').not().isEmpty(),
    check('email', 'The email is not valid').isEmail(),
    check('email').custom(isEmalRegistered),
    check('password', 'The password must have more that 6 letters').isLength({ min:6 }),
    // check('role', 'It is not a rol valid').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom( isValidRole ),
    // check('role').custom( (rol) => isValidRole(rol) ), aqui se obvia porque si es un unico argumento que llega es el unico argumento que se envia. 
    fieldValidate
] ,usersPost)
router.delete('/', usersDelete)
router.patch('/', usersPatch)


module.exports = router;
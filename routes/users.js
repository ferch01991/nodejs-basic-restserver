const { Router } = require('express');
const { check } = require('express-validator');

const Role = require('../models/role');

const { usersGet, usersPut, usersPost, usersDelete, usersPatch } = require('../controllers/users');
const { fieldValidate } = require('../middlewares/field-validate');

const router = Router();

router.get('/', usersGet)
router.put('/:id', usersPut)
// check prepara los errores
router.post('/', [
    check('name', 'The name is not valid').not().isEmpty(),
    check('email', 'The email is not valid').isEmail(),
    check('password', 'The password must have more that 6 letters').isLength({ min:6 }),
    // check('role', 'It is not a rol valid').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom( async(role = '') => {
        console.log(role)
        const hasRoles = await Role.findOne({ role })
        console.log(hasRoles)
        if (!hasRoles){
            throw new Error(`The role ${role} is not registered in DB`); 
        }
    }),
    fieldValidate
] ,usersPost)
router.delete('/', usersDelete)
router.patch('/', usersPatch)


module.exports = router;
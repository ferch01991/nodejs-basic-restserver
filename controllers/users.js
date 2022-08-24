const { response, request } = require('express')

const bcrypt = require('bcryptjs');

const User = require('../models/user');


const usersGet = (req = request, res = response) => {
    const query = req.query;
    res.json({
        msg: 'get API desde el controller',
        query
    })
}

const usersPut = (req, res = response) => {
    const { id } = req.params;
    console.log(id)
    res.json({
        msg: 'put API - controller',
        id
    })
}

const usersPost = async(req, res = response) => {


    const { name, email, password, role } = req.body;

    const user = new User({
        name, email, password, role
    }); 

    // validar si el correo existe
    const hasEmail = await User.findOne({email});
    
    if (hasEmail){
        return res.status(400).json({
            msg: "This email is already Registered!"
        });
    }         

    // encriptar la contraseña
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt)
    
    // Guardar en la base de datos
    await user.save()

    res.json({
        msg: 'post API - controller',
        user
    })
}

const usersDelete = (req, res) => {
    res.json({
        msg: 'delete API!'
    })
}

const usersPatch = (req, res) => {
    res.json({
        msg: 'patch API!'
    })
}
module.exports = {
    usersGet,
    usersPut,
    usersPost,
    usersDelete,
    usersPatch
}
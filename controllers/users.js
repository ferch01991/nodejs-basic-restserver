const { response, request } = require('express')

const bcrypt = require('bcryptjs');

const User = require('../models/user');


const usersGet = async(req = request, res = response) => {
    // const query = req.query;
    const { limit = 5, from = 0 } = req.query;
    const query = {status: true}

    // const users = await User.find( query )
    //     .skip(Number(from))
    //     .limit(Number(limit));
    // const totalUsers = await User.countDocuments( query );

    // // enviar las 2 consultas de manera simultanea
    const [ totalUsers, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip(Number(from))
            .limit(Number(limit))
        ]
    )
    res.json({
        totalUsers,
        users
    })
}

const usersPut = async(req, res = response) => {
    const { id } = req.params;
    const { _id, password, google, ...user } = req.body;

    if (password){
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);
    }

    const userUpdate = await User.findByIdAndUpdate(id, user);

    res.json( userUpdate )
}

const usersPost = async(req, res = response) => {


    const { name, email, password, role } = req.body;

    const user = new User({
        name, email, password, role
    });        

    // encriptar la contraseña
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);
    
    // Guardar en la base de datos
    await user.save()

    res.json({
        msg: 'post API - controller',
        user
    })
}

const usersDelete = async(req, res) => {
    const { id } = req.params;

    // Remove to DB
    // const userRemove = await User.findByIdAndDelete(id);

    const userRemove = await User.findByIdAndUpdate(id, { status:false });
    res.json({
        userRemove
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
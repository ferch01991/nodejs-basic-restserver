const { response } = require('express')
const bcrypt = require('bcryptjs');

const User = require('./../models/user');

const { generarJWT } = require('../helpers/generar-jwt');


const login = async(req, res = response) => {
    
    const { email, password } = req.body;
    
    try {
        const user = await User.findOne({email});

        // validate email is already
        if (!user){
            return res.status(400).json({
                msg: 'Incorrect Email or Password - email'
            })
        }
        
        // User is active
        if (!user.status){
            return res.status(400).json({
                msg: 'Incorrect Email or Password - status:false'
            })
        }

        // check password
        const validPass = bcrypt.compareSync(password, user.password)
        if (!validPass){
            return res.status(400).json({
                msg: 'Incorrect Email or Password - password'
            })
        }

        // generate JWT
        const token = await generarJWT( user.id );

        res.json({
            msg: 'Login ok!',
            user,
            token
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Contact ADMIN'
        })
    }
    
}

module.exports = {
    login
}
const jwt = require('jsonwebtoken')

const generarJWT = (uid = '') => {
    return new Promise((resolve, reject) => {

        const payload = { uid };

        jwt.sign(payload, process.env.SECRETKEY, {
            expiresIn: '4h'
        }, (error, token) => {
            error ? reject(error) : resolve(token)
            // if (error) reject(error)
            // else resolve(token)
        });
    })
}


module.exports = {
    generarJWT
}
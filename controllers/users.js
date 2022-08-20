const { response, request } = require('express')

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

const usersPost = (req, res = response) => {
    const body = req.body;
    console.log(body)
    res.json({
        msg: 'post API - controller',
        body
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
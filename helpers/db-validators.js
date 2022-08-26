const Role = require('../models/role');

const User = require('./../models/user')

const isValidRole = async (role = '') => {

    const hasRoles = await Role.findOne({ role })
    if (!hasRoles) {
        throw new Error(`The role ${role} is not registered in DB`);
    }

}

const isEmalRegistered = async(email = '') => {
    const hasEmail = await User.findOne({ email });
    
    if (hasEmail) {
        throw new Error(`The email ${email} is already Registered!`);
    }

}

const hasUserById = async(id = '') => {
    const hasUser = await User.findById(id);
    
    if (!hasUser) {
        throw new Error(`The ID: ${id} not exist`);
    }

}

module.exports = {
    isValidRole,
    isEmalRegistered,
    hasUserById
}
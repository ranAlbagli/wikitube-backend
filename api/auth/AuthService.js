const bcrypt = require('bcrypt')
const UserService = require('../user/UserService')

const saltRounds = 10

async function login(email, password) {
    if (!email || !password) return Promise.reject("email and password are required")
    const user = await UserService.getByEmail(email)
    if (!user) return Promise.reject('Invalid email or password')
    const match = await bcrypt.compare(password, user.password)
    if (!match) return Promise.reject('Invalid email or password')
    delete user.password
    return user;
}

async function signup(newUser){    
    if (!newUser.email || !newUser.password || !newUser.firstName || !newUser.lastName) return Promise.reject('email, first and last name and password are required!')
    const userExists = await UserService.getByEmail(newUser.email)
    if(userExists) return Promise.reject('Email exists, login')
    const hash = await bcrypt.hash(newUser.password, saltRounds)
    newUser.password=hash;
    const user = await UserService.add(newUser)
    delete user.password
    return user
}

module.exports = {
    login,
    signup
}
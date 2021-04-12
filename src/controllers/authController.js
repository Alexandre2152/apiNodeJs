const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../model/user')
const authConfig = require('../config/auth.json')

const router = express.Router();

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400
    })
}

//Rota de registro
router.post('/register', async(req, res) => {

    const { email } = req.body

    try {

        if (await User.findOne({ email }))
            return res.status(400).send({ error: 'Usuario ja existente!' })

        const user = await User.create(req.body);

        //Removendo a visualização do password
        user.password = undefined;

        return res.send({
            user,
            token: generateToken({ id: user.id })
        })
    } catch (err) {
        return res.status(400).send({ error: 'Falha no registro' })
    }
})

//Rota de autenticação
router.post('/authenticate', async(req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email }).select('+password')

    if (!user)
        return res.status(400).send({ error: 'Usuário não existe!' })

    if (!await bcrypt.compare(password, user.password))
        return res.status(400).send({ error: 'Senha inválida!' })

    //Removendo a visualização do password
    user.password = undefined;


    res.send({
        user,
        token: generateToken({ id: user.id })
    })
})

module.exports = app => app.use('/auth', router)
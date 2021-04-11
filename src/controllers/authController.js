const express = require('express')
const User = require('../model/user')
const router = express.Router();

router.post('/register', async(req, res) => {

    const { email } = req.body

    try {

        if (await User.findOne({ email }))
            return res.status(400).send({ error: 'Usuario ja existente!' })

        const user = await User.create(req.body);

        user.password = undefined;

        return res.send({ user })
        console.log("Mongo Conectado!")
    } catch (err) {
        return res.status(400).send({ error: 'Falha no registro' })
    }
})

module.exports = app => app.use('/auth', router)
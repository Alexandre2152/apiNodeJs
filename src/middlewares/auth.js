const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth.json')

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization

    // Verificar se o token foi informado
    if (!authHeader)
        return res.status(401).send({ error: 'Token não informado!' })

    // Verificar se o token esta no formato correto
    //Ex: Bearer sdfsdfsfsfefwfwe23f3f3f3rf3g
    const parts = authHeader.split(' ')

    if (!parts.length === 2)
        return res.status(401).send({ error: 'Token error!' })

    const [schema, token] = parts

    if (!/^Bearer$/i.test(schema))
        return res.status(401).send({ error: 'Token malformatted!' })

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err) return res.status(401).send({ error: 'Token invalid' })

        req.userId = decoded.userId
        return next()
    })
}
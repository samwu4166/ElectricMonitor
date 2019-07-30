const fs = require('fs')
const jsonServer = require('json-server')
const jwt = require('jsonwebtoken')

const server = jsonServer.create()

const router = jsonServer.router('./data/data.json')

const userdb = JSON.parse(fs.readFileSync('./data/users.json','UTF-8'))

server.use(jsonServer.bodyParser);
server.use(jsonServer.defaults());

const SECRET_KEY = '987654321'

const expiresIn = '1h'

function createToken(payload){
    return jwt.sign(payload, SECRET_KEY, {expiresIn})
}

function verifyToken(token){
    return jwt.verify(token, SECRET_KEY, (err, decode) => decode !== undefined ? decode : err)
}

function isAuthenticated({username, password}){
    return userdb.users.findIndex(user => user.username === username && user.password === password) !== -1
}

server.post('/auth/login', (req, res) =>{
    const username = req.body.username
    const password = req.body.password
    //const { username, password } = req.body
    if (isAuthenticated({username, password}) === false){
        const status = 401
        const message = 'Incorrect email or password'
        res.status(status).json({status, message})
        return
    }
    const access_token = createToken({username, password})
    res.status(200).json({access_token})
})

server.use((req, res, next) => {
    res.header('Access-Control-Allow-Headers', 'authorization');
    next();
})

server.use(/^(?!\/auth).*$/, (req, res, next) => {
    if (req.headers.authorization === undefined || req.headers.authorization.split(' ')[0] !== 'Bearer'){
        console.log(req.headers.authorization)
        const status = 401
        const message = 'Bad authorization header'
        res.status(status).json({status, message})
        return
    }
    try{
        console.log('test2')
        verifyToken(req.headers.authorization.split(' ')[0])
        next()
    }catch(err){
        console.log('test3')
        const status = 401
        const message = 'Error: access_token is not valid'
        res.status(status).json({status, message})
    }
})

server.post('/logout', (req, res) => {
    //delete token?
    const message = 'successful delete token'
    res.status(200).json({message})
})

server.use(router)

server.listen(4000, () => {
    console.log('Run Auth API Server')
})
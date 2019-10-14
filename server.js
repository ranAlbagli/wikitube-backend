const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const cookieParser = require('cookie-parser')
const app = express()
const session = require('express-session')
const http = require('http').createServer(app);
const AuthRoutes = require('./api/auth/AuthRoutes')
const UserRoutes = require('./api/user/UserRoutes')

app.use(cookieParser())
app.use(bodyParser.json());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))


if (process.env.NODE_ENV !== 'production') {
    const corsOptions = {
        origin: 'http://localhost:3000',
        credentials: true
    };
    app.use(cors(corsOptions));
}
app.use('/api/auth', AuthRoutes)
app.use('/api/user', UserRoutes)



if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'public')));
}

const port = process.env.PORT || 3001;
http.listen(port, () => {
    console.log('Server is running on port: ' + port)
});










// const express = require('express')
// const app = express()
// const port = 3001

// app.get('/', (req, res) => res.send('Hello World!'))

// app.listen(port, () => console.log(`Example app listening on port ${port}!`))
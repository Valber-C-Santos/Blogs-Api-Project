const express = require('express');
const validationLoginControlJWT = require('./controllers/login.control');
const { userControlJWT } = require('./controllers/user.control');
const { isBodyValid } = require('./middlewares/user.middleware');
const { takeAllUser } = require('./controllers/user.control');
const { isValidToken } = require('./middlewares/authentication.middleware');
// ...

const app = express();

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

app.post('/login', validationLoginControlJWT);
app.post('/user', isBodyValid, userControlJWT);
app.get('/user', isValidToken, takeAllUser);
// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;

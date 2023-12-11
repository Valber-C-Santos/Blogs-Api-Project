const express = require('express');
const validationLoginControlJWT = require('./controllers/login.control');
const { userControlJWT, takeAllUser, findUserId } = require('./controllers/user.control');
const { createNewCategories, takeAllCategories } = require('./controllers/category.control');
const { createNewPostControl } = require('./controllers/BlogPost.control');
const { isBodyValid } = require('./middlewares/user.middleware');
const { isValidCategory } = require('./middlewares/category.middleware');
const { isValidToken } = require('./middlewares/authentication.middleware');
const { isValidPost } = require('./middlewares/BlogPost.middleware');

// ...

const app = express();

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

app.post('/login', validationLoginControlJWT);
app.post('/user', isBodyValid, userControlJWT);
app.post('/categories', isValidToken, isValidCategory, createNewCategories);
app.post('/post', isValidToken, isValidPost, createNewPostControl);
app.get('/user', isValidToken, takeAllUser);
app.get('/user/:id', isValidToken, findUserId);
app.get('/categories', isValidToken, takeAllCategories);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;

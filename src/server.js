require('dotenv').config();
require('express-async-errors');
const app = require('./api');
const { login } = require('./database/controllers/loginController');
const errorMiddleware = require('./database/middlewares/errorMiddleware');
const { userValidations } = require('./database/middlewares/userValidations');
const { createUser, getUsers, getUsersById,
   removeUser } = require('./database/controllers/userController');
const { validateJWT } = require('./database/middlewares/validateJWT');
const { createCategory, getCategories } = require('./database/controllers/categoryController');
const { createPost, getPost, getPostById,
  updatePost, deletePost, searchPost } = require('./database/controllers/postController');
const { categoryValidation } = require('./database/middlewares/categoryValidation');
const { validateUpdate } = require('./database/middlewares/postValidations');

// não remova a variável `API_PORT` ou o `listen`
const port = process.env.API_PORT || 3000;

// não remova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});
app.get('/post/search', validateJWT, searchPost);
app.post('/login', login);
app.post('/user', userValidations, createUser);
app.get('/user', validateJWT, getUsers);
app.get('/user/:id', validateJWT, getUsersById);
app.delete('/user/me', validateJWT, removeUser);
app.post('/categories', validateJWT, createCategory);
app.get('/categories', validateJWT, getCategories);
app.post('/post', validateJWT, categoryValidation, createPost);
app.get('/post', validateJWT, getPost);
app.get('/post/:id', validateJWT, getPostById);
app.put('/post/:id', validateJWT, validateUpdate, updatePost);
app.delete('/post/:id', validateJWT, deletePost);

app.use(errorMiddleware);

app.listen(port, () => console.log('ouvindo porta', port));

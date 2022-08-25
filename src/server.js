require('dotenv').config();
require('express-async-errors');
const app = require('./api');
const { login } = require('./database/controllers/loginController');
const errorMiddleware = require('./database/middlewares/errorMiddleware');
const { userValidations } = require('./database/middlewares/userValidations');
const { createUser } = require('./database/controllers/userController');

// não remova a variável `API_PORT` ou o `listen`
const port = process.env.API_PORT || 3000;

// não remova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});
app.post('/login', login);
app.post('/user', userValidations, createUser);

app.use(errorMiddleware);

app.listen(port, () => console.log('ouvindo porta', port));

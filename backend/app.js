const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/users');
const cardRoutes = require('./routes/cards');
const errorHandler = require('./middlewares/errorHandler');
const auth = require('./middlewares/auth');
const NotFoundError = require('./errors/NotFoundError');
const { login, createUser } = require('./controllers/users');
const { validateUserLogin, validateUserCreation } = require('./utils/userValidator');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

dotenv.config();
process.env.JWT_SECRET = 'strong-secret-key';

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
});

app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(requestLogger);

app.post('/signin', validateUserLogin, login);
app.post('/signup', validateUserCreation, createUser);

app.use('/users', auth, userRoutes);
app.use('/cards', auth, cardRoutes);
app.use((_req, _res) => {
  throw new NotFoundError('Неизвестный путь');
});
app.use(errorLogger);
app.use(errors());
app.use(errorHandler());

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

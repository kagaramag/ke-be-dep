import http from 'http';
import path from 'path';
import createError from 'http-errors';
import express from 'express';
import logger from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import socketIo from 'socket.io';
import routes from './routes';
import './helpers/eventListener';

// this middleware helps to set language in headers
import createLocale from 'express-locale';

// Polyglot middleware
import { runPolyglot } from './middlewares/checkLang';

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

dotenv.config();

app.use(
  session({
    secret: process.env.SECRET_KEY || 'Keetela',
    cookie: { maxAge: 60000 },
    resave: true,
    saveUninitialized: true
  })
);

// swagger route

app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.use(passport.initialize());
app.use(passport.session());
/*
  accept-language: fr_MX or en_MX
*/
app.use(
  createLocale({
    priority: ['accept-language', 'default'],
    default: 'en_US'
  })
);

app.use(runPolyglot);

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use('/api/v1/', routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send({
    message: err.message,
    error: err.status
  });
  next();
});

app.server = server;
export default app;

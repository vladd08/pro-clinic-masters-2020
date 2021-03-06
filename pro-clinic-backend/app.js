const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const indexRouter = require('./routes/index');
const jwtRouter = require('./routes/jwt');
const authorizeRouter = require('./routes/authorization');
const dataGeneratorRouter = require('./routes/data-generator');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(cors());
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/authenticate', jwtRouter);
app.use('/authorize', authorizeRouter);
app.use('/generate', dataGeneratorRouter);

app.use(function (req, res, next) {
    next(createError(404));
});

app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.json(err);
});

module.exports = app;

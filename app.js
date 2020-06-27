require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const { get } = require('lodash');

const mongoDB = require('./config/database.js');
const streamRoute = require('./api/stream');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'OPTION, GET, POST, PUT, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	next();
});

app.use('/streams', streamRoute);

app.use((error, req, res, next) => {
	const message = get(error, 'message');
	const statusCode = get(error, 'statusCode') || 500;
	res.status(statusCode).json({ message });
});

mongoDB.initialConnect(() => {
	app.listen(port);
});

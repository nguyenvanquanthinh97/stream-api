const express = require('express');
const route = express.Router();

const controller = require('./controller');

route.get('/', controller.fetchStreams);
route.get('/:id', controller.fetchStream);
route.post('/', controller.createStream);
route.put('/:id', controller.editStream);
route.delete('/:id', controller.deleteStream);

module.exports = route;

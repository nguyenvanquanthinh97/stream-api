const Joi = require('@hapi/joi');

const Stream = require('../../models/stream');

module.exports.createStream = async (title, description, userId) => {
	const schema = Joi.object().keys({
		title: Joi.string().trim().required(),
		description: Joi.string().trim().required(),
		userId: Joi.string().trim().required()
	});

	const { error, value } = schema.validate({ title, description, userId });

	if (error) {
		const err = new Error('Fail in validation');
		err.statusCode = 422;
		throw new err();
	}

	try {
		const stream = new Stream(null, value.title, value.description, value.userId);
		const { insertedId } = await stream.save();

		stream['_id'] = insertedId;
		return stream;
	} catch (error) {
		throw error;
	}
};

module.exports.editStream = async (id, title, description, userId) => {
	const schema = Joi.object().keys({
		id: Joi.string().trim().required(),
		title: Joi.string().trim().required(),
		description: Joi.string().trim().required(),
		userId: Joi.string().trim().required()
	});

	const { error, value } = schema.validate({ id, title, description, userId });

	if (error) {
		const err = new Error('Fail in validation');
		err.statusCode = 422;
		return next(error);
	}

	const stream = await Stream.findById(id);

	if (!stream) {
		throw (new Error('Can not find stream').statusCode = 404);
	}

	if (String(stream.userId) !== String(userId)) {
		throw (new Error('Not your stream').statusCode = 404);
	}

	try {
		const updatedStream = new Stream(stream._id, value.title, value.description);
		await updatedStream.update();
		return updatedStream;
	} catch (error) {
		throw error;
	}
};

module.exports.deleteStream = async (id, userId) => {
	const stream = await Stream.findById(id);

	if (!stream) {
		throw (new Error('Can not find stream').statusCode = 404);
	}

	if (String(stream.userId) !== String(userId)) {
		throw (new Error('Not your stream').statusCode = 404);
	}

	return await Stream.deleteById(id);
};

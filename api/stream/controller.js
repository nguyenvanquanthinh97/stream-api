const Stream = require('../../models/stream');
const service = require('./service');

module.exports.fetchStreams = async (req, res, next) => {
	try {
		const { page } = req.query;
		const streams = await Stream.findAll(page);

		return res.status(200).json({ streams });
	} catch (error) {
		next(error);
	}
};

module.exports.fetchStream = async (req, res, next) => {
	try {
		const { id } = req.params;
		const stream = await Stream.findById(id);

		return res.status(200).json({ stream });
	} catch (error) {
		next(error);
	}
};

module.exports.createStream = async (req, res, next) => {
	try {
		const { title, description, userId } = req.body;

		const stream = await service.createStream(title, description, userId);
		return res.status(201).json({ stream });
	} catch (error) {
		next(error);
	}
};

module.exports.editStream = async (req, res, next) => {
	try {
		const { id } = req.params;
		const { title, description, userId } = req.body;

		const updatedStream = await service.editStream(id, title, description, userId);

		return res.status(201).json({ stream: updatedStream });
	} catch (error) {
		next(error);
	}
};

module.exports.deleteStream = async (req, res, next) => {
	try {
		const { id } = req.params;
		const { userId } = req.query;
		
		await service.deleteStream(id, userId);
		res.status(202).json({ message: 'success' });
	} catch (error) {
		next(error);
	}
};

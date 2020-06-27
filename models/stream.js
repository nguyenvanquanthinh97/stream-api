const { ObjectId } = require('mongodb');

const { getDB } = require('../config/database');

module.exports = class Stream {
	constructor(id, title, description, userId) {
		this._id = id ? new ObjectId(id) : null;
		this.title = title;
		this.description = description;
		this.userId = userId;
	}

	save() {
		const db = getDB();

		return db.collection('streams').insertOne(this);
	}

	update(title, description) {
		const db = getDB();

		const updatedStream = { title, description };

		if (!title && !description) {
			updatedStream.title = this.title;
			updatedStream.description = this.description;
		}

		return db.collection('streams').updateOne({ _id: this._id }, { $set: updatedStream });
	}

	static findAll(page = 1) {
		const db = getDB();
		const items = 10;

		return db.collection('streams').find().skip((Number(page) - 1) * items).limit(items).toArray();
	}

	static findById(id) {
		const db = getDB();

		return db.collection('streams').findOne({ _id: new ObjectId(id) });
	}

	static deleteById(id) {
		const db = getDB();

		return db.collection('streams').deleteOne({ _id: new ObjectId(id) });
	}
};

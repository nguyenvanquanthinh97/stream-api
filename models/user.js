const { ObjectId } = require('mongodb');

const { getDB } = require('../config/database');

module.exports = class User {
  constructor(id, email, firstname, lastname, imgUrl) {
    this._id = id ? new ObjectId(id) : null;
    this.email = email;
    this.firstname = firstname;
    this.lastname = lastname;
    this.imgUrl = imgUrl;
  }

  save() {
    const db = getDB();

    return db.collection('users').insertOne(this);
  }
}

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const users  = new Schema({
  email: {type: String, unique: true},
  password: String,
  firstName: String,
  lastName: String
});

const admin  = new Schema({
  email: {type: String, unique: true},
  password: String,
  firstName: String,
  lastName: String
});

const course = new Schema({
    userId: ObjectId,
    title: String,
    description: String,
    price : Number,
    imageUrl: String,
    creatorId : ObjectId
});

const purchase  = new Schema({
    courseId : ObjectId,
    userId : ObjectId
  });

const usersModel = mongoose.model('users', users);
const adminModel = mongoose.model('admin', admin);
const courseModel = mongoose.model('course',course);
const purchaseModel = mongoose.model('purchase', purchase);

module.exports = {
    usersModel,
    adminModel,
    courseModel,
    purchaseModel
}
const User = require("../models/User");

exports.getOne = (email) => User.findOne({email}).lean();

exports.getOneById = (userId) => User.findById(userId).populate("recipes").lean();

exports.getAll = () => User.find({}).lean();

exports.update = (id, data) => User.findByIdAndUpdate(id, {...data});

exports.updateUserById = (userId, data) => User.findByIdAndUpdate(userId, data)

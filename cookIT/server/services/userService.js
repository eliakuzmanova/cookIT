const User = require("../models/User");

exports.getOne = (email) => User.findOne({email}).lean();

exports.getOneById = (userId) => User.findById(userId).populate("recipes").lean();

exports.getAll = () => User.find({}).lean();

 exports.update = (id, data) => User.findByIdAndUpdate(id, {...data});

// exports.getOneWithNonFollow = (id) => User.findById(id).populate("follow").lean();

// exports.getOneByUsernameWithPosts = (id) => User.findById(id).populate("posts").lean();

// exports.getOneByUsernameWithFollows = (id) => User.findById(id).populate("follow").lean();

// exports.getOneByUsernameWithRetentions = (username) => User.findOne({username}).populate("posts").populate("followers").populate("follow").lean();

// exports.updateUserById = (userId, data) => User.findByIdAndUpdate(userId, data)

// exports.delete = (id) => User.findByIdAndRemove(id)


// exports.getOneByUsernameWithRetentions = (username) => User.findOne({username}).populate("posts").lean();

// exports.getById = (id) => User.findById(id).lean();
// exports.create = (data, userId) => User.create({...data, author: userId}); // <---- check owner




// exports.getFirstThree = () => User.find({}).limit(3).lean();

// exports.getByIdWithAuthor= (id) => User.findById(id).populate("author").populate("appliers").lean();

// exports.getAllUserPop = () => User.find({}).populate("author").lean();
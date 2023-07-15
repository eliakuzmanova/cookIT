const Recipe = require("../models Recipe");

exports.create = (imagePath, userId, description) => Recipe.create({image:imagePath, owner:userId, description:description});

exports.getOne = (RecipeId) => Recipe.findById(RecipeId).lean();

exports.getAll = () => Recipe.find({}).populate("owner").lean();

// exports.getOneWithLikes =  RecipeId) => Recipe.findById RecipeId).populate("likes").lean();

// exports.getOneWithRel =  RecipeId) => Recipe.findById RecipeId).lean();

// exports.getOneWithComments =  RecipeId) => Recipe.findById RecipeId).populate("comments.user").lean();

// exports.update = (id, data) => Recipe.findByIdAndUpdate(id, data).lean();

// exports.delete = (id) => Recipe.findByIdAndRemove(id)

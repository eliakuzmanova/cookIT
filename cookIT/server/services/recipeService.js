const Recipe = require("../models/Recipe");

exports.create = (userId, image, title, prepTime, cookingTime, totalTime, ingredients, directions) => Recipe.create({author: userId ,image, title, prepTime, cookingTime, totalTime, ingredients, directions});

exports.getOne = (RecipeId) => Recipe.findById(RecipeId).populate("author").lean();

exports.getAll = () => Recipe.find({}).lean();

// exports.getOneWithLikes =  RecipeId) => Recipe.findById RecipeId).populate("likes").lean();

// exports.getOneWithRel =  RecipeId) => Recipe.findById RecipeId).lean();

// exports.getOneWithComments =  RecipeId) => Recipe.findById RecipeId).populate("comments.user").lean();

// exports.update = (id, data) => Recipe.findByIdAndUpdate(id, data).lean();

// exports.delete = (id) => Recipe.findByIdAndRemove(id)

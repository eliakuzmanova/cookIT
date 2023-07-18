const Recipe = require("../models/Recipe");

exports.create = (image, title, prepTime, cookingTime, totalTime, ingredients, directions) => Recipe.create({image, title, prepTime, cookingTime, totalTime, ingredients, directions});

exports.getOne = (RecipeId) => Recipe.findById(RecipeId).populate("author").lean();

exports.getAll = () => Recipe.find({}).lean(); // .populate("author") add IT!!!

// exports.getOneWithLikes =  RecipeId) => Recipe.findById RecipeId).populate("likes").lean();

// exports.getOneWithRel =  RecipeId) => Recipe.findById RecipeId).lean();

// exports.getOneWithComments =  RecipeId) => Recipe.findById RecipeId).populate("comments.user").lean();

// exports.update = (id, data) => Recipe.findByIdAndUpdate(id, data).lean();

// exports.delete = (id) => Recipe.findByIdAndRemove(id)

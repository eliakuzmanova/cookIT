const Recipe = require("../models/Recipe");

exports.create = (userId, image, title, prepTime, cookingTime, totalTime, ingredients, directions) => Recipe.create({author: userId ,image, title, prepTime, cookingTime, totalTime, ingredients, directions});

exports.getOne = (RecipeId) => Recipe.findById(RecipeId).populate("author").lean();

exports.getAll = () => Recipe.find({}).populate("author").lean();

exports.edit = (id, data) => Recipe.findByIdAndUpdate(id, data).lean();

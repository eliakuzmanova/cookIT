const mongoose = require('mongoose')

const RecipeSchema = new mongoose.Schema({
    image: {
        type: String,
        require: true
    },
    title: {
        type: String,
        require: true,
        minLength: [3, "Too short title"],
        maxLength: [40, "Too long title"]

    },
    prepTime: {
        type: Number,
        require: true,
        min: [0 , "The Prep time should be a positive number"],
       max: [10000 , "The Prep time can not be greater than 10 000 minutes "],
    },
    cookingTime:{
        type: Number,
        require: true,
        min: [0 , "The Cooking time should be a positive number"],
       max: [1000 , "The Cooking time can not be greater than 1000 minutes "],
    },
    totalTime: {
        type: Number,
        require: true,
        min: [0 , "The Cooking time should be a positive number"],
       max: [11000 , "The Cooking time can not be greater than 11 000 minutes "],
    },
    ingredients:[{
        type: String,
        require: true,
        minLength: [0, "Too short ingredient"],
        maxLength: [300, "Too long ingredient"]
    }],
    directions:[{
        type: String,
        require: true,
        minLength: [0, "Too short direction"],
        maxLength: [300, "Too long direction"]
    }],
    author: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        require: true
    },
});

const Recipe = mongoose.model('Recipe', RecipeSchema);

module.exports = Recipe;
const recipeService = require("../services/recipeService");
const userService = require("../services/userService");

exports.createRecipe = async (req, res) => {

    try {
        const image = req.file.path;
        const userId = req.body.userId
        const title = req.body.title;
        const prepTime = req.body.prepTime;
        const cookingTime = req.body.cookingTime;
        const totalTime = req.body.totalTime;
        const ingredients = JSON.parse(req.body.ingredients);
        const directions = JSON.parse(req.body.directions);

        const recipe = await recipeService.create(userId, image, title, prepTime, cookingTime, totalTime, ingredients, directions);

        const user = await userService.getOneById(userId)

        user.recipes.push(recipe._id);

        await userService.update(userId, user)

        res.status(200).end();

    } catch (err) {
        res.status(400).send(err);
    }

}

exports.getOne = async (req, res) => {
    try {
        const { recipeId } = req.params
        
        const recipe = await recipeService.getOne(recipeId)
        res.status(200).send(recipe);
    } catch (err) {
        res.status(400).send(err);
    }
}

exports.getAll = async (req, res) => {
    try {
        const recipes = await recipeService.getAll()
        res.status(200).send(recipes);
    } catch (err) {
        res.status(400).send(err);
    }
}

exports.editRecipe= async (req, res) => {

    try {

        let imagePath;
        imagePath = req.file?.path
        const recipeId = req.body.recipeId;
        const title = req.body.title;
        const prepTime = req.body.prepTime;
        const cookingTime = req.body.cookingTime;
        const totalTime = req.body.totalTime;
        const ingredients = JSON.parse(req.body.ingredients);
        const directions = JSON.parse(req.body.directions);
    
        if(!imagePath){
            const {image} = req.body
            imagePath = image
        }
     await recipeService.edit(recipeId, { title, prepTime, cookingTime, totalTime, ingredients, directions, image: imagePath });
        res.status(200).end();

    } catch (err) {
        res.status(403).send(err);
    }

}


const recipeService = require("../services/recipeService");
const userService = require("../services/userService");

exports.createRecipe = async (req, res) => {

    try {
        const imagePath = req.file.path
        const { userId, description } = req.body
        const recipe = await recipeService.create(imagePath, userId, description);
        const user = await userService.getOneById(userId);
        user.recipes.push(recipe._id);
        await userService.updateUserById(userId, user);
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

// exports.getOneWithLikes = async (req, res) => {
//     try {
//         const { recipeId } = req.params
//         const recipe = await recipeService.getOneWithLikes(recipeId)
//         res.status(200).send(recipe);
//     } catch (err) {
//         res.status(400).send(err);
//     }
// }

// exports.getRecipeWithComments = async (req, res) => {
//     try {
  
//         const { recipeId } = req.params
     
//         const recipe = await recipeService.getOneWithComments(recipeId)
       
//         res.status(200).send(recipe);
//     } catch (err) {
//         res.status(400).send(err);
//     }
// }

// exports.likeRecipe = async (req, res) => {
//     try {
//         const { userId } = req.body
//         const { recipeId } = req.params
//         const recipe = await recipeService.getOne(recipeId)
//         recipe.likes.push(userId)
//         const updatedRecipe = await recipeService.update(recipeId, recipe)
//         res.status(200).send(updatedRecipe);
//     } catch (err) {
//         res.status(400).send(err);
//     }
// }

// exports.dislikeRecipe = async (req, res) => {
//     try {
//         const { userId } = req.body
//         const { recipeId } = req.params

//         const recipe = await recipeService.getOne(recipeId)
       
//         const filteredLikes = recipe.likes.filter(l => l._id.toString() != userId)
        
//         const updatedRecipe = await recipeService.update(recipeId, { ...recipe, likes: filteredLikes })
     
//         res.status(200).send(updatedRecipe);
//     } catch (err) {
//         res.status(400).send(err);
//     }
// }

// exports.recipeComment = async (req, res) => {

//     try {

//         const { comment, userId } = req.body
   
//         const { recipeId } = req.params
        
//         const recipe = await recipeService.getOne(recipeId)
       
//        recipe.comments.push({user:userId,comment: comment})

//       const result = await recipeService.update(recipeId ,recipe)
//       const commentedRecipe = await recipeService.getOneWithComments(recipeId)
//         res.status(200).send(commentedRecipe);

//     } catch (err) {
//         res.status(400).send(err);
//     }

// }

// exports.updateRecipe = async (req, res) => {
//     try {
//         const { recipeId } = req.params
//         const { description } = req.body
//         const recipe = await recipeService.getOne(recipeId)
//         recipe.description = description
//         await recipeService.update(recipeId, recipe)

//         res.status(200).send(recipe);
//     } catch (err) {
//         res.status(400).send(err);
//     }
// }

// exports.deleteRecipe = async (req, res) => {
//     try {
//         const { recipeId } = req.body
//     const result = await recipeService.delete(recipeId)

//         res.status(200).send(result);
//     } catch (err) {
//         console.log(err + "<--- error");
//         res.status(400).send(err);
//     }
// }
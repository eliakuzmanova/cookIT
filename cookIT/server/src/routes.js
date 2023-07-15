const router = require("express").Router();
const multer = require("multer")
const upload = multer({dest: "uploads/"})

const userController = require("../controllers/userController");
const recipeController = require("../controllers/recipeController");
const authController = require("../controllers/authController");



router.recipe("/auth/register", authController.register)
router.recipe("/auth/login", authController.login)

// router.recipe("/users/getFollowsRecipes", userController.getUserWithFollow)

router.recipe("/users/getOne", userController.getOne)
router.recipe("/users/getOneById", userController.getOneById)
// router.recipe("/users/getOneWithRelations", userController.getOneByUsernameWithRel)
// router.recipe("/users/getOneWithNonFollow", userController.getOneWithNonFollow)
// router.recipe("/users/addFollower", userController.addFollower)
// router.recipe("/users/removeFollower", userController.removeFollower)
// router.recipe("/users/delete", userController.deleteUser)
// router.recipe("/profile/edit", upload.single("image"),userController.editProfile)

router.recipe("/recipes/create", upload.single("image"),recipeController.createRecipe)
router.get("/recipes/:recipeId/getOne",recipeController.getOne)
// router.get("/recipes/:recipeId/getOneWithLikes",recipeController.getOneWithLikes)
// router.recipe("/recipes/:recipeId/like",recipeController.likeRecipe)
// router.recipe("/recipes/:recipeId/dislike",recipeController.dislikeRecipe)
// router.recipe("/recipes/:recipeId/comment",recipeController.recipeComment)
// router.get("/recipes/:recipeId/getRecipeWithComments",recipeController.getRecipeWithComments)
// router.recipe("/recipes/:recipeId/updateRecipe",recipeController.updateRecipe)
// router.recipe("/recipes/:recipeId/deleteRecipe",recipeController.deleteRecipe)

module.exports = router
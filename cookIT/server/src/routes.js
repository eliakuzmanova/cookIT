const router = require("express").Router();
const multer = require("multer")
const upload = multer({dest: "uploads/"})

// const userController = require("../controllers/userController");
// const recipeController = require("../controllers/recipeController");
// const authController = require("../controllers/authController");



// router.recipe("/auth/register", authController.register)
// router.recipe("/auth/login", authController.login)

// router.recipe("/users/getFollowsrecipes", userController.getUserWithFollow)

// router.recipe("/users/getOne", userController.getOne)
// router.recipe("/users/getOneById", userController.getOneById)
// router.recipe("/users/getOneWithRelations", userController.getOneByUsernameWithRel)
// router.recipe("/users/getOneWithNonFollow", userController.getOneWithNonFollow)
// router.recipe("/users/addFollower", userController.addFollower)
// router.recipe("/users/removeFollower", userController.removeFollower)
// router.recipe("/users/delete", userController.deleteUser)
// router.recipe("/profile/edit", upload.single("image"),userController.editProfile)

// router.recipe("/recipes/create", upload.single("image"),recipeController.createrecipe)
// router.get("/recipes/:recipeId/getOneWithLikes",recipeController.getOneWithLikes)
// router.get("/recipes/:recipeId/getOne",recipeController.getOne)
// router.recipe("/recipes/:recipeId/like",recipeController.likerecipe)
// router.recipe("/recipes/:recipeId/dislike",recipeController.dislikerecipe)
// router.recipe("/recipes/:recipeId/comment",recipeController.recipeComment)
// router.get("/recipes/:recipeId/getrecipeWithComments",recipeController.getrecipeWithComments)
// router.recipe("/recipes/:recipeId/updaterecipe",recipeController.updaterecipe)
// router.recipe("/recipes/:recipeId/deleterecipe",recipeController.deleterecipe)

module.exports = router
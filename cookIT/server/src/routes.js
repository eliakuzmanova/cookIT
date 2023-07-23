const router = require("express").Router();
const multer = require("multer")
const upload = multer({dest: "uploads/"})

const userController = require("../controllers/userController");
const recipeController = require("../controllers/recipeController");
const authController = require("../controllers/authController");


router.post("/register", authController.register)
router.post("/login", authController.login)

// router.post("/users/getFollowsRecipes", userController.getUserWithFollow)

// router.post("/users/getOne", userController.getOne)
router.get("/users/:id", userController.getOneById)
router.post("/profile/edit", upload.single("image"),userController.editProfile)
// router.post("/users/getOneWithRelations", userController.getOneByUsernameWithRel)
// router.post("/users/getOneWithNonFollow", userController.getOneWithNonFollow)
// router.post("/users/addFollower", userController.addFollower)
// router.post("/users/removeFollower", userController.removeFollower)
// router.post("/users/delete", userController.deleteUser)


router.post("/recipes/create", upload.single("image"),recipeController.createRecipe)
router.get("/recipes/:recipeId/getOne",recipeController.getOne)
router.get("/recipes/getAll",recipeController.getAll)
router.post("/recipe/edit",upload.single("image"),recipeController.editRecipe)
// router.get("/recipes/:recipeId/getOneWithLikes",recipeController.getOneWithLikes)
// router.post("/recipes/:recipeId/like",recipeController.likeRecipe)
// router.post("/recipes/:recipeId/dislike",recipeController.dislikeRecipe)
// router.post("/recipes/:recipeId/comment",recipeController.recipeComment)
// router.get("/recipes/:recipeId/getRecipeWithComments",recipeController.getRecipeWithComments)

// router.post("/recipes/:recipeId/deleteRecipe",recipeController.deleteRecipe)

module.exports = router
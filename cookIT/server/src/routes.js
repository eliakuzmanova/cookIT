const router = require("express").Router();
const multer = require("multer")
const upload = multer({dest: "uploads/"})

const userController = require("../controllers/userController");
const recipeController = require("../controllers/recipeController");
const authController = require("../controllers/authController");


router.post("/register", authController.register)
router.post("/login", authController.login)

router.get("/users/:id", userController.getOneById)
router.post("/profile/edit", upload.single("image"),userController.editProfile)

router.post("/recipes/create", upload.single("image"),recipeController.createRecipe)
router.get("/recipes/:recipeId/getOne",recipeController.getOne)
router.get("/recipes/getAll",recipeController.getAll)
router.post("/recipe/edit",upload.single("image"),recipeController.editRecipe)

module.exports = router
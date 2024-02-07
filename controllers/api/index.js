// setup api routes

//using router, setting up api routes
const router = require("express").Router();
const ingredientRoutes = require("./IngredientRoutes");
const recipeRoutes = require("./RecipeRoutes");
const userRoutes = require("./UserRoutes");
const commentRoutes = require("./CommentRoutes");

router.use("/recipes", recipeRoutes);
router.use("/ingredients", ingredientRoutes);
router.use("/users", userRoutes);
router.use("/comments", commentRoutes);

module.exports = router;

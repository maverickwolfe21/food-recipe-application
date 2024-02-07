// setup api routes

//using router, setting up api routes
const router = require('express').Router();
// const ingerdientRoutes = require('./IngredientRoutes');
const recipeRoutes = require('./RecipeRoutes');
// const userRoutes = require('./UserRoutes');



router.use('/recipes', recipeRoutes);


module.exports = router;

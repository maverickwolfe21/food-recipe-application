const sequelize = require("../config/connection");
const { User, Comment, Ingredient, Recipe } = require("../models");

const userData = require("./userData.json");
const recipeData = require("./recipeData");
const commentData = require("./commentData");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const recipe of recipeData) {
    const dbRecipe = await Recipe.create({
      ...recipe,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });

    for (const ingredient of recipe.ingredients) {
      const dbIngredient = await Ingredient.create({
        ...ingredient,
        recipe_id: dbRecipe.id,
      });
    }
  }

  for (const comment of commentData) {
    const comments = await Comment.create({
      ...comment,
      user_id: comment.user_id,
      recipe_id: comment.recipe_id,
    });
  }

  process.exit(0);
};

seedDatabase();

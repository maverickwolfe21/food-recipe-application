//import modules
const router = require("express").Router();
const { Recipe, Ingredient, Comment, User } = require("../models");
const withAuth = require("../utils/auth");

//route to render homepage
router.get("/", async (req, res) => {
  try {
    // Find all posts with associated usernames
    const recipeData = await Recipe.findAll({
      //include: [{ model: User, attributes: ["username"] }],
    });
    //convert post to plain text
    const recipes = recipeData.map((recipe) => recipe.get({ plain: true }));
    // Render homepage template with posts and login status
    res.render("homepage", { recipes });
    // logged_in: req.session.logged_in });
    // If there is an error, return 500 status code and error message
  } catch (err) {
    res.status(500).json(err);
  }
});

  router.get("/recipe/:id", async (req, res) => {
    try {
        const recipeData =  await Recipe.findByPk(req.params.id, {
include: [{ model: User}, { model:Ingredient}]
        })
    }catch (err) {
    } 
  });

  router.get("/recipe/:dashboard", async (req, res) => {
    try {
      const recipeData =  await Ingredient.findByPk(req.params.dashboard, {
include: [{ model: User}, { model:Ingredient}]
      });
      if(!recipeData)
  }catch (err) {
  }
});

router.get("/recipe/:logIn", async (req, res) => {
  try {
    const recipeData =  await Comment.findByPk(req.params.logIn, {
include: [{ model: User}, { model:Ingredient}]
    })
}catch (err) {
}
});


//route to render single recipe page
// router.get("/recipe/:id", async (req, res) => {
//   try {
//     // Find the post with the requested ID
//     const recipeData = await Recipe.findByPk(req.params.id, {
//       include: [
//         {
//           model: Ingredient,
//           attributes: ["id", "name", "amount"],
//         },
//         {
//           model: Comment,
//           attributes: [
//             "id",
//             "comment_text",
//             "recipe_id",
//             "user_id",
//             "date_created",
//           ],
//           include: {
//             model: User,
//             attributes: ["username"],
//           },
//         },
//       ],
//     });
//     //convert post to plain text
//     const recipes = recipeData.get({ plain: true });
//     // Render single-post template with post and login status
//     res.render("recipe", { recipes });
//     // logged_in: req.session.logged_in });
//     // If there is an error, return 500 status code and error message
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });
module.exports = router;

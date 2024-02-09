//import modules
const router = require("express").Router();
const { Recipe, Ingredient, Comment, User } = require("../models");
const withAuth = require("../utils/auth");

//route to render homepage
router.get("/", async (req, res) => {
  try {
    const recipeData = await Recipe.findAll({
      include: [{ model: User, attributes: ["name"] }],
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
// route to render single recipe page
router.get("/recipe/:id", async (req, res) => {
  try {
    const recipeData = await Recipe.findByPk(req.params.id, {
      include: [{ model: Ingredient, attributes: ["name", "amount"] }],
    });
    if (!recipeData) {
      res.status(404).json({ message: "No recipe found with this id!" });
      return;
    }

    const recipe = recipeData.get({ plain: true });
    res.render("recipe", recipe);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  // if (req.session.logged_in) {
  //   res.redirect("/profile");
  //   return;
  // }

  res.render("login");
});

router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res.status(400).json({ message: "Incorrect email or password, please try again" });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: "Incorrect email or password, please try again" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;

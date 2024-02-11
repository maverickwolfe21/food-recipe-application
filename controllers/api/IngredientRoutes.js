const router = require("express").Router();
const { Ingredient } = require("../../models");
const withAuth = require("../../utils/auth");

//get request to pull ingredient data
router.get("/", async (req, res) => {
  try {
    const ingredientData = await Ingredient.findAll();
    res.status(200).json(ingredientData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a single ingredient
router.get("/:id", async (req, res) => {
  try {
    const ingredientData = await Ingredient.findByPk(req.params.id);
    if (!ingredientData) {
      res.status(404).json({ message: "No ingredient found with this id!" });
      return;
    }
    res.status(200).json(ingredientData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", withAuth, async (req, res) => {
  try {
    const newProject = await Ingredient.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newProject);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;

const router = require('express').Router();
const { Recipe } = require('../../models');
const { Ingredient } = require('../../models');


//get request to pull recipe data

router.get('/', async (req, res) => {
    try {
        const recipeData = await Recipe.findAll();
        res.status(200).json(recipeData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET a single recipe
router.get('/:id', async (req, res) => {
    try {
        const recipeData = await Recipe.findByPk(req.params.id, {
            // JOIN with locations, using the Trip through table
            include: [{ model: Ingredient, attributes: ["name", "amount"] }]
        });

        if (!recipeData) {
            res.status(404).json({ message: 'No traveller found with this id!' });
            return;
        }

        res.status(200).json(recipeData);
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;
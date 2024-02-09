const { Comment } = require("../models");

const commentData = [
  {
    comment_text: "Great recipe!",
    user_id: 1,
    recipe_id: 1,
  },
  {
    comment_text: "I love these!",
    user_id: 2,
    recipe_id: 1,
  },
  {
    comment_text: "This did not turn out good!",
    user_id: 3,
    recipe_id: 2,
  },
  {
    comment_text: "Can't wait to try this!",
    user_id: 4,
    recipe_id: 2,
  },
  {
    comment_text: "Hope you guus like this!",
    user_id: 5,
    recipe_id: 3,
  },
  {
    comment_text: "I love this recipe!",
    user_id: 1,
    recipe_id: 3,
  },
  {
    comment_text: "I tried this and it was horrible!",
    user_id: 2,
    recipe_id: 4,
  },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;

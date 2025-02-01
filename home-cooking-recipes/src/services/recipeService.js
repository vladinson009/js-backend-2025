import Recipe from '../models/Recipe.js';
function createRecipe(data, owner) {
  try {
    for (const field in data) {
      if (data[field].trim() == '') {
        throw new Error(`${field} field is required!`);
      }
    }

    return Recipe.create({ ...data, owner });
  } catch (error) {
    throw error;
  }
}
function getLastThree() {
  return Recipe.find({})
    .sort({ _id: -1 }) // Sort by _id in descending order (to get the most recent)
    .limit(3); // Limit the result to the last three
}
function getAllRecipes() {
  return Recipe.find();
}
function getRecipeById(recipeId) {
  return Recipe.findById(recipeId);
}
async function recommendRecipe(recipeId, userId) {
  if (userId) {
    const recipe = await Recipe.findOne({
      _id: recipeId,
      recommendList: {
        $in: [userId],
      },
    });

    if (recipe) {
      throw new Error('You already recommended this recipe');
    }
    return Recipe.findByIdAndUpdate(
      recipeId,
      {
        $addToSet: { recommendList: userId },
      },
      { new: true }
    );
  }
}
function deleteById(recipeId) {
  return Recipe.findByIdAndDelete(recipeId);
}
function editRecipeById(recipeId, userInput) {
  for (const field in userInput) {
    if (userInput[field].trim() == '') {
      throw new Error(`${field} field is required!`);
    }
  }
  return Recipe.findByIdAndUpdate(recipeId, { ...userInput }, { runValidators: true });
}
function searchByCriteria(criteria) {
  return Recipe.find({ title: { $regex: criteria, $options: 'i' } });
}
export default {
  createRecipe,
  getLastThree,
  getAllRecipes,
  getRecipeById,
  recommendRecipe,
  deleteById,
  editRecipeById,
  searchByCriteria,
};

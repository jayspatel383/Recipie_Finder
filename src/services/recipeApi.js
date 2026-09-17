// src/services/recipeApi.js

const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;
const BASE_URL = "https://api.spoonacular.com/recipes";

export const searchRecipes = async (query) => {
  try {
    const response = await fetch(
      `${BASE_URL}/complexSearch?query=${query}&number=12&apiKey=${API_KEY}`
    );

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return [];
  }
};

export const getRecipeDetails = async (id) => {
  try {
    const response = await fetch(
      `${BASE_URL}/${id}/information?apiKey=${API_KEY}`
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching recipe details:", error);
    return null;
  }
};
import { useState } from "react";
import RecipeCard from "../components/RecipeCard";
import SearchBar from "../components/SearchBar";
import { searchRecipes } from "../services/recipeApi";

function Home() {
  const [recipes, setRecipes] = useState([]);

  const handleSearch = async (query) => {
    const results = await searchRecipes(query);
    setRecipes(results);
  };

  return (
    <div>
      <h1 className="home-title">Recipe Finder</h1>

      <SearchBar onSearch={handleSearch} />

      <div className="recipe-container">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
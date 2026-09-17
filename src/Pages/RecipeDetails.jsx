import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import FavoriteButton from "../components/FavoriteButton";
import { getRecipeDetails } from "../services/recipeApi";

function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    getRecipeDetails(id)
      .then((data) => {
        if (cancelled) return;
        if (!data) {
          setError("Recipe not found");
        } else {
          setRecipe(data);
        }
      })
      .catch(() => {
        if (!cancelled) setError("Failed to load recipe");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) return <h2 style={{ padding: "40px" }}>Loading...</h2>;
  if (error) return <h2 style={{ padding: "40px" }}>{error}</h2>;
  if (!recipe) return null;

  const ingredients = recipe.extendedIngredients || [];

  const steps =
    recipe.analyzedInstructions?.[0]?.steps?.map((s) => s.step) || [];

  return (
    <div className="recipe-details">
      <Link to="/" className="back-link">← Back to Search</Link>

      <h1>{recipe.title}</h1>

      <div className="details-image-wrap">
        <img src={recipe.image} alt={recipe.title} />
        <FavoriteButton recipe={recipe} />
      </div>

      <p className="details-meta">
        <strong>Ready in:</strong> {recipe.readyInMinutes ?? "—"} min
        &nbsp;•&nbsp;
        <strong>Servings:</strong> {recipe.servings ?? "—"}
      </p>

      <h2>Ingredients</h2>
      {ingredients.length > 0 ? (
        <ul>
          {ingredients.map((ing) => (
            <li key={ing.id}>{ing.original}</li>
          ))}
        </ul>
      ) : (
        <p>No ingredients available.</p>
      )}

      <h2>Instructions</h2>
      {steps.length > 0 ? (
        <ol>
          {steps.map((step, idx) => (
            <li key={idx} style={{ marginBottom: "10px", lineHeight: 1.7 }}>
              {step}
            </li>
          ))}
        </ol>
      ) : recipe.instructions ? (
        <div dangerouslySetInnerHTML={{ __html: recipe.instructions }} />
      ) : (
        <p>No instructions available.</p>
      )}

      {recipe.sourceUrl && (
        <p style={{ marginTop: "24px" }}>
          <a href={recipe.sourceUrl} target="_blank" rel="noreferrer">
            View original source
          </a>
        </p>
      )}
    </div>
  );
}

export default RecipeDetails;
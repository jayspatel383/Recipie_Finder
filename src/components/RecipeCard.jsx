import { Link } from "react-router-dom";
import FavoriteButton from "./FavoriteButton";

const FALLBACK_IMG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='220' viewBox='0 0 400 220'%3E%3Crect fill='%23ede9e1' width='400' height='220'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='central' text-anchor='middle' fill='%23999084' font-family='Inter,sans-serif' font-size='18'%3ENo image%3C/text%3E%3C/svg%3E";

function RecipeCard({ recipe }) {
  return (
    <div className="recipe-card">
      <div className="recipe-image-wrap">
        <img
          src={recipe.image || FALLBACK_IMG}
          alt={recipe.title}
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = FALLBACK_IMG;
          }}
        />
        <FavoriteButton recipe={recipe} />
      </div>

      <h3>{recipe.title}</h3>

      <Link to={`/recipe/${recipe.id}`}>View recipe</Link>
    </div>
  );
}

export default RecipeCard;
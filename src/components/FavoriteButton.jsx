import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import {
  addFavorite,
  isFavorited,
  removeFavorite,
} from "../services/favoritesApi";

function FavoriteButton({ recipe }) {
 
  const recipeId = recipe.idMeal ?? recipe.id;
  const recipeTitle = recipe.strMeal ?? recipe.title;
  const recipeImage = recipe.strMealThumb ?? recipe.image;

  const { user } = useAuth();
  const navigate = useNavigate();
  const [favorited, setFavorited] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user || !recipeId) return;

    let cancelled = false;

    isFavorited(recipeId)
      .then((result) => {
        if (!cancelled) setFavorited(result);
      })
      .catch(() => {
        if (!cancelled) setFavorited(false);
      });

    return () => {
      cancelled = true;
    };
  }, [user, recipeId]);

  const toggle = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      toast.error("Please log in to save favorites");
      navigate("/login");
      return;
    }

    setLoading(true);
    try {
      if (favorited) {
        await removeFavorite(recipeId);
        setFavorited(false);
        toast.success("Removed from favorites");
      } else {
        await addFavorite({
          id: recipeId,
          title: recipeTitle,
          image: recipeImage,
        });
        setFavorited(true);
        toast.success("Added to favorites!");
      }
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className={`favorite-btn ${favorited ? "active" : ""}`}
      onClick={toggle}
      disabled={loading}
      aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
    >
      {favorited ? "❤️" : "🤍"}
    </button>
  );
}

export default FavoriteButton;
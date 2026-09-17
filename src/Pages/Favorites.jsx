import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FavoriteButton from "../components/FavoriteButton";
import { useAuth } from "../context/useAuth";
import { getFavorites } from "../services/favoritesApi";

function Favorites() {
  const { user, loading: authLoading } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    let cancelled = false;

    getFavorites()
      .then((data) => {
        if (!cancelled) setFavorites(data);
      })
      .catch(() => {
        if (!cancelled) setFavorites([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [user]);

  if (authLoading) return null;

  if (!user) {
    return (
      <div className="empty-page">
        <h1>Please log in</h1>
        <p>You need an account to view your favorites.</p>
        <Link to="/login" className="navbar-btn">Log in</Link>
      </div>
    );
  }

  return (
    <div className="favorites-page">
      <h1 className="home-title">Your Favorites</h1>

      {loading ? (
        <p style={{ textAlign: "center" }}>Loading...</p>
      ) : favorites.length === 0 ? (
        <div className="empty-page">
          <p>You haven't saved any recipes yet.</p>
          <Link to="/" className="navbar-btn">Browse recipes</Link>
        </div>
      ) : (
        <div className="recipe-container">
          {favorites.map((fav) => {
            const recipe = {
              id: fav.recipe_id,
              title: fav.recipe_title,
              image: fav.recipe_image,
            };
            return (
              <div key={fav.id} className="recipe-card">
                <div className="recipe-image-wrap">
                  <img src={fav.recipe_image} alt={fav.recipe_title} />
                  <FavoriteButton recipe={recipe} />
                </div>
                <h3>{fav.recipe_title}</h3>
                <Link to={`/recipe/${fav.recipe_id}`}>View recipe</Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Favorites;
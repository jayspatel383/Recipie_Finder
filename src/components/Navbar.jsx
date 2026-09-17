import toast from "react-hot-toast";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

function Navbar() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Signed out");
      navigate("/");
    } catch {
      toast.error("Failed to sign out");
    }
  };

  return (
    <nav className="navbar">
      {/* Left: brand + primary nav */}
      <div className="navbar-left">
        <Link to="/" className="navbar-brand">
          Recipe Finder
        </Link>

        <div className="navbar-nav">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `navbar-link ${isActive ? "navbar-link-active" : ""}`
            }
          >
            Home
          </NavLink>

          {user && (
            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                `navbar-link ${isActive ? "navbar-link-active" : ""}`
              }
            >
              <span className="navbar-heart">❤</span> Favorites
            </NavLink>
          )}
        </div>
      </div>

      {/* Right: user area */}
      <div className="navbar-right">
        {user ? (
          <>
            <span className="navbar-user" title={user.email}>
              {user.email}
            </span>
            <button className="navbar-btn navbar-btn-ghost" onClick={handleSignOut}>
              Sign out
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="navbar-link">
              Login
            </Link>
            <Link to="/signup" className="navbar-btn">
              Sign up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
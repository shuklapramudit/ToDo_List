import { Link, useLocation, useNavigate } from "react-router-dom";
import "../style/Header.css";

function Header() {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <header className="header">
            <div className="logo" onClick={() => navigate("/dashboard")}>
                <h2>Todo App</h2>
            </div>

            <nav className="nav-links">
                <Link 
                    to="/dashboard" 
                    className={`nav-item ${location.pathname === "/dashboard" ? "active" : ""}`}
                >
                    Dashboard
                </Link>
                <Link 
                    to="/about" 
                    className={`nav-item ${location.pathname === "/about" ? "active" : ""}`}
                >
                    About
                </Link>
                <Link 
                    to="/privacy-policy" 
                    className={`nav-item ${location.pathname === "/privacy-policy" ? "active" : ""}`}
                >
                    Privacy Policy
                </Link>
                <button className="logout-btn" onClick={handleLogout}>
                    Logout
                </button>
            </nav>
        </header>
    );
}

export default Header;
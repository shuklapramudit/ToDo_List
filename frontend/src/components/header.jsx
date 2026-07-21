import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../style/Header.css";

function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <header className="header">
            <div className="header-container">
                <div 
                    className="logo" 
                    onClick={() => {
                        navigate("/dashboard");
                        closeMenu();
                    }}
                >
                    <h2>Todo App</h2>
                </div>

                {/* Hamburger Toggle Button for Mobile */}
                <button 
                    className={`hamburger ${isMenuOpen ? "open" : ""}`} 
                    onClick={toggleMenu}
                    aria-label="Toggle Navigation"
                >
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </button>

                <nav className={`nav-links ${isMenuOpen ? "active" : ""}`}>
                    <Link 
                        to="/dashboard" 
                        className={`nav-item ${location.pathname === "/dashboard" ? "active" : ""}`}
                        onClick={closeMenu}
                    >
                        Dashboard
                    </Link>
                    <Link 
                        to="/about" 
                        className={`nav-item ${location.pathname === "/about" ? "active" : ""}`}
                        onClick={closeMenu}
                    >
                        About
                    </Link>
                    <Link 
                        to="/privacy-policy" 
                        className={`nav-item ${location.pathname === "/privacy-policy" ? "active" : ""}`}
                        onClick={closeMenu}
                    >
                        Privacy Policy
                    </Link>
                    <button 
                        className="logout-btn" 
                        onClick={() => {
                            handleLogout();
                            closeMenu();
                        }}
                    >
                        Logout
                    </button>
                </nav>
            </div>
        </header>
    );
}

export default Header;
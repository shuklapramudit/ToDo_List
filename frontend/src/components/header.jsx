import { useNavigate } from "react-router-dom";
import "../style/Header.css";

function Header() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <header className="header">
            <div className="logo">
                <h2>Todo App</h2>
            </div>

            <nav>
                <button
                    className="logout-btn"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </nav>
        </header>
    );
}

export default Header;
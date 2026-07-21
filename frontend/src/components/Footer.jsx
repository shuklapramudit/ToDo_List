import { Link } from "react-router-dom";
import "../style/Footer.css";

function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-container">
        <p>&copy; {new Date().getFullYear()} Todo App. All rights reserved.</p>
        <span className="footer-tagline">Built for Seamless Productivity 🚀</span>
        <div className="footer-links">
          <Link to="/privacy-policy" className="footer-link">Privacy Policy</Link>
        </div>
        <div className="footer-credit">
          <p>Designed & Developed by <a href="https://pramudit-portfolio.web.app" target="_blank" rel="noopener noreferrer" className="developer-link">Pramudit Shukla</a></p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
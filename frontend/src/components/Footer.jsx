import "../style/Footer.css";

function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-container">
        <p>&copy; {new Date().getFullYear()} Todo App. All rights reserved.</p>
        <span className="footer-tagline">Built for Seamless Productivity 🚀</span>
      </div>
    </footer>
  );
}

export default Footer;
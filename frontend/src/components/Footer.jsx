import "../style/Footer.css";

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p>&copy; {new Date().getFullYear()} Todo App. All rights reserved.</p>
                <div className="footer-links">
                    <span>Built with React & Node.js</span>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
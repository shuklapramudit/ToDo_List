import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../style/About.css";

function About() {
  return (
    <div className="about-page-wrapper">
      <Header />

      <main className="about-main">
        <div className="about-card">
          <h1 className="about-title">About Todo App</h1>
          <p className="about-subtitle">
            A modern, fast, and intuitive task management tool designed to keep your work organized.
          </p>

          <div className="feature-grid">
            <div className="feature-card">
              <h3>⚡ Dynamic Task Tracking</h3>
              <p>Organize daily work seamlessly with real-time status updates.</p>
            </div>
            <div className="feature-card">
              <h3>🏷️ Priority System</h3>
              <p>Tag tasks as High, Medium, or Low priority to tackle urgent items first.</p>
            </div>
            <div className="feature-card">
              <h3>💬 Comments & Stages</h3>
              <p>Track progress stages: Pending, In Progress, and Completed along with progress notes.</p>
            </div>
            <div className="feature-card">
              <h3>🔒 Secure Auth</h3>
              <p>Isolate your tasks safely using JWT-based user authentication.</p>
            </div>
          </div>

          <div className="about-extra">
            <div className="privacy-section about">
              <h2>Privacy Policy</h2>
              <p>
                Your privacy matters to us. We are committed to protecting your personal data and ensuring transparency in how we collect, use, and safeguard your information.
              </p>
              <Link to="/privacy-policy" className="about-privacy-link">
                Read Full Privacy Policy →
              </Link>
            </div>

            <div className="developer-section">
              <div className="developer-avatar">👨‍💻</div>
              <h2>Designed & Developed by</h2>
              <a 
                href="https://pramudit-portfolio.web.app" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="developer-name"
              >
                Pramudit Shukla
              </a>
              <p className="developer-portfolio-text">
                Just pushed my Full Stack portfolio live on Firebase! It showcases solutions built with MERN, Laravel, and React. I'm actively looking for feedback.
              </p>
              <a 
                href="https://pramudit-portfolio.web.app" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="portfolio-link"
              >
                View Portfolio →
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default About;
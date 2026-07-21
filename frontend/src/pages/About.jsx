import Header from "../components/Header";
import Footer from "../components/Footer";
import "../style/About.css";

function About() {
  return (
    <div className="page-wrapper">
      <Header />
      <main className="about-main">
        <div className="about-card">
          <h1>About Todo App</h1>
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
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default About;
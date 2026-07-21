import Header from "../components/Header";
import Footer from "../components/Footer";
import "../style/About.css";

function About() {
    return (
        <div className="page-layout">
            <Header />
            <main className="about-container">
                <div className="about-card">
                    <h1>About Todo App</h1>
                    <p className="about-description">
                        Welcome to <strong>Todo App</strong>! Designed to help you track daily tasks, organize workflow, and improve productivity.
                    </p>

                    <div className="features-grid">
                        <div className="feature-item">
                            <h3>⚡ Task Management</h3>
                            <p>Easily create, update, and manage tasks with status indicators.</p>
                        </div>
                        <div className="feature-item">
                            <h3>🎯 Priority Tagging</h3>
                            <p>Categorize tasks by High, Medium, or Low priorities.</p>
                        </div>
                        <div className="feature-item">
                            <h3>💬 Comments & Stage Track</h3>
                            <p>Keep track of task progress with stages like Pending, In Progress, and Completed.</p>
                        </div>
                        <div className="feature-item">
                            <h3>🔒 Secure Storage</h3>
                            <p>Your tasks are safely saved with user account isolation.</p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default About;
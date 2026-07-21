import "../style/PrivacyPolicy.css";

function PrivacyPolicy() {
    return (
        <div className="privacy-wrapper">
            <div className="privacy-card">
                <h1>Privacy Policy</h1>
                <p className="privacy-updated">Last updated: July 21, 2026</p>

                <section className="privacy-section">
                    <h2>1. Introduction</h2>
                    <p>Welcome to Todo App. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you use our application.</p>
                </section>

                <section className="privacy-section">
                    <h2>2. Information We Collect</h2>
                    <p>We collect and process the following data:</p>
                    <ul>
                        <li><strong>Account Information:</strong> Name, email address, and password when you register.</li>
                        <li><strong>Task Data:</strong> Tasks, descriptions, priorities, and status that you create.</li>
                        <li><strong>Authentication Data:</strong> JWT tokens for session management.</li>
                        <li><strong>Usage Data:</strong> Basic interaction data to improve our services.</li>
                    </ul>
                </section>

                <section className="privacy-section">
                    <h2>3. How We Use Your Information</h2>
                    <p>We use your data to:</p>
                    <ul>
                        <li>Provide and maintain the Todo App service</li>
                        <li>Authenticate your account and manage sessions</li>
                        <li>Store and sync your tasks across devices</li>
                        <li>Improve user experience and app functionality</li>
                        <li>Communicate important updates about the service</li>
                    </ul>
                </section>

                <section className="privacy-section">
                    <h2>4. Data Storage and Security</h2>
                    <p>Your data is stored securely using industry-standard encryption. We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
                </section>

                <section className="privacy-section">
                    <h2>5. Data Sharing</h2>
                    <p>We do not sell, trade, or rent your personal data to third parties. Your data is only shared with service providers necessary for the operation of the app, such as hosting providers, under strict confidentiality agreements.</p>
                </section>

                <section className="privacy-section">
                    <h2>6. Your Rights</h2>
                    <p>You have the right to:</p>
                    <ul>
                        <li>Access your personal data</li>
                        <li>Correct inaccurate data</li>
                        <li>Request deletion of your account and data</li>
                        <li>Export your tasks and data</li>
                        <li>Withdraw consent at any time</li>
                    </ul>
                </section>

                <section className="privacy-section">
                    <h2>7. Cookies</h2>
                    <p>We use localStorage to store your authentication token. This is necessary for the app to function properly and is not used for tracking purposes.</p>
                </section>

                <section className="privacy-section">
                    <h2>8. Children's Privacy</h2>
                    <p>Our app is not intended for children under 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal data, please contact us.</p>
                </section>

                <section className="privacy-section">
                    <h2>9. Changes to This Policy</h2>
                    <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.</p>
                </section>

                <section className="privacy-section">
                    <h2>10. Contact Us</h2>
                    <p>If you have any questions about this Privacy Policy, please contact us at privacy@todoapp.com.</p>
                </section>
            </div>
        </div>
    );
}

export default PrivacyPolicy;

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import PrivateRoute from "./components/PrivateRoute";
import ProtectedLayout from "./components/ProtectedLayout";
import "./style/App.css";

function App() {
    return (
        <BrowserRouter>
            <Routes>

                {/* Public Routes */}
                <Route
                    path="/"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                {/* Protected Routes with Global Header & Footer */}
                <Route element={<PrivateRoute><ProtectedLayout /></PrivateRoute>}>
                    <Route
                        path="/dashboard"
                        element={<Dashboard />}
                    />
                    <Route
                        path="/about"
                        element={<About />}
                    />
                    <Route
                        path="/privacy-policy"
                        element={<PrivacyPolicy />}
                    />
                </Route>

            </Routes>
        </BrowserRouter>
    );
}

export default App;

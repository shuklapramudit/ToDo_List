import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import PrivateRoute from "./components/PrivateRoute";

function App() {
    return (
        <BrowserRouter>
            <Routes>

                {/* Login Page */}
                <Route
                    path="/"
                    element={<Login />}
                />

                {/* Register Page */}
                <Route
                    path="/register"
                    element={<Register />}
                />

                {/* Protected Dashboard */}
                <Route
                    path="/dashboard"
                    element={
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>
                    }
                />

                {/* Protected About Page */}
                <Route
                    path="/about"
                    element={
                        <PrivateRoute>
                            <About />
                        </PrivateRoute>
                    }
                />

            </Routes>
        </BrowserRouter>
    );
}

export default App;
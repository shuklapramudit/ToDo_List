import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../style/Auth.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    console.log("Login Clicked");

    const API = import.meta.env.VITE_API_URL;
    console.log("API URL:", API);

    try {
      const res = await axios.post(`${API}/api/auth/login`, {
        email,
        password,
      });

      console.log("Response:", res.data);

      localStorage.setItem("token", res.data.token);

      alert("Login Successful");
      navigate("/dashboard");
    } catch (error) {
      console.error("Login Error:", error);
      console.log("Response:", error.response);

      alert(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Login</h1>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>
        </form>

        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;

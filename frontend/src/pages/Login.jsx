import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

// Alert component
const Alert = ({ message, type }) => (
  <div
    className={`fixed top-5 right-5 px-4 py-3 rounded-lg text-white shadow-lg z-50
      ${type === "success" ? "bg-green-600" : "bg-red-600"}
    `}
  >
    {message}
  </div>
);

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: "", type: "" });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!email || !password) {
      setAlert({ show: true, message: "Please fill all the fields", type: "error" });
      setTimeout(() => setAlert({ show: false, message: "", type: "" }), 1500);
      setLoading(false);
      return;
    }

    try {
      const result = await axios.post("http://localhost:3000/api/auth/login", { email, password });
      const token = result.data.token;

      if (!token) {
        setAlert({ show: true, message: "Login failed: no token returned", type: "error" });
        setLoading(false);
        return;
      }

      localStorage.setItem("token", token);
      setAlert({ show: true, message: "Login successful 🎉", type: "success" });

      setTimeout(() => {
        navigate("/home");
      }, 1500);
    } catch (err) {
      setAlert({ show: true, message: err.response?.data?.error || "Login failed", type: "error" });
    } finally {
      setLoading(false);
      setTimeout(() => {
        setAlert({ show: false, message: "", type: "" });
      }, 3000);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600">
      {alert.show && <Alert message={alert.message} type={alert.type} />}
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-600 mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 cursor-pointer rounded-lg font-semibold text-white
              ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-500 hover:bg-indigo-600"}
            `}
          >
            {loading ? (
              <div className="flex justify-center">
                <div className="h-5 w-5 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          Don’t have an account?{" "}
          <Link to="/" className="text-indigo-500 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

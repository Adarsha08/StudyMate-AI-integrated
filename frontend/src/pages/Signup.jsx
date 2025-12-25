import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  //defining the state variables for name,email,password
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const navigate = useNavigate();//hook to navigate programmatically

  const handleChange = async (e) => {//function to handle form submission and register user to check if the field are empty
    e.preventDefault();

    if (!name || !email || !password) {
      alert("Please fill all the fields");
      return;
    }

    try {
      //api call to register user
      const result = await axios.post(
        "http://localhost:3000/api/auth/register",
        { name, email, password }
      );

      console.log(result.data);
      alert("Registration successful");

      setname("");
      setemail("");
      setpassword("");

      navigate("/login"); // redirect to login page after successful registration
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    //form for user registration
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>

        <form onSubmit={handleChange} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              value={name}
              onChange={(e) => setname(e.target.value)}
              type="text"
              placeholder="Enter your name"
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setemail(e.target.value)}
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              type="password"
              placeholder="Enter your password"
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Register
          </button>

          <p className="text-sm text-center text-gray-600">
            Already have an account?
          </p>
 
          <Link   //link to login page//
            to="/login"
            className="block w-full py-2 border border-green-500 text-green-600 rounded-lg text-center"
          >
            Login
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Signup;

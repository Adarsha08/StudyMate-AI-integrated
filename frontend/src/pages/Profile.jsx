import React from "react";
import { FaUserCircle, FaEnvelope, FaCalendarAlt, FaSignOutAlt } from "react-icons/fa";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";




const Profile = () => {

  const [user, setUser] = useState({
    name: "",
    email: "",
    joined: "",
  });
  const[loading,setLoading]=useState(false);


 
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      console.log('Profile fetch - token:', token);
      try {
        const response = await axios.get("http://localhost:3000/api/auth", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser({
          name: response.data.name,
          email: response.data.email,
          joined: new Date(response.data.joined).toLocaleDateString(),
        });
      }
      catch (error) {
        console.error("Error fetching profile:", error);
        if (error.response?.status === 401) {
          // Token missing/invalid - send user to login
          window.location.href = "/login";
        }
      }
    };  

      useEffect(() => {
      fetchProfile();
    }, []); 
   


  const handleLogout = () => {
    setLoading(true);
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-900 to-gray-900 p-6">
      <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 max-w-md w-full text-white transform transition-all duration-500 hover:scale-105">
        {/* Profile Icon */}
        <div className="flex flex-col items-center mb-6">
          <FaUserCircle className="text-6xl text-blue-400 mb-3 animate-bounce" />
          <h2 className="text-3xl font-bold">{user.name}</h2>
        </div>

        {/* User Details */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 bg-gray-700 p-3 rounded-lg hover:bg-gray-600 transition-all duration-300">
            <FaEnvelope className="text-blue-400" />
            <p className="text-lg">{user.email}</p>
          </div>
          <div className="flex items-center gap-3 bg-gray-700 p-3 rounded-lg hover:bg-gray-600 transition-all duration-300">
            <FaCalendarAlt className="text-blue-400" />
            <p className="text-lg">Joined: {user.joined}</p>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          disabled={loading}
          className="flex cursor-pointer items-center justify-center gap-2 mt-6 w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-xl transition-transform duration-300 transform hover:scale-105 shadow-lg"
        >
          <FaSignOutAlt /> Logout
          {loading && (
  <div className="flex justify-center mt-4">
    <div className="h-6 w-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
)}
        </button>
      </div>
    </div>
  );
};

export default Profile;

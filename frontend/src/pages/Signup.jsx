import React from 'react'
import { Link } from 'react-router-dom';

const Signup = () => {
const [name, setname] =React.useState("");
const [email, setemail] =React.useState("");
const [password, setpassword] =React.useState("");

const handlechanage = (e) => {
    e.preventDefault();
    if(email,name,password===""){
    alert("Please fill all the fields")
    return;
  }

    axios.post('http://localhost:3001/api/auth/register', { name, email, password })
      .then(result => {
        console.log(result);
        setname("");
        setemail("");
        setpassword("");
        navigate("/login"); 
      })
      .catch(err => console.log(err));
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>

        <form 
        onSubmit={handlechanage} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              value={name}
              onChange={(e) => setname(e.target.value)}
              type="text"
              placeholder="Enter your name"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              value={email}
              onChange={(e) => setemail(e.target.value)}
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              type="password"
              placeholder="Enter your password"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <button
            type="submit"
            className="cursor-pointer w-full py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
          >
            Register
          </button>

          <p className="text-sm text-center text-gray-600">Already have an account?</p>

          <Link
            to="/login"
            type="button"
            className="block w-full py-2 border border-green-500 text-green-600 rounded-lg hover:bg-green-50 transition text-center"
          >
            Login
          </Link>
        </form>
      </div>
    </div>
  )
}

export default Signup
import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="mt-5 ml-5 flex flex-col items-center gap-6">
      <h2 className="mb-6 text-white text-xl font-bold">StudyMate-AI</h2>

      <div className="flex flex-col gap-10 w-full">
        <NavLink
          to="/"
          className="h-10 w-40 bg-[#0F172A] text-white flex justify-center items-center rounded hover:bg-[#1E2A45] transition-colors duration-200"
        >
          Mynotes
        </NavLink>

        <NavLink
          to="/login"
          className="h-10 w-40 bg-[#0F172A] text-white flex justify-center items-center rounded hover:bg-[#1E2A45] transition-colors duration-200"
        >
        Login
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;

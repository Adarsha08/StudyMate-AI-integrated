import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="mt-5 ml-5 flex flex-col items-center gap-6">
      {/* Updated title */}
      <h2 className="mb-6 text-white text-lg font-semibold tracking-wide">
        StudyMate-AI
      </h2>

      <div className="flex flex-col gap-4 w-full">
        <NavLink
          to="/home"
          className="h-10 w-40 bg-[#0F172A] text-white flex justify-center items-center rounded hover:bg-[#1E2A45] transition-all duration-300 transform hover:scale-105"
        >
          Mynotes
        </NavLink>

        <NavLink
          to="/home/profile"
          className="h-10 w-40 bg-[#0F172A] text-white flex justify-center items-center rounded hover:bg-[#1E2A45] transition-all duration-300 transform hover:scale-105"
        >
          Profile
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;

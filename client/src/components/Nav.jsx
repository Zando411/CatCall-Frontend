import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/outlinedLogo.svg";
import profileIcon from "../assets/profile.svg";

export default function Nav() {
  const avatarImage = profileIcon;

  return (
    <nav className="bg-accent absolute top-0 flex h-20 w-full items-center justify-center px-8 text-white">
      <NavLink to="/dashboard" end>
        <img src={logo} alt="CatCall Logo" className="h-16" />
      </NavLink>
      <div className="absolute top-4 right-4 flex h-12 w-12 items-center justify-center overflow-hidden rounded-full shadow-md outline-2 outline-white">
        <img
          src={avatarImage}
          alt="Avatar"
          className="color-white h-2/3 w-2/3 object-cover"
        />
      </div>
    </nav>
  );
}

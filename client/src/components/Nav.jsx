import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/outlinedLogo.svg";
import heroImage from "../assets/heroImage.jpg";

export default function Nav() {
  const avatarImage = heroImage;

  return (
    <nav className="bg-accent relative flex h-20 items-center justify-center px-8 text-white">
      <NavLink to="/" end>
        <img src={logo} alt="CatCall Logo" className="h-16" />
      </NavLink>
      <div className="absolute top-4 right-4 flex h-12 w-12 items-center justify-center overflow-hidden rounded-full shadow-md">
        {avatarImage ? (
          <img
            src={avatarImage}
            alt="Avatar"
            className="h-full w-full object-cover"
          />
        ) : (
          <span>MZ</span> // Replace "ZZ" with initials or any placeholder text
        )}
      </div>
    </nav>
  );
}

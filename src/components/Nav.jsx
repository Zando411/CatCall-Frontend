import { useContext } from "react";
import { AuthContext } from "../utils/AuthContext";
import { NavLink } from "react-router-dom";
import logo from "../assets/outlinedLogo.svg";
import profileIcon from "../assets/profile.svg";
import PreferencesForm from "./PreferencesForm";

export default function Nav({ onPreferencesUpdate }) {
  const { email } = useContext(AuthContext);
  const userID = email;
  console.log(userID);
  const avatarImage = profileIcon;

  return (
    <nav className="bg-accent absolute top-0 z-30 flex h-20 w-full items-center justify-center px-8 text-white">
      <NavLink to="/dashboard" end className="z-40">
        <img src={logo} alt="CatCall Logo" className="h-16" />
      </NavLink>
      <div className="absolute flex w-full items-center justify-between px-2 sm:top-4 sm:right-4 sm:w-fit sm:justify-end sm:gap-4 sm:px-0">
        <PreferencesForm onPreferencesUpdate={onPreferencesUpdate} />
        <NavLink to="/profile" end>
          <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full shadow-md outline-2 outline-white">
            <img
              src={avatarImage}
              alt="Avatar"
              className="color-white h-2/3 w-2/3 object-cover"
            />
          </div>
        </NavLink>
      </div>
    </nav>
  );
}

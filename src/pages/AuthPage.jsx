import heroImage from "../assets/heroImage.jpg";
import logo from "../assets/logo.svg";
import { NavLink } from "react-router-dom";
import AuthForm from "../components/AuthForm";

export default function AuthPage() {
  return (
    <div className="flex h-screen w-screen">
      {/* Left Side (Full-Height Image) */}
      <div className="h-full w-1/2">
        <img
          src={heroImage}
          alt="Sign In"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Right Side (Sign-In Form) */}
      <div className="flex h-full w-1/2 flex-col items-center justify-center bg-white">
        <NavLink to="/" end>
          <img src={logo} alt="CatCall Logo" className="mb-4 w-96" />
        </NavLink>
        <AuthForm />
      </div>
    </div>
  );
}

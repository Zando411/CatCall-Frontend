import heroImage from "../assets/heroImage.jpg";
import logo from "../assets/logo.svg";
import { NavLink } from "react-router-dom";
import SignUpForm from "../components/SignUpForm";
import SignInForm from "../components/SignInForm";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function AuthPage() {
  const [searchParams] = useSearchParams();
  const formType = searchParams.get("form") || "login";
  const [currentForm, setCurrentForm] = useState(formType);

  const toggle = () => {
    setCurrentForm((prevForm) => (prevForm === "login" ? "signup" : "login"));
  };

  return (
    <div className="flex h-screen w-screen">
      {/* Left Side (Full-Height Image) */}
      <div className="hidden h-full w-1/2 lg:block">
        <img
          src={heroImage}
          alt="Sign In"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Right Side (Sign-In Form) */}
      <div className="mx-auto mt-8 flex h-full flex-col items-center bg-white p-4 lg:mt-0 lg:w-1/2 lg:justify-center">
        <NavLink to="/" end>
          <img src={logo} alt="CatCall Logo" className="mb-4 w-96" />
        </NavLink>
        {currentForm === "signup" ? (
          <SignUpForm toggleFunc={toggle} />
        ) : (
          <SignInForm toggleFunc={toggle} />
        )}
      </div>
    </div>
  );
}

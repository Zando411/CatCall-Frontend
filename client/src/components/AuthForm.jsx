import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // for use with sign up later
  // const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post("http://localhost:3014/login", {
        email,
        password,
      });

      console.log(response.data.message);

      localStorage.setItem("CatCallLoggedInUser", response.data.email);

      setError("");
      navigate("/dashboard");
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message); // Display error from server
      } else {
        setError("An error occurred while logging in");
      }
    }
  };

  return (
    <>
      <div>
        <div className="text-center">
          <h1 className="text-2xl">Sign in to your account</h1>
          <h3 className="font-medium">
            Enter your email and password below to sign in
          </h3>
          <h4 className="text-sm font-medium text-gray-500">
            We'll never send you spam or share your email address.
          </h4>
        </div>
        <form
          className="mt-2 flex w-full flex-col gap-1"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col">
            <label htmlFor="email">Email:</label>
            <input
              className="focus:outline-accent rounded px-2 py-1 font-medium outline-1 outline-gray-400 placeholder:text-gray-400 focus:outline-2"
              type="email"
              id="email"
              placeholder="example@domain.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password">Password:</label>
            <input
              className="focus:outline-accent rounded px-2 py-1 font-medium outline-1 outline-gray-400 placeholder:text-gray-400 focus:outline-2"
              type="password"
              id="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            className="bg-accent mt-1 w-full rounded px-6 py-1 font-medium text-white"
            type="submit"
          >
            Sign In
          </button>
          <p className="text-red-600">{error}</p>
        </form>
      </div>
    </>
  );
}

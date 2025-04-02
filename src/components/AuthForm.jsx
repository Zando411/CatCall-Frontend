import { useState, useContext } from "react";
import { AuthContext } from "../utils/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AUTH_URL = import.meta.env.VITE_AUTH_URL;

export default function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // for use with sign up later
  // const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const userCheck = await axios.post(`${AUTH_URL}/api/checkUser`, {
        email,
      });
      console.log(userCheck.data.message);

      if (userCheck.data.message === "User exists") {
        const loginResponse = await axios.post(`${AUTH_URL}/api/login`, {
          email,
          password,
        });

        if (loginResponse.data.message !== "Login successful") {
          setError(loginResponse.data.message);
          return;
        }
      } else if (userCheck.data.message === "User does not exist") {
        const signUpResponse = await axios.post(`${AUTH_URL}/api/signup`, {
          email,
          password,
        });

        if (signUpResponse.data.message !== "User created successfully") {
          setError(signUpResponse.data.message);
          return;
        }
      }

      login(email);
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

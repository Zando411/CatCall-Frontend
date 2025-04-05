import { useState, useContext } from "react";
import { AuthContext } from "../utils/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AUTH_URL = import.meta.env.VITE_AUTH_URL;
const FAVORITES_SERVICE_URL = import.meta.env.VITE_FAVORITES_SERVICE_URL;

export default function AuthForm({ toggleFunc }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const normalizedEmail = email.trim().toLowerCase();
      const normalizedPassword = password.trim();
      const userCheck = await axios.post(`${AUTH_URL}/api/checkUser`, {
        email: normalizedEmail,
      });

      if (userCheck.data.message === "User exists") {
        setError(
          "We couldn't create an account with that email. Try logging in instead.",
        );
        return;
      } else if (userCheck.data.message === "User does not exist") {
        const signUpResponse = await axios.post(`${AUTH_URL}/api/signup`, {
          email: normalizedEmail,
          password: normalizedPassword,
        });

        if (signUpResponse.data.message !== "User created successfully") {
          setError(signUpResponse.data.message);
          return;
        }

        // create favorites for user
        await axios.post(`${FAVORITES_SERVICE_URL}/api/favorites/newUser`, {
          userID: normalizedEmail,
        });
      }

      login(normalizedEmail);
      setError("");
      navigate("/dashboard");
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message); // Display error from server
      } else {
        setError("An error occurred while signing up");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="w-full max-w-sm">
        <div className="text-center">
          <h1 className="text-2xl">Sign up for an account</h1>
          <h3 className="font-medium">
            Enter your email and password below to sign up
          </h3>
          <h4 className="text-sm font-medium text-gray-500">
            We&apos;ll never send you spam or share your email address.
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
            className={`bg-accent group mt-1 flex w-full cursor-pointer items-center justify-center rounded px-6 py-1 font-medium text-white disabled:cursor-not-allowed disabled:opacity-70`}
            disabled={loading}
            type="submit"
          >
            <span className="relative flex items-center gap-2">
              {loading ? (
                <svg
                  className="hidden size-5 text-white group-disabled:block group-disabled:animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : null}
              Sign Up
            </span>
          </button>
          <p className="text-sm font-medium text-gray-500">
            Already have an account?{" "}
            <span
              className="text-accent cursor-pointer underline"
              onClick={toggleFunc}
            >
              Sign In
            </span>
          </p>
          <p className="text-red-600">{error}</p>
        </form>
      </div>
    </>
  );
}

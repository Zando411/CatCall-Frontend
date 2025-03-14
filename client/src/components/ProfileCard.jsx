import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../utils/AuthContext";

import editIcon from "../assets/edit.svg";
import removeIcon from "../assets/trash.svg";

const CAT_DB_URL = import.meta.env.VITE_CAT_DB_URL;
const FAVORITES_SERVICE_URL = import.meta.env.VITE_FAVORITES_SERVICE_URL;

export default function ProfileCard({
  cat,
  removesFrom,
  fetchFunction,
  editable = false,
  onEdit,
}) {
  const { email } = useContext(AuthContext);
  const userID = email;

  const remove = async () => {
    try {
      if (removesFrom === "favorites") {
        await axios.delete(`${FAVORITES_SERVICE_URL}/api/favorites/`, {
          data: {
            userID: userID,
            favorite: cat._id,
          },
        });
        fetchFunction();
      }
      if (removesFrom === "cats") {
        await axios.delete(`${CAT_DB_URL}/api/cats/${cat._id}`);
        fetchFunction();
      }
    } catch (error) {
      console.error("Error removing cat:", error);
    }
  };

  const handleRemove = async () => {
    if (confirm("Are you sure you want to remove this cat?")) {
      remove();
    }
  };

  return (
    <>
      <div className="relative w-96 overflow-hidden rounded-lg bg-white text-black shadow-lg">
        {/* Cat Image */}
        <div className="relative">
          <div className="absolute right-0 bottom-0 z-20 flex gap-4 rounded bg-black/70 p-3 text-white">
            {editable && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="hover:stroke-accent cursor-pointer stroke-white transition-transform duration-200 hover:scale-110"
                onClick={() => onEdit(cat)}
              >
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
            )}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="stroke-mitten-white cursor-pointer transition-transform duration-200 hover:scale-110 hover:fill-red-500 hover:stroke-red-500"
              onClick={handleRemove}
            >
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <img
            src={`${CAT_DB_URL}/api/catImage/${cat.owner}/${cat._id}`}
            alt={cat.name}
            className="h-96 w-full object-cover object-top"
          />
        </div>
        <div className="flex flex-col gap-1 p-4 text-left">
          <h2 className="text-black-cat text-2xl font-bold">
            {cat.name}{" "}
            <span className="text-gray-600">
              {cat.age}
              {cat.sex.charAt(0)}
            </span>
          </h2>
          <p className="text-black-cat">
            {cat.city}, {cat.state}
          </p>
          <p className="text-black-cat">Breed: {cat.breed}</p>
          <p className="text-black-cat">Color: {cat.color}</p>
          <p className="text-black-cat">
            Contact:{" "}
            <a
              className="text-blue-500 hover:underline"
              href={`mailto:${cat.owner}`}
            >
              {cat.owner}
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

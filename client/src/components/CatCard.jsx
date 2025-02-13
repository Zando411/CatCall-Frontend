import React, { useEffect, useState } from "react";
import axios from "axios";
import thumbsUp from "../assets/thumbs-up.svg";
import thumbsDown from "../assets/thumbs-down.svg";

export default function CatCards() {
  const [cats, setCats] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch all cats from the backend
  useEffect(() => {
    axios
      .get("http://localhost:3014/cats")
      .then((response) => {
        setCats(response.data);
      })
      .catch((error) => {
        console.error("Error fetching cats:", error);
      });
  }, []);

  // Handle Like & Dislike actions (Moves to next cat)
  const handleAction = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const handleLikeAction = () => {
    // add likes later
    handleAction();
    console.log("Liked!");
  };

  const handleDislikeAction = () => {
    // add dislikes later
    handleAction();
    console.log("Disliked!");
  };

  return (
    <>
      {/* Card Stack */}
      {currentIndex < cats.length ? (
        <div className="relative w-96 overflow-hidden rounded-lg bg-white text-black shadow-lg">
          {/* Cat Image */}
          <div className="relative" onClick={() => console.log("View more...")}>
            <div className="absolute inset-0 cursor-pointer bg-gradient-to-t from-black/70 to-transparent" />
            <img
              src={`http://localhost:3014${cats[currentIndex].imageUrl}`}
              alt={cats[currentIndex].name}
              className="h-96 w-fit object-cover"
            />
            {/* <p className="absolute bottom-2 left-2 z-40 text-sm text-white">
              Tap to view more...
            </p> */}
          </div>
          <div className="flex flex-col gap-1 p-4 text-left">
            <h2 className="text-black-cat text-2xl font-bold">
              {cats[currentIndex].name}{" "}
              <span className="text-gray-600">
                {cats[currentIndex].age}
                {cats[currentIndex].sex.charAt(0)}
              </span>
            </h2>
            <p className="text-black-cat">
              {cats[currentIndex].city}, {cats[currentIndex].state}
            </p>
            <p className="text-black-cat">Breed: {cats[currentIndex].breed}</p>
          </div>
        </div>
      ) : (
        <p className="text-lg text-gray-300">No more cats available!</p>
      )}

      {/* Like & Dislike Buttons */}
      {currentIndex < cats.length && (
        <div className="mt-6 flex gap-8">
          <button
            onClick={handleDislikeAction}
            className="bg-mitten-white flex h-20 w-20 cursor-pointer items-center justify-center rounded-full shadow-lg transition-all hover:scale-105 hover:bg-red-500"
          >
            <img src={thumbsDown} alt="Dislike" className="mt-2 mr-1 w-12" />
          </button>
          <button
            onClick={handleLikeAction}
            className="bg-mitten-white flex h-20 w-20 cursor-pointer items-center justify-center rounded-full shadow-lg transition-all hover:scale-105 hover:bg-green-500"
          >
            <img src={thumbsUp} alt="Like" className="mb-1 ml-1 w-12" />
          </button>
        </div>
      )}
    </>
  );
}

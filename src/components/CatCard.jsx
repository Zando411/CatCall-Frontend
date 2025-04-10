import { useEffect, useState, useRef, useContext } from "react";
import { AuthContext } from "../utils/AuthContext";
import axios from "axios";
import thumbsUp from "../assets/thumbs-up.svg";
import thumbsDown from "../assets/thumbs-down.svg";

const RECOMMENDER_SERVICE_URL = import.meta.env.VITE_RECOMMENDER_SERVICE_URL;
const FAVORITES_SERVICE_URL = import.meta.env.VITE_FAVORITES_SERVICE_URL;
const CAT_DB_URL = import.meta.env.VITE_CAT_DB_URL;

export default function CatCards() {
  const [cats, setCats] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [noMoreCats, setNoMoreCats] = useState(false);

  const { email } = useContext(AuthContext);
  const userID = email;

  const fetchCats = async () => {
    if (!userID) {
      setError("User ID is missing");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(
        `${RECOMMENDER_SERVICE_URL}/api/recommend`,
        {
          params: { userID },
        },
      );

      if (response.data.recommendedCats.length === 0) {
        setNoMoreCats(true);
      } else {
        setCats(response.data.recommendedCats);
      }
    } catch (error) {
      console.error("Error fetching cats:", error);
      setError("Failed to load recommendations.");
    } finally {
      setLoading(false);
    }
  };

  // Get recommended cats on load
  useEffect(() => {
    fetchCats();
  }, []);

  // Handle Like & Dislike actions (Moves to next cat)
  const handleAction = (liked) => {
    if (cats[currentIndex]) {
      // send like to microservice
      if (liked) {
        axios.post(`${FAVORITES_SERVICE_URL}/api/favorites`, {
          userID,
          favorite: cats[currentIndex]._id,
        });
      }
    }

    // Move to next cat
    const nextIndex = currentIndex + 1;
    if (nextIndex < cats.length) {
      setCurrentIndex(nextIndex);
    } else {
      setNoMoreCats(true);
    }
  };

  return (
    <>
      {/* Loading & Error States */}
      {loading ? (
        <p className="text-lg text-gray-400">Loading cats...</p>
      ) : error ? (
        <p className="text-lg text-red-500">{error}</p>
      ) : noMoreCats ? (
        <>
          <p className="text-lg text-gray-300">No more cats available!</p>
          <p className="text-md text-gray-300">
            Try changing your preferences in the top right to see more cats
          </p>
        </>
      ) : (
        <div className="relative w-72 overflow-hidden rounded-lg bg-white text-black shadow-lg sm:w-96">
          {/* Cat Image */}
          <div className="relative w-full">
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <img
              src={`${CAT_DB_URL}/api/catImage/${cats[currentIndex].owner}/${cats[currentIndex]._id}`}
              alt={cats[currentIndex].name}
              className="h-56 w-full object-cover object-center sm:h-96"
              draggable="false"
            />
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
            <p className="text-black-cat">Color: {cats[currentIndex].color}</p>
            <p className="text-black-cat">
              Contact:{" "}
              <a
                className="text-blue-500 hover:underline"
                href={`mailto:${cats[currentIndex].owner}`}
              >
                {cats[currentIndex].owner}
              </a>
            </p>
          </div>
        </div>
      )}

      {/* Like & Dislike Buttons */}
      {!noMoreCats && (
        <div className="mt-4 flex gap-8 sm:mt-6">
          <button
            onClick={() => handleAction(false)}
            className="bg-mitten-white flex h-20 w-20 cursor-pointer items-center justify-center rounded-full shadow-lg transition-all hover:scale-105 hover:bg-red-500"
          >
            <img
              src={thumbsDown}
              alt="Dislike"
              className="mt-2 mr-1 w-12"
              draggable="false"
            />
          </button>
          <button
            onClick={() => handleAction(true)}
            className="bg-mitten-white flex h-20 w-20 cursor-pointer items-center justify-center rounded-full shadow-lg transition-all hover:scale-105 hover:bg-green-500"
          >
            <img
              src={thumbsUp}
              alt="Like"
              className="mb-1 ml-1 w-12"
              draggable="false"
            />
          </button>
        </div>
      )}
    </>
  );
}

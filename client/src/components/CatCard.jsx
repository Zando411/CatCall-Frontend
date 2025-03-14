import { useEffect, useState, useRef, useContext } from "react";
import { AuthContext } from "../utils/AuthContext";
import axios from "axios";
import thumbsUp from "../assets/thumbs-up.svg";
import thumbsDown from "../assets/thumbs-down.svg";

const RECOMMENDER_SERVICE_URL = import.meta.env.VITE_RECOMMENDER_SERVICE_URL;
const FAVORITES_SERVICE_URL = import.meta.env.VITE_FAVORITES_SERVICE_URL;
const CAT_DB_URL = import.meta.env.VITE_CAT_DB_URL;

export default function CatCards() {
  const hasFetched = useRef(false);
  const [cats, setCats] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [noMoreCats, setNoMoreCats] = useState(false);
  const LIMIT = 5;

  const { email } = useContext(AuthContext);
  const userID = email;

  const fetchCats = async (nextPage) => {
    if (!userID) {
      setError("User ID is missing");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(
        `${RECOMMENDER_SERVICE_URL}/api/recommend`,
        {
          params: { userID, page: nextPage, limit: LIMIT },
        },
      );

      if (response.data.recommendedCats.length === 0) {
        setNoMoreCats(true);
      } else {
        setCats((prevCats) => [...prevCats, ...response.data.recommendedCats]);
        setPage(nextPage);
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
    if (!hasFetched.current) {
      fetchCats(1);
      hasFetched.current = true;
    }
  }, []);

  // Handle Like & Dislike actions (Moves to next cat)
  const handleAction = (liked) => {
    if (cats[currentIndex]) {
      console.log(
        `${liked ? "Liked" : "Disliked"} cat: ${cats[currentIndex].name}`,
      );
      // send like to microservice
      if (liked) {
        axios.post(`${FAVORITES_SERVICE_URL}/api/favorites`, {
          userID,
          favorite: cats[currentIndex]._id,
        });
      }
    }

    if (currentIndex + 1 >= cats.length && !noMoreCats) {
      fetchCats(page + 1);
    }

    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  return (
    <>
      {/* Loading & Error States */}
      {loading ? (
        <p className="text-lg text-gray-400">Loading cats...</p>
      ) : error ? (
        <p className="text-lg text-red-500">{error}</p>
      ) : currentIndex < cats.length ? (
        <div className="relative w-96 overflow-hidden rounded-lg bg-white text-black shadow-lg">
          {/* Cat Image */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <img
              src={`${CAT_DB_URL}/api/catImage/${cats[currentIndex].owner}/${cats[currentIndex]._id}`}
              alt={cats[currentIndex].name}
              className="h-96 w-full object-cover object-center"
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
      ) : noMoreCats ? (
        <>
          <p className="text-lg text-gray-300">No more cats available!</p>
          <p className="text-md text-gray-300">
            Try changing your preferences in the top right to see more cats
          </p>
        </>
      ) : null}

      {/* Like & Dislike Buttons */}
      {currentIndex < cats.length && (
        <div className="mt-6 flex gap-8">
          <button
            onClick={() => handleAction(false)}
            className="bg-mitten-white flex h-20 w-20 cursor-pointer items-center justify-center rounded-full shadow-lg transition-all hover:scale-105 hover:bg-red-500"
          >
            <img src={thumbsDown} alt="Dislike" className="mt-2 mr-1 w-12" />
          </button>
          <button
            onClick={() => handleAction(true)}
            className="bg-mitten-white flex h-20 w-20 cursor-pointer items-center justify-center rounded-full shadow-lg transition-all hover:scale-105 hover:bg-green-500"
          >
            <img src={thumbsUp} alt="Like" className="mb-1 ml-1 w-12" />
          </button>
        </div>
      )}
    </>
  );
}

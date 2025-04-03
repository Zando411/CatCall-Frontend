import { useState, useEffect, useContext } from "react";
import axios from "axios";

import { AuthContext } from "../utils/AuthContext";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import CatForm from "../components/CatForm";
import ProfileCard from "../components/ProfileCard";
import EditCatForm from "../components/EditCatForm";
import ConfirmationModal from "../components/ConfirmationModal";

const FAVORITES_SERVICE_URL = import.meta.env.VITE_FAVORITES_SERVICE_URL;
const CAT_DB_URL = import.meta.env.VITE_CAT_DB_URL;

export default function Profile() {
  const [viewMyCats, setViewMyCats] = useState(true);
  const [catForm, setCatForm] = useState(false);
  const [likedCats, setLikedCats] = useState([]);
  const [myCats, setMyCats] = useState([]);
  const [editingCat, setEditingCat] = useState(null);
  const [editForm, setEditForm] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [catToRemove, setCatToRemove] = useState(null);
  const [removeFunction, setRemoveFunction] = useState(() => () => {});

  const navigate = useNavigate();
  const { logout, email } = useContext(AuthContext);
  const userID = email;

  const logoutHandler = () => {
    logout();
    navigate("/");
  };

  const fetchLikedCats = async () => {
    try {
      const favoritesResponse = await axios.get(
        `${FAVORITES_SERVICE_URL}/api/favorites/${userID}`,
      );
      const favorites = favoritesResponse.data.favorites;

      if (favorites.length === 0) {
        console.log("No favorites found");
        setLikedCats([]);
        return;
      }

      console.log("Favorites found:", favorites);

      const catResponses = await Promise.allSettled(
        favorites.map((favoriteId) =>
          axios.get(`${CAT_DB_URL}/api/cats/${favoriteId}`),
        ),
      );

      // filter out deleted cats
      const validCats = catResponses
        .filter((result) => result.status === "fulfilled")
        .map((result) => result.value.data);

      setLikedCats(validCats);
      console.log(validCats);
    } catch (error) {
      console.error("Error fetching cats:", error);
    } finally {
      console.log("Favorites loaded");
    }
  };

  const fetchMyCats = async () => {
    try {
      const catResponse = await axios.get(
        `${CAT_DB_URL}/api/cats/?owner=${userID}`,
      );
      setMyCats(catResponse.data);
      console.log(catResponse.data);
    } catch (error) {
      console.error("Error fetching cats:", error);
    } finally {
      console.log("My cats loaded");
    }
  };

  useEffect(() => {
    fetchMyCats();
    fetchLikedCats();
  }, []);

  // form functions
  const updateCat = (updatedCat) => {
    setMyCats((prevCats) =>
      prevCats.map((cat) => (cat._id === updatedCat._id ? updatedCat : cat)),
    );
  };

  const handleEdit = (cat) => {
    setEditingCat(cat);
    setEditForm(true);
  };

  const closeEditForm = () => {
    setEditForm(false);
    setEditingCat(null);
  };

  const handleFormClose = () => {
    setCatForm(false);
    fetchMyCats();
  };

  const flipView = () => {
    setViewMyCats(!viewMyCats);
  };

  const openConfirmationModal = (cat, removeFunc) => {
    setCatToRemove(cat);
    setRemoveFunction(() => removeFunc);
    setShowConfirmation(true);
  };

  const handleConfirmRemove = async () => {
    setShowConfirmation(false);
    if (removeFunction) {
      await removeFunction();
    }
  };

  const handleCancelRemove = () => {
    setShowConfirmation(false);
    setCatToRemove(null);
    setRemoveFunction(() => () => {});
  };

  return (
    <>
      <div className="bg-black-cat text-white">
        <Nav></Nav>
        <div className="relative mx-auto max-w-[1440px] px-8 text-center">
          <div className="flex min-h-screen flex-col items-center justify-start p-4 pt-24">
            {/* headers for my cats and saved cats */}
            <div className="mt-4 flex-wrap items-center justify-center lg:flex">
              <div className="flex flex-col flex-wrap items-center justify-center gap-4 text-4xl sm:text-5xl md:flex-row md:gap-12">
                <h1
                  className={`cursor-pointer transition-opacity duration-300 ${
                    viewMyCats ? "opacity-100" : "opacity-30"
                  }`}
                  onClick={viewMyCats ? undefined : flipView}
                >
                  My Cats
                </h1>
                <h1
                  className={`cursor-pointer transition-opacity duration-300 ${
                    viewMyCats ? "opacity-30" : "opacity-100"
                  }`}
                  onClick={!viewMyCats ? undefined : flipView}
                >
                  Liked Cats
                </h1>
              </div>
              <div className="mt-4 flex flex-col items-center gap-4 lg:mt-0 lg:flex-row lg:justify-center lg:gap-0">
                <div className="flex justify-center lg:absolute lg:right-16">
                  <Button
                    className={"primary"}
                    defaults={true}
                    onClick={() => setCatForm(true)}
                  >
                    <span className="">Upload Cat</span>{" "}
                    <span className="text-2xl">+</span>
                  </Button>
                </div>
                <div className="flex justify-center lg:absolute lg:left-16">
                  <Button
                    className={"bg-red-400"}
                    defaults={true}
                    onClick={() => logoutHandler()}
                  >
                    <span className="">Log Out</span>
                  </Button>
                </div>
              </div>
            </div>
            {/* cat form */}
            {<CatForm show={catForm} handleClose={() => handleFormClose()} />}

            {/* cat cards */}
            {!viewMyCats ? (
              likedCats.length > 0 ? (
                <div className="my-8 grid grid-cols-1 justify-items-center gap-4 md:my-16 md:grid-cols-2 xl:grid-cols-3">
                  {likedCats.map((likedCat, index) => (
                    <ProfileCard
                      key={index}
                      cat={likedCat}
                      removesFrom={"favorites"}
                      fetchFunction={fetchLikedCats}
                      editable={false}
                      openConfirmationModal={openConfirmationModal}
                    />
                  ))}
                </div>
              ) : (
                <div>
                  <p className="mt-16 text-lg text-gray-300">
                    No liked cats available!
                  </p>
                </div>
              )
            ) : myCats.length > 0 ? (
              <div className="my-8 grid grid-cols-1 justify-items-center gap-4 md:my-16 md:grid-cols-2 xl:grid-cols-3">
                {myCats.map((myCat, index) => (
                  <ProfileCard
                    key={index}
                    cat={myCat}
                    removesFrom={"cats"}
                    fetchFunction={fetchMyCats}
                    editable
                    onEdit={() => handleEdit(myCat)}
                    openConfirmationModal={openConfirmationModal}
                  />
                ))}
              </div>
            ) : (
              <div>
                <p className="mt-16 text-lg text-gray-300">
                  You have no uploaded cats!
                </p>
              </div>
            )}
            {editingCat && (
              <EditCatForm
                cat={editingCat}
                updateCat={updateCat}
                show={editForm}
                handleClose={closeEditForm}
              />
            )}
            <ConfirmationModal
              show={showConfirmation}
              message={`Are you sure you want to remove ${catToRemove?.name}?`}
              onConfirm={handleConfirmRemove}
              onCancel={handleCancelRemove}
            />
          </div>
        </div>
      </div>
    </>
  );
}

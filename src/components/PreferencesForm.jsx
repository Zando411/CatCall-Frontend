import { useState, useContext } from "react";
import { AuthContext } from "../utils/AuthContext";
import DropdownField from "./DropdownField";
import InputField from "./InputField";
import axios from "axios";
import settingsIcon from "../assets/settings.svg";

const PREFERENCES_DB_URL = import.meta.env.VITE_PREFERENCES_DB_URL;

export default function PreferencesForm({ onPreferencesUpdate }) {
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [pullPreferences, setPullPreferences] = useState(true);

  const { email } = useContext(AuthContext);
  const userID = email;

  const [preferences, setPreferences] = useState({
    minAge: "",
    maxAge: "",
    sex: "",
    breed: "",
    color: "",
    city: "",
    state: "",
    radius: "",
    strict: false,
  });

  const openForm = async () => {
    if (pullPreferences) {
      const pulledPreferences = await axios.get(
        `${PREFERENCES_DB_URL}/api/preferences/${userID}`,
      );
      setPreferences(pulledPreferences.data);
      console.log("Preferences pulled:", pulledPreferences.data);
      setPullPreferences(false);
    }
    setIsOpen(true);
  };

  const closeForm = () => {
    setIsOpen(false);
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setPreferences({ ...preferences, [name]: checked });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPreferences({ ...preferences, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (preferences.minAge < 0 || preferences.maxAge > 30) {
      setError("Please enter a valid age range (between 0 and 30)");
      return;
    }

    try {
      const response = await axios.put(
        `${PREFERENCES_DB_URL}/api/preferences/${userID}`,
        preferences,
      );

      if (response.data.message === "Preferences updated") {
        setPreferences({
          minAge: "",
          maxAge: "",
          sex: "",
          breed: "",
          color: "",
          city: "",
          state: "",
          radius: "",
          strict: false,
        });
        setError(null);
        setIsOpen(false);
        setPullPreferences(true);
        console.log("Success:", response.data.message);

        onPreferencesUpdate();
      }
    } catch (error) {
      console.error("Error:", error.response.data.error);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div>
      <span onClick={openForm} className="cursor-pointer">
        <img
          src={settingsIcon}
          alt="Settings"
          className="h-12 w-12 object-cover"
        />
      </span>

      {isOpen && (
        <div className="text-black-cat fixed inset-0 flex items-center justify-center bg-black/75 py-20">
          <div className="bg-mitten-white relative w-full max-w-md rounded-lg p-6 shadow-lg">
            <span
              className="hover:text-accent absolute top-4 right-4 float-right cursor-pointer text-2xl text-gray-600 transition-colors duration-200 hover:scale-110"
              onClick={closeForm}
            >
              &times;
            </span>
            <h2 className="mb-4 text-2xl">Update Preferences</h2>
            <form onSubmit={handleSubmit} noValidate className="relative">
              <>
                <div className="grid grid-cols-3 gap-4">
                  <InputField
                    label="Age Min."
                    id="formCatAgeMin"
                    type="number"
                    name="minAge"
                    value={preferences.minAge}
                    onChange={handleChange}
                    placeholder="2"
                  />

                  <InputField
                    label="Age Max."
                    id="formCatAgeMax"
                    type="number"
                    name="maxAge"
                    value={preferences.maxAge}
                    onChange={handleChange}
                    placeholder="8"
                  />
                  <DropdownField
                    label="Sex"
                    id="formCatSex"
                    name="sex"
                    value={preferences.sex}
                    onChange={handleChange}
                    options={[
                      { label: "Male", value: "Male" },
                      { label: "Female", value: "Female" },
                    ]}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <DropdownField
                    label="Breed"
                    id="formCatBreed"
                    name="breed"
                    value={preferences.breed}
                    onChange={handleChange}
                    options={[
                      { label: "Bengal", value: "Bengal" },
                      { label: "Longhair", value: "Longhair" },
                      { label: "Maine Coon", value: "Maine Coon" },
                      { label: "Persian", value: "Persian" },
                      { label: "Ragdoll", value: "Ragdoll" },
                      { label: "Russian Blue", value: "Russian Blue" },
                      { label: "Shorthair", value: "Shorthair" },
                      { label: "Siamese", value: "Siamese" },
                      { label: "Siberian", value: "Siberian" },
                      { label: "Sphynx", value: "Sphynx" },
                      { label: "Other", value: "Other" },
                    ]}
                  />

                  <DropdownField
                    label="Color"
                    id="formCatColor"
                    name="color"
                    value={preferences.color}
                    onChange={handleChange}
                    options={[
                      { label: "Black", value: "Black" },
                      { label: "White", value: "White" },
                      { label: "Gray", value: "Gray" },
                      { label: "Orange", value: "Orange" },
                      { label: "Calico", value: "Calico" },
                      { label: "Tabby", value: "Tabby" },
                      { label: "Other", value: "Other" },
                    ]}
                  />
                </div>
                {/* Location Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <InputField
                    label="City"
                    id="formCatCity"
                    name="city"
                    value={preferences.city}
                    onChange={handleChange}
                    placeholder="Corvallis"
                  />

                  <InputField
                    label="State"
                    id="formCatState"
                    name="state"
                    value={preferences.state}
                    onChange={handleChange}
                    placeholder="Oregon"
                  />
                </div>
                <InputField
                  label="Search Radius (in miles)"
                  id="formCatRadius"
                  type="number"
                  name="radius"
                  value={preferences.radius}
                  onChange={handleChange}
                  placeholder="50"
                />
                {error && <p className="mb-2 text-red-600">{error}</p>}
              </>

              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <label htmlFor="strict">Only Show Cats with All Traits</label>
                  <input
                    type="checkbox"
                    name="strict"
                    id="strict-checkbox"
                    className="h-4 w-4 cursor-pointer rounded-md border-gray-300"
                    checked={preferences.strict}
                    onChange={handleCheckboxChange}
                  />
                </div>

                <button
                  type="submit"
                  className="text-mitten-white bg-accent hover:bg-accent-dark float-right cursor-pointer rounded-md px-4 py-2 transition-all duration-200 hover:scale-105"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

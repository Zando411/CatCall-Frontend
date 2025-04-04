import { useState } from "react";
import DropdownField from "./DropdownField";
import InputField from "./InputField";
import axios from "axios";

const CAT_DB_URL = import.meta.env.VITE_CAT_DB_URL;

export default function EditCatForm({ cat, updateCat, show, handleClose }) {
  const [error, setError] = useState(null);

  const [catInfo, setCatInfo] = useState({
    name: cat.name,
    age: cat.age,
    sex: cat.sex,
    breed: cat.breed,
    color: cat.color,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCatInfo({ ...catInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !catInfo.name ||
      !catInfo.age ||
      !catInfo.sex ||
      !catInfo.breed ||
      !catInfo.color
    ) {
      setError("Please fill out all required fields before submitting.");
      return;
    }

    if (catInfo.age < 0 || catInfo.age > 30) {
      setError("Please enter a valid age (between 0 and 30)");
      return;
    }

    try {
      // axios call
      const response = await axios.put(
        `${CAT_DB_URL}/api/cats/${cat._id}`,
        catInfo,
      );

      if (response.data.message === "Cat updated") {
        updateCat({ ...cat, ...catInfo });
        setError(null);
        handleClose();
      }
    } catch (error) {
      console.error("Error:", error.response.data.error);
      setError("Something went wrong. Please try again.");
    }
  };

  if (!show) {
    return null;
  }

  return (
    <div className="text-black-cat fixed inset-0 z-50 flex items-center justify-center bg-black/75 py-20">
      <div className="bg-mitten-white relative w-full max-w-md rounded-lg p-6 shadow-lg">
        <span
          className="hover:text-accent absolute top-4 right-4 float-right cursor-pointer text-2xl text-gray-600 transition-colors duration-200 hover:scale-110"
          onClick={handleClose}
        >
          &times;
        </span>
        <h2 className="mb-4 text-2xl">Edit Cat</h2>
        <form onSubmit={handleSubmit} noValidate className="">
          <>
            <InputField
              label="Name"
              id="formCatName"
              name="name"
              value={catInfo.name}
              onChange={handleChange}
              placeholder="Mr. Whiskers"
            />

            <div className="grid grid-cols-2 gap-4">
              <InputField
                label="Age"
                id="formCatAge"
                type="number"
                name="age"
                value={catInfo.age}
                onChange={handleChange}
                placeholder="3"
              />

              <DropdownField
                label="Sex"
                id="formCatSex"
                name="sex"
                value={catInfo.sex}
                onChange={handleChange}
                options={[
                  { label: "Male", value: "Male" },
                  { label: "Female", value: "Female" },
                ]}
              />
            </div>

            <DropdownField
              label="Breed"
              id="formCatBreed"
              name="breed"
              value={catInfo.breed}
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
              value={catInfo.color}
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
          </>
          {error && <p className="mb-2 text-red-600">{error}</p>}

          <button
            type="submit"
            className="text-mitten-white bg-accent hover:bg-accent-dark float-right cursor-pointer rounded-md px-4 py-2 transition-all duration-200 hover:scale-105"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

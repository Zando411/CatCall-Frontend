import React, { useState } from "react";
import DropdownField from "./DropdownField";
import InputField from "./InputField";
import axios from "axios";

const CAT_DB_URL = import.meta.env.VITE_CAT_DB_URL;
const userID = localStorage.getItem("CatCallLoggedInUser");

export default function CatForm({ show, handleClose }) {
  const [step, setStep] = useState(1);
  const [error, setError] = useState(null);
  const [photoError, setPhotoError] = useState(null);

  const [catInfo, setCatInfo] = useState({
    name: "",
    age: null,
    sex: "",
    breed: "",
    color: "",
    city: "",
    state: "",
    image: null,
  });

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const closeForm = () => {
    setCatInfo({
      name: "",
      age: null,
      sex: "",
      breed: "",
      color: "",
      city: "",
      state: "",
      image: null,
    });
    setStep(1);
    setError(null);
    handleClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCatInfo({ ...catInfo, [name]: value });
  };

  const handleImageUpload = (e) => {
    setPhotoError(null);
    setCatInfo({ ...catInfo, image: null });
    const file = e.target.files[0];
    if (file) {
      if (!file.type.match("image.*")) {
        setPhotoError("Please upload an image file (jpg, jpeg, png).");
        return;
      }

      const maxSize = 2 * 1024 * 1024; // 2MB
      if (file.size > maxSize) {
        setPhotoError(
          "File size too large. Please upload an image smaller than 2MB.",
        );
        return;
      }

      setCatInfo({ ...catInfo, image: file });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (photoError !== null) {
      setError(photoError);
      return;
    }

    if (
      !catInfo.name ||
      !catInfo.age ||
      !catInfo.sex ||
      !catInfo.breed ||
      !catInfo.city ||
      !catInfo.state ||
      !catInfo.image
    ) {
      setError("Please fill out all required fields before submitting.");
      return;
    }

    if (catInfo.age < 0 || catInfo.age > 30) {
      setError("Please enter a valid age (between 0 and 30)");
      return;
    }

    // all form data fields need to be before image is parsed
    const formData = new FormData();
    formData.append("owner", userID.toString());
    Object.entries(catInfo).forEach(([key, value]) => {
      formData.append(key, value);
    });

    console.log([...formData.entries()]);

    try {
      const response = await axios.post(
        `${CAT_DB_URL}/api/uploadCat`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (response.data.message === "Cat uploaded") {
        console.log("Success:", response.data);
        closeForm();
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
    <div className="text-black-cat fixed inset-0 flex items-center justify-center bg-black/75 py-20">
      <div className="bg-mitten-white relative w-full max-w-md rounded-lg p-6 shadow-lg">
        <span
          className="hover:text-accent absolute top-4 right-4 float-right cursor-pointer text-2xl text-gray-600 transition-colors duration-200 hover:scale-110"
          onClick={handleClose}
        >
          &times;
        </span>
        <h2 className="mb-4 text-2xl">Upload your cat!</h2>
        <form onSubmit={handleSubmit} noValidate className="">
          {step === 1 && (
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
          )}

          {/* {step === 2 && (
            <>
              <DropdownField
                label="Color"
                id="formCatColor"
                name="color"
                value={catInfo.color}
                onChange={handleChange}
                options={[
                  { label: "Black", value: "black" },
                  { label: "White", value: "white" },
                  { label: "Gray", value: "gray" },
                  { label: "Orange", value: "orange" },
                  { label: "Calico", value: "calico" },
                  { label: "Tabby", value: "tabby" },
                  { label: "Other", value: "other" },
                ]}
              />
            </>
          )} */}

          {step === 2 && (
            <>
              {/* Image Upload Field */}
              <div className="mb-4">
                <div className="flex justify-between">
                  <label htmlFor="formCatImage" className="flex">
                    Upload Image
                  </label>
                  <div className="group relative">
                    <p className="cursor-pointer text-gray-600 hover:scale-105 hover:text-gray-800">
                      ?
                    </p>
                    <div className="absolute top-1/2 left-full w-max -translate-y-1/2 translate-x-2 transform rounded bg-gray-700 px-2 py-1 text-sm text-white opacity-0 shadow-lg group-hover:opacity-100">
                      File must be an image (jpg, jpeg, png) and less than 2MB.
                    </div>
                  </div>
                </div>
                <input
                  type="file"
                  id="formCatImage"
                  name="image"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="focus:outline-accent mt-1 w-full cursor-pointer rounded-md border border-gray-400 p-1 px-2 shadow-sm placeholder:text-sm"
                  required
                />
              </div>

              {/* Image Preview */}
              {catInfo.image && (
                <div className="mb-4">
                  <p className="flex">Preview:</p>
                  <img
                    src={URL.createObjectURL(catInfo.image)}
                    alt="Cat Preview"
                    className="mt-2 max-h-50 rounded-md border border-gray-300"
                  />
                </div>
              )}

              {/* Location Fields */}
              <InputField
                label="City"
                id="formCatCity"
                name="city"
                value={catInfo.city}
                onChange={handleChange}
                placeholder="Corvallis"
              />

              <InputField
                label="State"
                id="formCatState"
                name="state"
                value={catInfo.state}
                onChange={handleChange}
                placeholder="Oregon"
              />

              {/* <div className="mb-4">
                <label htmlFor="formCatDescription" className="flex">
                  Description
                </label>
                <textarea
                  id="formCatDescription"
                  name="description"
                  value={catInfo.description}
                  onChange={handleChange}
                  className="focus:outline-accent mt-1 w-full rounded-md border border-gray-400 p-1 px-2 shadow-sm placeholder:text-sm"
                  placeholder="This is a description of the cat..."
                  required
                />
              </div> */}
              {error && <p className="mb-2 text-red-600">{error}</p>}
            </>
          )}

          {/* buttons */}
          <div className="flex justify-between">
            {step > 1 && (
              <button
                type="button"
                onClick={handleBack}
                className="text-black-cat cursor-pointer rounded-md bg-gray-100 px-4 py-2 transition-all duration-200 hover:scale-105 hover:bg-gray-300"
              >
                Back
              </button>
            )}
            {step == 1 && (
              <button
                type="button"
                onClick={handleNext}
                className="bg-secondary hover:bg-primary ml-auto cursor-pointer rounded-md px-6 py-2 text-white transition-all duration-200 hover:scale-105 hover:shadow-2xl"
              >
                Next
              </button>
            )}
            {/* {step > 1 && step < 3 && (
              <button
                type="button"
                onClick={handleNext}
                className="rounded-md bg-blue-500 px-4 py-2 text-white"
              >
                Next
              </button>
            )} */}
            {step === 2 && (
              <button
                type="submit"
                className="text-mitten-white bg-accent hover:bg-accent-dark cursor-pointer rounded-md px-4 py-2 transition-all duration-200 hover:scale-105"
              >
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

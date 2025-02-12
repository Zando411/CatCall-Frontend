import React, { useState } from "react";
import DropdownField from "./DropdownField";
import InputField from "./InputField";
import axios from "axios";

export default function CatForm({ show, handleClose }) {
  const [step, setStep] = useState(1);
  const [error, setError] = useState(null);

  const [catInfo, setCatInfo] = useState({
    name: "",
    age: "",
    sex: "",
    breed: "",
    color: "",
    city: "",
    state: "",
    image: null,
    description: "",
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
      age: "",
      sex: "",
      breed: "",
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
    const file = e.target.files[0];
    if (file) {
      setCatInfo({ ...catInfo, image: file });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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

    console.log(catInfo);

    const formData = new FormData();
    Object.entries(catInfo).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      const response = await axios.post(
        "http://localhost:3014/cats",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (response.status === 201) {
        console.log("Success:", response.data);
        alert("Cat added successfully!");
        closeForm();
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Something went wrong. Please try again.");
    }
  };

  if (!show) {
    return null;
  }

  return (
    <div className="text-black-cat fixed inset-0 flex items-center justify-center bg-black/75 pb-20">
      <div className="bg-mitten-white relative w-full max-w-md rounded-lg p-6 shadow-lg">
        <span
          className="absolute top-4 right-4 float-right cursor-pointer text-2xl text-gray-600"
          onClick={closeForm}
        >
          &times;
        </span>
        <h2 className="mb-4 text-2xl">Cat Information</h2>
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
                  { label: "Male", value: "male" },
                  { label: "Female", value: "female" },
                ]}
              />

              <DropdownField
                label="Breed"
                id="formCatBreed"
                name="breed"
                value={catInfo.breed}
                onChange={handleChange}
                options={[
                  { label: "Bengal", value: "bengal" },
                  { label: "Longhair", value: "longhair" },
                  { label: "Maine Coon", value: "maine_coon" },
                  { label: "Persian", value: "persian" },
                  { label: "Ragdoll", value: "ragdoll" },
                  { label: "Russian Blue", value: "russian_blue" },
                  { label: "Shorthair", value: "shorthair" },
                  { label: "Siamese", value: "siamese" },
                  { label: "Siberian", value: "siberian" },
                  { label: "Sphynx", value: "sphynx" },
                  { label: "Other", value: "other" },
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
                <label htmlFor="formCatImage" className="block text-gray-700">
                  Upload Image
                </label>
                <input
                  type="file"
                  id="formCatImage"
                  name="image"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  required
                />
              </div>

              {/* Image Preview */}
              {catInfo.image && (
                <div className="mb-4">
                  <p className="text-gray-700">Preview:</p>
                  <img
                    src={URL.createObjectURL(catInfo.image)}
                    alt="Cat Preview"
                    className="mt-2 max-h-40 rounded-md border border-gray-300"
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
                className="text-black-cat cursor-pointer rounded-md bg-gray-100 px-4 py-2 transition-all duration-200 hover:bg-gray-300"
              >
                Back
              </button>
            )}
            {step == 1 && (
              <button
                type="button"
                onClick={handleNext}
                className="bg-secondary hover:bg-primary ml-auto cursor-pointer rounded-md px-6 py-2 text-white transition-all duration-200 hover:shadow-2xl"
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
                className="text-mitten-white bg-accent hover:bg-accent-dark cursor-pointer rounded-md px-4 py-2 transition-all duration-200"
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

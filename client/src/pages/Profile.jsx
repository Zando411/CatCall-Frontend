import logo from "../assets/logo.svg";
import Button from "../components/Button";
import { NavLink } from "react-router-dom";
import Nav from "../components/Nav";
import { useState } from "react";
import CatForm from "../components/CatForm";

export default function Profile() {
  const [viewMyCats, setViewMyCats] = useState(true);
  const [catForm, setCatForm] = useState(false);

  const flipView = () => {
    setViewMyCats(!viewMyCats);
  };

  return (
    <>
      <div className="bg-black-cat text-white">
        <Nav></Nav>
        <div className="relative mx-auto max-w-[1440px] px-8 text-center">
          <body className="flex min-h-screen min-w-[320px] flex-col items-center justify-start p-4 pt-24">
            {/* headers for my cats and saved cats */}
            <div className="mt-4 flex items-center justify-center gap-12 text-5xl">
              <h1
                className={`hidden cursor-pointer transition-opacity duration-300 ${
                  viewMyCats ? "opacity-100" : "opacity-30"
                }`}
                onClick={viewMyCats ? undefined : flipView}
              >
                My Cats
              </h1>
              <h1
                className={`cursor-pointer transition-opacity duration-300 ${
                  viewMyCats ? "opacity-0" : "opacity-100"
                }`}
                onClick={!viewMyCats ? undefined : flipView}
              >
                Saved Cats
              </h1>
              <div className="absolute right-16 flex">
                <Button
                  className={"primary"}
                  defaults={true}
                  onClick={() => setCatForm(true)}
                >
                  Upload Cat <span className="text-2xl">+</span>
                </Button>
              </div>
            </div>
            {/* cat form */}
            {<CatForm show={catForm} handleClose={() => setCatForm(false)} />}
          </body>
        </div>
      </div>
    </>
  );
}

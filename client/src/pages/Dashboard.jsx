import { NavLink } from "react-router-dom";
import { useState } from "react";

import logo from "../assets/logo.svg";
import Button from "../components/Button";
import Nav from "../components/Nav";
import CatCard from "../components/CatCard.jsx";

export default function Dashboard() {
  const [refreshKey, setRefreshKey] = useState(0);

  const triggerRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <>
      <div className="bg-black-cat text-white">
        <Nav onPreferencesUpdate={triggerRefresh} />
        <div className="mx-auto max-w-[1440px] px-8 text-center">
          <div className="flex min-h-screen min-w-[320px] flex-col items-center justify-center p-4 pt-24">
            <CatCard key={refreshKey} />
          </div>
        </div>
      </div>
    </>
  );
}

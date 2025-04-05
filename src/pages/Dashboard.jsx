import { useState } from "react";

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
        <div className="mx-auto max-w-[1440px] text-center md:px-8">
          <div className="flex min-h-screen flex-col items-center justify-start p-4 pt-24 sm:justify-center">
            <CatCard key={refreshKey} />
          </div>
        </div>
      </div>
    </>
  );
}

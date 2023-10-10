import React, { useEffect, useState } from "react";
import Filters from "./Filters";
import CatalogSearch from "./CatalogSearch";

const Sidebar = () => {

  return (
    <aside
      id="sidebar-multi-level-sidebar"
      className="fixed top-0 left-0 z-40 w-[360px] h-screen transition-transform -translate-x-full sm:translate-x-0"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-4 overflow-y-auto  bg-neutral-50 dark:bg-gray-800">
        <div className="flex pt-8 pl-4">
          <Filters />
        </div>
        <hr className="border-t-2 border-gray-300 my-6" />
        <div>
          <CatalogSearch />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

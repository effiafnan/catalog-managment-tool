import React, { useState } from "react";
import DataTable from "../DataTable";
import { StatusFilters } from "../Dashboard/Filters";

const index = () => {
  const [filterValue, setFilterValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };
  return (
    <div className="flex flex-col py-16 px-8">
      <div>
        {/* <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearch}
        /> */}
        <StatusFilters setFilterValue={setFilterValue} />
      </div>
      <div>
        <DataTable filterValue={filterValue} searchQuery={searchQuery} />
      </div>
    </div>
  );
};

export default index;

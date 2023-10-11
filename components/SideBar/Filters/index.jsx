import { Autocomplete, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React, { useContext, useEffect, useState } from "react";
import GlobalContext from "../../../context/GlobalContext";

const Filters = () => {
  const {
    globalCsvState,
    countryFilter,
    superCategoryFilter,
    setCategoryFilter,
    categoryFilter,
    setCountryFilter,
    setSuperCategoryFilter,
  } = useContext(GlobalContext);

  const countries = globalCsvState ? Object?.keys(globalCsvState) : [];
  const superCategories = countryFilter
    ? Object?.keys(globalCsvState[countryFilter])
    : [];
  const categories =
    countryFilter && superCategoryFilter
      ? Object?.keys(globalCsvState[countryFilter][superCategoryFilter])
      : [];

  return (
    <div className="flex flex-col">
      <div className="Filters text-neutral-800 text-lg font-bold font-['Open Sans'] leading-tight mb-4">
        Filters
      </div>
      <div className="flex flex-col gap-4 ">
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={countries}
          value={countryFilter}
          onChange={(_, value) => {
            setCountryFilter(value);
            setSuperCategoryFilter("");
            setCategoryFilter("");
          }}
          sx={{ width: "auto" }}
          renderInput={(params) => <TextField {...params} label="Country" />}
        />
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={superCategories}
          sx={{ width: 300 }}
          disabled={!countryFilter}
          value={superCategoryFilter}
          onChange={(_, value) => {
            setSuperCategoryFilter(value);
            setCategoryFilter("");
          }}
          renderInput={(params) => (
            <TextField {...params} label="Super Catergory" />
          )}
        />
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={categories}
          disabled={!countryFilter || !superCategoryFilter}
          value={categoryFilter}
          onChange={(_, value) => {
            setCategoryFilter(value);
          }}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Catergory" />}
        />
        <button
          variant="outlined"
          className="flex justify-between align-middle bg-transparent border rounded  border-solid border-gray-400 text-gray-700 hover:bg-gray-100 px-4 py-3 transition duration-150 text-base"
        >
          Add a Product
          <AddIcon fontSize="small" />
        </button>
      </div>
    </div>
  );
};

export default Filters;

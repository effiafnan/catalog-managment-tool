import { Autocomplete, InputAdornment, TextField } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import DynamicList from "./Accordion";
import GlobalContext from "../../../context/GlobalContext";

const CatalogSearch = () => {
  
  const { globalCsvState } = useContext(GlobalContext);
  const [csvData, setCsvData] = useState({});
  const countries = globalCsvState ? Object.keys(globalCsvState) : [];
  const [filterValue, setFilterValue] = useState("");

  useEffect(() => {
    setCsvData(globalCsvState);
  }, [filterValue, globalCsvState]);

  return (
    <div className="flex flex-col gap-4 pb-8 px-4">
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={countries}
        sx={{ width: "auto" }}
        onChange={(_, value) => {
          console.log("value", value);
          setFilterValue(value);
        }}
        renderInput={(params) => <TextField {...params} label="Search" />}
      />
      <DynamicList CatalogSearch data={csvData} />
    </div>
  );
};

export default CatalogSearch;

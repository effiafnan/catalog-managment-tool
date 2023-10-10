import React, { createContext, useContext, useState } from "react";

// Create the context
const GlobalContext = createContext();

// Create a custom hook to access the context
export function useGlobalContext() {
  return useContext(GlobalContext);
}

// Create the context provider component
export function GlobalContextProvider({ children }) {
  const [globalCsvState, setGlobalCsvState] = useState({});
  const [globalCsvTableData, setGlobalCsvTableData] = useState([]);
  const [countryFilter, setCountryFilter] = useState("");
  const [superCategoryFilter, setSuperCategoryFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const initialState = {};

  return (
    <GlobalContext.Provider
      value={{
        globalCsvState,
        setGlobalCsvState,
        globalCsvTableData,
        setGlobalCsvTableData,
        countryFilter,
        categoryFilter,
        superCategoryFilter,
        setCategoryFilter,
        setCountryFilter,
        setSuperCategoryFilter
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export default GlobalContext;

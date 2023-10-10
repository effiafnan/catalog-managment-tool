import { useEffect, useState } from "react";
import SuperCategoriesList from "./SuperCategoriesList";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

function CountriesList({data}) {

  const countries = data ? Object?.keys(data) : [];


  return (
    <>
      <ul className="space-y-2 font-medium">
        {countries?.map((country,index) => {
          const [isSelected, setIsSelected] = useState(false);

          return (
            <div key={index}>
              <li>
                <button
                  type="button"
                  className={`flex space-between items-center w-full p-2 text-base transition duration-75 ${isSelected ? "text-gray-900 font-bold" : "text-gray-700"}  rounded-lg group hover:bg-gray-100`}
                  aria-controls="dropdown-example"
                  data-collapse-toggle="dropdown-example"
                  onClick={() => {
                    console.log("selected", country, data[country])
                    setIsSelected(!isSelected)}}
                >
                  {isSelected ? (
                    <KeyboardArrowUpIcon />
                  ) : (
                    <KeyboardArrowDownIcon />
                  )}
                  <span
                    className={`flex-1 ml-3 text-left whitespace-nowrap`}
                  >
                    {country}
                  </span>
                </button>
              </li>
              {isSelected && (
                <SuperCategoriesList
                  superCategories={data[country]}
                  country = {country}
                />
              )}
            </div>
          );
        })}
      </ul>
    </>
  );
}

export default CountriesList;
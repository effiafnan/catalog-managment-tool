import React, { useState } from "react";
import CategoriesList from "./CategoriesList";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { IconButton, Menu, MenuItem } from "@mui/material";
import AddSuperCategory from "../../../Modals/AddSuperCategory";
import SuperCategoriesItem from "./SuperCategoriesItem";

const SuperCategoriesList = ({ superCategories: data, country }) => {
  const superCategories = data ? Object?.keys(data) : [];

  return (
    <ul
      id="dropdown-example"
      className={`contents py-2 space-y-2 absolute bg-white dark:bg-gray-800`}
    >
      {superCategories.map((category, index) => (
        <SuperCategoriesItem
          category={category}
          key={index}
          data={data}
          country={country}
        />
      ))}
    </ul>
  );
};

export default SuperCategoriesList;

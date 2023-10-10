import React, { useState } from "react";
import CategoriesList from "./CategoriesList";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { IconButton, Menu, MenuItem } from "@mui/material";

const SuperCategoriesItem = ({category, setOpen, data, country}) => {
  const [isSelected, setIsSelected] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <li>
        <button
          type="button"
          className={`flex space-between items-center w-full p-2 pl-8 text-base transition duration-75 ${
            isSelected ? "text-gray-900 font-bold" : "text-gray-700"
          }  rounded-lg group hover:bg-gray-100`}
          aria-controls="dropdown-example"
          data-collapse-toggle="dropdown-example"
          onClick={() => setIsSelected(!isSelected)}
        >
          {isSelected ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          <span className="flex-1 ml-3 text-left whitespace-nowrap">
            {category}
          </span>
          <IconButton onClick={handleClick}>
            <MoreHorizIcon />
          </IconButton>
        </button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={() => setOpen(true)}>Add New</MenuItem>
          <MenuItem>Delete</MenuItem>
          <MenuItem>Duplicate</MenuItem>
        </Menu>
      </li>
      {isSelected && (
        <CategoriesList
          categories={data[category]}
          country={country}
          superCatergoy={category}
        />
      )}
    </div>
  );
};

export default SuperCategoriesItem;

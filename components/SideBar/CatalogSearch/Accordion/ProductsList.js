import React, { useState } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { IconButton, Menu, MenuItem } from "@mui/material";

const ProductsList = ({ products = [] }) => {
  return (
    <ul
      id="dropdown-example"
      className={`contents py-2 space-y-2 absolute bg-white dark:bg-gray-800`}
    >
      {products.map((product, index) => {
        const [anchorEl, setAnchorEl] = useState(null);

        const handleClick = (event) => {
          setAnchorEl(event.currentTarget);
        };

        const handleClose = () => {
          setAnchorEl(null);
        };
        return (
          <li key={index}>
            <button
              type="button"
              className="flex space-between items-center w-full p-2 pl-24 text-base text-gray-700 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              aria-controls="dropdown-example"
              data-collapse-toggle="dropdown-example"
            >
              <span className="flex-1 ml-3 text-left whitespace-nowrap">
                {product}
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
              <MenuItem>Add New</MenuItem>
              <MenuItem>Delete</MenuItem>
              <MenuItem>Duplicate</MenuItem>
            </Menu>
          </li>
        );
      })}
    </ul>
  );
};

export default ProductsList;

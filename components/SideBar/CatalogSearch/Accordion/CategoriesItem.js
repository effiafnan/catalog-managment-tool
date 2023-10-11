import React, { useState } from "react";
import ProductsList from "./ProductsList";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { IconButton, Menu, MenuItem } from "@mui/material";
import AddProduct from "../../../Modals/AddProduct";

const Categoriestem = ({ data, category, country, superCatergoy }) => {
  const [isSelected, setIsSelected] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);

  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <AddProduct
        open={open}
        setOpen={setOpen}
        country={country}
        superCategory={superCatergoy}
        category={category}
      />
      <div>
        <li>
          <button
            title={category}
            type="button"
            className={`flex space-between items-center w-full pl-12 text-base transition duration-75 ${
              isSelected ? "text-gray-900 font-bold" : "text-gray-700"
            }  rounded-lg group hover:bg-gray-100`}
            aria-controls="dropdown-example"
            data-collapse-toggle="dropdown-example"
            onClick={() => setIsSelected(!isSelected)}
          >
            {isSelected ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            <span className="flex-1 ml-3 text-left whitespace-nowrap">
              {category?.length > 18
                ? category?.slice(0, 15) + "..."
                : category}
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
        {isSelected && <ProductsList products={data} />}
      </div>
    </>
  );
};

export default Categoriestem;

import React, { useState } from "react";
import AddCategory from "../../../Modals/AddNewCategory";
import Categoriestem from "./CategoriesItem";

const CategoriesList = ({ categories: data, country, superCatergoy }) => {

  const categories = data ? Object?.keys(data) : [];
  return (
    <ul
      id="dropdown-example"
      className={`contents py-2 space-y-2 absolute bg-white dark:bg-gray-800`}
    >
      {categories?.map((category, index) => (
        <Categoriestem
          category={category}
          key={index}
          data={data[category]}
          country={country}
          superCatergoy={superCatergoy}
        />
      ))}
    </ul>
  );
};

export default CategoriesList;

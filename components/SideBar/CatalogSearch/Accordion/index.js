import { useState } from "react";
import SuperCategoriesList from "./SuperCategoriesList";
import CountriesList from "./CountriesList";

function Accordion({data}) {
  return (
    <div className="flex">
      <div className="w-full">
        <CountriesList data={data}/>
      </div>
    </div>
  );
}

export default Accordion;

import { Button, ButtonGroup } from "@mui/material";

export function StatusFilters({ setFilterValue }) {
  const handleClick = (value) => {
    setFilterValue(value);
  };
  return (
    <ButtonGroup
      variant="text" // Remove button borders
      aria-label="outlined button group"
      className="flex flex-wrap space-x-1.5 p-1 my-8 border-black font-bold"
    >
      <Button
        className="text-black text-md py-1.5 px-8 whitespace-nowrap font-bold"
        onClick={() => {
          handleClick("");
        }}
      >
        All
      </Button>

      <Button
        className="text-black text-md py-1.5 px-8 whitespace-nowrap font-bold border-r-2 border-black"
        onClick={() => {
          handleClick("USD");
        }}
      >
        USD
      </Button>
      <Button
        className="text-black text-md py-1.5 px-8 whitespace-nowrap font-bold border-r-2 border-black"
        onClick={() => {
          handleClick("EUR");
        }}
      >
        EUR
      </Button>
      <Button
        className="text-black text-md py-1.5 px-8 whitespace-nowrap font-bold border-r-2 border-black"
        onClick={() => {
          handleClick("GBP");
        }}
      >
        GBP
      </Button>
      {/* <Button
        className="text-black text-md py-1.5 px-8 whitespace-nowrap font-bold border-r-2 border-black"
        onClick={() => {
          handleClick("missingAttributes");
        }}
      >
        Missing Attributes
      </Button> */}
      <Button
        className="text-black text-md py-1.5 px-8 whitespace-nowrap font-bold"
        onClick={() => {
          handleClick("missingMenu");
        }}
      >
        Missing Menu Filters
      </Button>
    </ButtonGroup>
  );
}

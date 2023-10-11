import CountriesItem from "./CountriesItem";

function CountriesList({ data }) {
  const countries = data ? Object?.keys(data) : [];

  return (
    <>
      <ul className="space-y-2 font-medium">
        {countries?.map((country, index) => {
          return <CountriesItem country={country} data={data} key={index} />;
        })}
      </ul>
    </>
  );
}

export default CountriesList;

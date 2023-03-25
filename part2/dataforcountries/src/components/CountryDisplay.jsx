import CountryList from "./CountryList";
import Country from "./Country";

const CountryDisplay = ({ countries, filter }) => {
  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(filter.toLowerCase())
  );

  const listLength = filteredCountries.length;

  if (listLength > 10)
    return <div>Too many countries, specify another filter</div>;

  if (listLength === 0) return <div>No country found</div>;

  if (listLength === 1) return <Country country={filteredCountries[0]} />;

  return <CountryList countries={filteredCountries} />;
};

export default CountryDisplay;

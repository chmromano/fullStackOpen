import { useState } from "react";

import CountryList from "./CountryList";
import Country from "./Country";

const CountryDisplay = ({ countries, filter }) => {
  const [country, setCountry] = useState({ name: "" });

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(filter.toLowerCase()),
  );

  const listLength = filteredCountries.length;

  if (filter === "") {
    if (country.name !== "") {
      setCountry({ name: "" });
    }

    return (
      <>
        <div>Search for a country</div>
      </>
    );
  }

  if (listLength > 10) {
    return (
      <>
        <div>Too many countries, narrow your search</div>
        <Country country={country} />
      </>
    );
  }

  if (listLength === 0) {
    return (
      <>
        <div>No countries found</div>
        <Country country={country} />
      </>
    );
  }

  if (listLength === 1 && filteredCountries[0].name !== country.name)
    setCountry(filteredCountries[0]);

  if (listLength === 1) {
    return <Country country={country} />;
  }

  return (
    <>
      <CountryList countries={filteredCountries} setCountry={setCountry} />
      <Country country={country} />
    </>
  );
};

export default CountryDisplay;

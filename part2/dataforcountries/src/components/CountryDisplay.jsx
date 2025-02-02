import React from "react";

import { useState } from "react";

import CountryList from "./CountryList";
import Country from "./Country";

const CountryDisplay = ({ countries, filter }) => {
  const [country, setCountry] = useState({ name: "" });

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(filter.toLowerCase())
  );

  const listLength = filteredCountries.length;

  if (listLength <= 10 && listLength !== 0) {
    if (listLength === 1 && filteredCountries[0].name !== country.name)
      setCountry(filteredCountries[0]);

    return (
      <>
        <CountryList countries={filteredCountries} setCountry={setCountry} />
        <Country country={country} />
      </>
    );
  }

  if (country.name !== "") setCountry({ name: "" });

  return (
    <>
      <div>
        {filter === ""
          ? "Search for a country"
          : listLength > 10
          ? "Too many countries, narrow your search"
          : listLength === 0
          ? "No countries found"
          : ""}
      </div>
    </>
  );
};

export default CountryDisplay;

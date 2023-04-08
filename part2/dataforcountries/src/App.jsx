import React, { useEffect, useState } from "react";

import countryService from "./services/countries";

import FilterField from "./components/FilterField";
import CountryDisplay from "./components/CountryDisplay";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    console.log("Array effect");
    countryService
      .getAllCountries()
      .then((response) =>
        response.map((country) => {
          return {
            name: country.name.common,
            capital: country.capital,
            area: country.area,
            languages: country.languages,
            flag: country.flags.svg,
          };
        })
      )
      .then((countryArray) => {
        setCountries(countryArray);
        console.log(countryArray);
      })
      .catch((error) => console.log("Effect error: ", error));
  }, []);

  return (
    <>
      <FilterField filter={filter} setFilter={setFilter} />
      <CountryDisplay countries={countries} filter={filter} />
    </>
  );
};

export default App;

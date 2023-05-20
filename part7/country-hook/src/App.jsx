import React, { useState, useEffect } from "react";
import axios from "axios";

const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

const useCountry = (name) => {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    const fetchCountry = async () => {
      if (name === "") {
        setCountry(null);
        return;
      }

      try {
        const url = `https://restcountries.com/v3.1/name/${name}?fullText=true&fields=name,capital,flags,population`;
        const response = await axios.get(url);

        const object = {
          found: response.status === 200,
          data: {
            name: response.data[0].name.common,
            capital: response.data[0].capital[0],
            population: response.data[0].population,
            flag: response.data[0].flags.svg,
          },
        };

        setCountry(object);
      } catch (error) {
        setCountry({ found: false });
      }
    };

    fetchCountry();
  }, [name]);

  return country;
};

const Country = ({ country }) => {
  if (!country) {
    return null;
  }

  if (!country.found) {
    return <>not found...</>;
  }

  return (
    <>
      <h3>{country.data.name} </h3>
      <div>capital {country.data.capital} </div>
      <div>population {country.data.population}</div>
      <img
        src={country.data.flag}
        height="100"
        alt={`flag of ${country.data.name}`}
      />
    </>
  );
};

const App = () => {
  const nameInput = useField("text");
  const [name, setName] = useState("");
  const country = useCountry(name);

  const fetch = (event) => {
    event.preventDefault();
    setName(nameInput.value);
  };

  return (
    <>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </>
  );
};

export default App;

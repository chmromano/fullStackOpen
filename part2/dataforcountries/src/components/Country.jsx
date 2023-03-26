import Weather from "./Weather";

const Capital = ({ capital }) => {
  if (capital.length === 1) return <div>Capital: {capital[0]}</div>;

  // Handle countries with more than 1 capital
  return (
    <>
      <div>capitals:</div>
      <ul>
        {capital.map((capital) => (
          <li key={capital}>{capital}</li>
        ))}
      </ul>
    </>
  );
};

const Country = ({ country }) => {
  if (country.name === "") return null;

  // Converting the country's languages object values into an array
  const languages = Object.values(country.languages);

  return (
    <>
      <h1>{country.name}</h1>
      <Capital capital={country.capital} />
      <div>Area: {country.area}</div>
      <h2>Languages</h2>
      <ul>
        {languages.map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={country.flag} alt={`Flag of ${country.name}`} height="150" />
      {country.capital.map((capital) => (
        <Weather key={capital} city={capital} />
      ))}
    </>
  );
};

export default Country;

const CountryListItem = ({ country, setCountry }) => {
  return (
    <div>
      {country.name}
      <button onClick={() => setCountry(country)}>show</button>
    </div>
  );
};

const CountryList = ({ countries, setCountry }) => {
  if (countries.length === 1) return null;

  return (
    <>
      {countries.map((country) => (
        <CountryListItem
          key={country.name}
          country={country}
          setCountry={setCountry}
        />
      ))}
    </>
  );
};

export default CountryList;

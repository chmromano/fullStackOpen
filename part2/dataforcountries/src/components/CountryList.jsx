const CountryListItem = ({ country }) => {
  return <div>{country.name}</div>;
};

const CountryList = ({ countries }) => {
  return (
    <>
      {countries.map((country) => (
        <CountryListItem key={country.name} country={country} />
      ))}
    </>
  );
};

export default CountryList;

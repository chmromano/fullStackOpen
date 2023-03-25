import axios from "axios";

// Requesting only the necessary fields
const url =
  "https://restcountries.com/v3.1/all?fields=name,capital,flags,languages,area";

const getAllCountries = () => {
  const request = axios.get(url);
  return request.then((response) => response.data);
};

const countryService = {
  getAllCountries,
};

export default countryService;

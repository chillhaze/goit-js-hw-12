const BASE_URL = 'https://restcountries.eu/rest/v2';

function fetchCountries(name) {
  const url = `${BASE_URL}/name/${name}?fields=name;capital;population;flag;languages`;

  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

export default { fetchCountries };

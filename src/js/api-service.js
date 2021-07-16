const BASE_URL = 'https://restcountries.eu/rest/v2';

function fetchCountries(name) {
  // const url = `${BASE_URL}/all?fields=${name};capital;population;flag;languages`;

  const url = `${BASE_URL}/name/${name}`;

  return fetch(url).then(response => {
    return response.json();
  });
}

export default { fetchCountries };

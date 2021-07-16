import API from './api-service';
import countryCard from '../partials/country-card.hbs';
import countryList from '../partials/country-list.hbs';

const refs = {
  searchForm: document.getElementById('search-box'),
  countryInfo: document.querySelector('.country-info'),
  countriesList: document.querySelector('ul.country-list'),
};

refs.searchForm.addEventListener('input', onSearch);

function onSearch(e) {
  let inputValue = refs.searchForm.value;
  console.log(inputValue);

  API.fetchCountries(inputValue)
    .then(countries => {
      // console.log(countries);
      if (countries.length === 1) {
        return renderCountryCard(countries[0]);
      } else {
        return renderCountryList(countries);
      }
    })
    .catch(onFetchError);
}

function renderCountryCard(country) {
  const markup = countryCard(country);
  // console.log(markup);
  refs.countryInfo.insertAdjacentHTML('beforeend', markup);
}

function renderCountryList(countries) {
  const markup = countryList(countries);
  console.log(markup);

  refs.countriesList.insertAdjacentHTML('beforeend', { ...markup });
}

function onFetchError(error) {
  alert('что-то пошло не так');
}

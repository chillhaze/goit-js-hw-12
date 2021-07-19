import API from './api-service';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import countryCardTpl from '../partials/country-card.hbs';
import countryListTpl from '../partials/country-list.hbs';

const DEBOUNCE_DELAY = 300;

const refs = {
  searchForm: document.getElementById('search-box'),
  countryCard: document.querySelector('.country-info'),
  countriesList: document.querySelector('ul.country-list'),
};

refs.searchForm.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch() {
  let inputValue = refs.searchForm.value;
  if (inputValue !== '') {
    API.fetchCountries(inputValue)
      .then(countriesArr => {
        if (countriesArr.length >= 2 && countriesArr.length <= 10) {
          return renderCountryList(countriesArr);
        } else if (countriesArr.length === 1) {
          return renderCountryCard(countriesArr[0]);
        } else if (countriesArr.length > 10) {
          Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
        }
      })
      .catch(onFetchError);
  }
  clearPage();
}

function renderCountryCard(country) {
  const markup = countryCardTpl(country);

  refs.countryCard.insertAdjacentHTML('beforeend', markup);
}

function renderCountryList(countries) {
  const markup = countryListTpl(countries);

  refs.countriesList.insertAdjacentHTML('beforeend', markup);
}

function onFetchError(error) {
  // alert('что-то пошло не так');
  clearPage();
  refs.searchForm.value = '';
  Notiflix.Notify.failure('Oops, there is no country with that name');
  console.log(error);
}

function clearPage() {
  refs.countryCard.innerHTML = '';
  refs.countriesList.innerHTML = '';
}

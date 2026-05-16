import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import getImagesByQuery from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions';

const formEl = document.querySelector('.form');
const input = document.querySelector('input');

formEl.addEventListener('submit', formHandler);

function formHandler(event) {
  event.preventDefault();

  const searchText = input.value.trim();

  if (!searchText) {
    iziToast.warning({
      message: 'Please, enter a search query',
    });

    return;
  }

  input.value = '';

  showLoader();
  clearGallery();

  getImagesByQuery(searchText)
    .then(data => {
      if (data.hits.length === 0) {
        iziToast.warning({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
        });
        return;
      }

      createGallery(data.hits);
    })
    .catch(error => {
      iziToast.error({
        message: 'Something went wrong. Please try again later.',
      });
    })
    .finally(() => {
      hideLoader();
    });
}

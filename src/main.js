import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import getImagesByQuery from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
  refreshGallery,
} from './js/render-functions';

const formEl = document.querySelector('.form');
const input = document.querySelector('input');
const loadMoreEl = document.querySelector('.load-more-btn');

let page = 1;
let currentQuery = '';
let totalPages = 0;

formEl.addEventListener('submit', formHandler);
loadMoreEl.addEventListener('click', onLoadMore);

async function formHandler(event) {
  event.preventDefault();

  const searchText = input.value.trim();

  if (!searchText) {
    iziToast.warning({
      message: 'Please, enter a search query',
    });
    return;
  }

  currentQuery = searchText;
  page = 1;
  input.value = '';

  showLoader();
  clearGallery();
  hideLoadMoreButton();

  try {
    const data = await getImagesByQuery(currentQuery, page);

    if (data.hits.length === 0) {
      iziToast.warning({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
      return;
    }
    createGallery(data.hits);

    totalPages = Math.ceil(data.totalHits / 15);

    if (page < totalPages) {
      showLoadMoreButton();
    } else {
      iziToast.error({
        message: "We're sorry, but you've reached the end of search results.",
      });
      hideLoadMoreButton();
    }
  } catch (error) {
    iziToast.error({
      message: 'Something went wrong. Please try again later.',
    });
  } finally {
    hideLoader();
  }
}

async function onLoadMore() {
  showLoader();
  hideLoadMoreButton();

  page++;

  try {
    const data = await getImagesByQuery(currentQuery, page);

    createGallery(data.hits);

    const galleryItem = document.querySelector('.photo-container');

    refreshGallery();

    const itemHeight = galleryItem.getBoundingClientRect().height;
    window.scrollBy({
      top: 2 * itemHeight,
      behavior: 'smooth',
    });

    const totalPages = Math.ceil(data.totalHits / 15);
    if (page >= totalPages) {
      iziToast.error({
        message: "We're sorry, but you've reached the end of search results.",
      });
      hideLoadMoreButton();
    }
  } catch (error) {
    iziToast.error({
      message: 'Something went wrong. Please try again later.',
    });
  } finally {
    hideLoader();
    if (page < totalPages) {
      showLoadMoreButton();
    }
  }
}

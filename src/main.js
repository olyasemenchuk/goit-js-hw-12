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
const galleryEl = document.querySelector('.gallery');

let page = 1;
let currentQuery = '';

formEl.addEventListener('submit', formHandler);
loadMoreEl.addEventListener('click', onLoadMore);

function formHandler(event) {
  event.preventDefault();

  const searchText = input.value.trim();

  if (!searchText) {
    iziToast.warning({
      message: 'Please, enter a search query',
    });

    return;
  }
  currentQuery = searchText;

  input.value = '';

  showLoader();
  clearGallery();

  getImagesByQuery(currentQuery, page)
    .then(data => {
      if (data.hits.length === 0) {
        iziToast.warning({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
        });
        return;
      }

      galleryEl.innerHTML = createGallery(data.hits);

      refreshGallery();

      const totalPages = Math.ceil(data.totalHits / 15);

      console.log(page, totalPages);
      if (page < totalPages) {
        showLoadMoreButton();
      }
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

async function onLoadMore() {
  page++;

  try {
    const data = await getImagesByQuery(currentQuery, page);

    galleryEl.insertAdjacentHTML('beforeend', createGallery(data.hits));

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
    console.log(error);

    iziToast.error({
      message: 'Something went wrong. Please try again later.',
    });
  }
}

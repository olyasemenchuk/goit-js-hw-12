import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const lightbox = new SimpleLightbox('.photo-container a', {
  captionsData: 'alt',
  captionDelay: 250,
});

const galleryEl = document.querySelector('.gallery');
const loaderEl = document.querySelector('.loader');
const loadMoreEl = document.querySelector('.load-more-btn');

export function refreshGallery() {
  lightbox.refresh();
}

export function createGallery(images) {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<li class="photo-container">
          <a class="photo-link" href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}" class="photo-icon"/></a>
            <ul class="info-list">
            <li class="item-info">
                <p class="label">Likes</p>
                <p class="value">${likes}</p></li>
            <li class="item-info">
                <p class="label">Views</p>
                <p class="value">${views}</p></li>
            <li class="item-info">
                <p class="label">Comments</p>
                <p class="value">${comments}</p></li>
            <li class="item-info">
                <p class="label">Downloads</p>
                <p class="value">${downloads}</p></li>
            </ul></li>`;
      }
    )
    .join('');

  galleryEl.insertAdjacentHTML('beforeend', markup);

  refreshGallery();
}

export function clearGallery() {
  galleryEl.innerHTML = '';
}

export function showLoader() {
  loaderEl.classList.add('is-visible');
}

export function hideLoader() {
  loaderEl.classList.remove('is-visible');
}

export function showLoadMoreButton() {
  loadMoreEl.classList.replace('is-hidden', 'is-visible');
}
export function hideLoadMoreButton() {
  loadMoreEl.classList.replace('is-visible', 'is-hidden');
}

// У файлі render-functions.js створи екземпляр SimpleLightbox для роботи з модальним вікном та зберігай функції для відображення елементів інтерфейсу:

// createGallery(images). Ця функція повинна приймати масив images, створювати HTML-розмітку для галереї, додавати її в контейнер галереї та викликати метод екземпляра SimpleLightbox refresh(). Нічого не повертає.
// clearGallery(). Ця функція нічого не приймає та повинна очищати вміст контейнера галереї. Нічого не повертає.
// showLoader(). Ця функція нічого не приймає, повинна додавати клас для відображення лоадера. Нічого не повертає.
// hideLoader(). Ця функція нічого не приймає, повинна прибирати клас для відображення лоадера. Нічого не повертає.
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const lightbox = new SimpleLightbox('.photo-container a', {
  captionsData: 'alt',
  captionDelay: 250,
});

const galleryEl = document.querySelector('.gallery');
const loaderEl = document.querySelector('.loader');

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

  galleryEl.innerHTML = markup;
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

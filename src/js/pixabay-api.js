import axios from 'axios';

const API_KEY = '55861557-2268365b5b48955757ff78c80';
const BASE_URL = 'https://pixabay.com/api/';

export default function getImagesByQuery(word) {
  return axios
    .get(BASE_URL, {
      params: {
        key: API_KEY,
        q: word,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
      },
    })
    .then(response => response.data);
}

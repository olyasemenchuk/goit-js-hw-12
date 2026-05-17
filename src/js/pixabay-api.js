import axios from 'axios';

const API_KEY = '55861557-2268365b5b48955757ff78c80';
const BASE_URL = 'https://pixabay.com/api/';

export default async function getImagesByQuery(query, page) {
  const { data } = await axios(BASE_URL, {
    params: {
      key: API_KEY,
      q: query,
      page,
      per_page: 15,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    },
  });
  return data;
}

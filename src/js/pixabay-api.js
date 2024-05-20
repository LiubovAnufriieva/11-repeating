import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { createGalleryMarkup } from './render-functions';

export default function onSearch(searchQuery) {
  const KEY_API = '43230635-158e2f6795128fbec19d81d21';
  const URL = 'https://pixabay.com/api/';
  const searchParams = new URLSearchParams({
    key: KEY_API,
    q: searchQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });

  fetch(`${URL}?${searchParams}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then(data => {
      if (!data.total) {
        iziToast.error({
          title: 'Error',
          position: 'center',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
        });
      }
      createGalleryMarkup(data.hits);
    })
    .catch(error => {
      iziToast.error({
        title: 'Error',
        position: 'topRight',
        message: `Oops! Something went wrong!`,
      });
    })
    .finally(() => (loader.hidden = true));
}

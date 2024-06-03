import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { onSearch } from './12pixabay-api.js';
import { createGalleryMarkup } from './12render-functions.js';
import { form, input, gallery, loadMoreBtn, arrowUp } from './refs.js';
import { scrollGallery } from './scroll-gallery.js';
import { loaderShow } from './loader.js';
import { addLoadMoreBtn, removeLoadMoreBtn } from './load-more-btn.js';

let searchQuery = ' ';
let currentPage = 1;
let totalPages;

let galleryPictures = new SimpleLightbox('.gallery-list a', {
    captionsData: 'alt',
    captionDelay: 250,
    captionPosition: 'bottom',
  });
// loaderHidden();
// loadMoreBtnHidden();
arrowUp.style.display = 'none';
form.addEventListener('submit', onFormSubmit);
loadMoreBtn.addEventListener('click', loadMorePictures);

async function onFormSubmit(event) {
  event.preventDefault();
 

  searchQuery = input.value.trim();

 
  if (searchQuery === '') {
    return iziToast.warning({
      title: '',
      position: 'topCenter',
      message: 'The field can not be empty!!!',
      timeout: 3000,
      pauseOnHover: false,
    });
  }

  gallery.innerHTML = '';
  currentPage = 1;
  
  if (!loadMoreBtn.classList.contains('hidden')) {
    removeLoadMoreBtn();
  }
  loaderShow();

  try {
    const data = await onSearch(searchQuery, currentPage);
    if (data.hits.length === 0) {
      iziToast.error({
        title: '',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
        timeout: 3000,
        pauseOnHover: false,
      });
    } else {
      gallery.insertAdjacentHTML('beforeend', createGalleryMarkup(data.hits));

      galleryPictures.refresh();

      totalPages = data.totalHits / data.hits.length;

      if (currentPage < totalPages) {
        addLoadMoreBtn();
      }
    }
  } catch (error) {
    alert(error.message);
  } finally {
    form.reset();
  }
  loaderShow();
}

async function loadMorePictures() {
  currentPage += 1;
  removeLoadMoreBtn();
  loaderShow();

  try {
    const data = await onSearch(searchQuery, currentPage);
    gallery.insertAdjacentHTML('beforeend', createGalleryMarkup(data.hits));
    galleryPictures.refresh();

    const galleryItem = document.querySelector('.gallery-item');
    scrollGallery(galleryItem);

    if (currentPage > totalPages && data.totalHits) {
      loaderShow();
      removeLoadMoreBtn();
      iziToast.info({
        title: '',
        message: "We're sorry, but you've reached the end of search results!",
        position: 'bottomRight',
        timeout: 3000,
        pauseOnHover: false,
      });
    }
    loaderShow();
    addLoadMoreBtn();
  } catch (error) {
    alert(error.message);
    removeLoadMoreBtn();
  } finally {
    if (currentPage > totalPages) {
      removeLoadMoreBtn();
      loaderShow();
      cleanInput();
    }
  }

  function cleanInput() {
    return (inputData.value = '');
  }

  arrowUp.style.display = "none";
window.addEventListener('scroll', function () {
    if (window.scrollY > 300) {
       arrowUp.style.display = 'block';
    } else {
       arrowUp.style.display = 'none';
    }
});
arrowUp.addEventListener("click", onTop);
function onTop() {
    if (window.scrollY > 0) {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }
}
}
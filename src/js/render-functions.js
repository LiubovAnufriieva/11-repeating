import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

export function createGalleryMarkup(arr) {
    const galleryList = document.querySelector(".gallery");
    const markup = arr.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
  
        <div class="gallery-card">
            <li class="gallery-items">
                <a href="${largeImageURL}">
                <img src="${webformatURL}" alt="${tags}" class="gallery-img"></a>
                <div class="card-text-div">
                    <ul class="card-text-list">
                        <li class="card-text">
                            <h2>Likes</h2>
                            <p>${likes}</p>
                        </li>
                        <li class="card-text">
                            <h2>Views</h2>
                            <p>${views}</p>
                        </li>
                        <li class="card-text">
                            <h2>Comments</h2>
                            <p>${comments}</p>
                        </li>
                        <li class="card-text">
                            <h2>Downloads</h2>
                            <p>${downloads}</p>
                        </li>
                    </ul>
                </div>
                
            </li>
        </div>`).join("");

    galleryList.insertAdjacentHTML('beforeend', markup);

    let gallery = new SimpleLightbox('.gallery a',
        {
            captionsData: 'alt',
            captionDelay: 150,
            captionPosition: 'bottom',
            widthRatio: 0.9,
            heightRatio: 0.8,
        });
    gallery.refresh()
}
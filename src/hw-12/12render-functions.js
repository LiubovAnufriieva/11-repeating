function createGalleryMarkup(arr) {
  return arr
      .map(
          ({
              webformatURL,
              largeImageURL,
              tags,
              likes,
              views,
              comments,
              downloads,
          }) =>
`
  <li class="gallery-item">
  <div class="gallery-card">
    <a href="${largeImageURL}">
      <img src="${webformatURL}" alt="${tags}" class="gallery-img"></a>
    <div class="gallery-info-div">
      <ul class="info-item-list">
        <li class="info-item">
          <h2>Likes</h2>
          <p>${likes}</p>
        </li>
        <li class="info-item">
          <h2>Views</h2>
          <p>${views}</p>
        </li>
        <li class="info-item">
          <h2>Comments</h2>
          <p>${comments}</p>
        </li>
        <li class="info-item">
          <h2>Downloads</h2>
          <p>${downloads}</p>
        </li>
      </ul>
    </div>
    </div>
  </li>
`
      )
      .join('');
      
}

export { createGalleryMarkup };

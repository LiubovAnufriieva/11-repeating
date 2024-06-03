function scrollGallery(item) {
    const galleryPageHeight = item.getBoundingClientRect().height;
    window.scrollBy({
        top: galleryPageHeight * 2,
        behavior: 'smooth',
    });
}

export { scrollGallery };
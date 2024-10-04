import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 200,
});

export function createMarkup({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) {
  return `
    <div class="card">
      <div class="card-image">
        <a href="${largeImageURL}" class="gallery-item-link">
          <img src="${webformatURL}" alt="${tags}" />
        </a>
      </div>
      <div class="card-body">
      <p class="card-text">
        <span class="card-text-label">Likes: </span>
        <span class="card-text-value">${likes}</span>
      </p>
      <p class="card-text">
        <span class="card-text-label">Comments: </span>
        <span class="card-text-value">${comments}</span>
      </p>
      <p class="card-text">
        <span class="card-text-label">Views: </span>
        <span class="card-text-value">${views}</span>
      </p>
      <p class="card-text">
        <span class="card-text-label">Downloads: </span>
        <span class="card-text-value">${downloads}</span>
      </p>
    </div>
    </div>`;
}

export function renderImages(images, container, append = false) {
    const imagesMarkup = images.map(createMarkup).join("");
  
    if (append) {
      container.insertAdjacentHTML("beforeend", imagesMarkup); 
    } else {
      container.innerHTML = imagesMarkup; 
    }
  
    lightbox.refresh(); 
  }
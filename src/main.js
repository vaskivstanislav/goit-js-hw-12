import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { fetchPixabay } from "./js/pixabay-api.js";
import { renderImages } from "./js/render-functions.js";

let page = 1; 
let query = null; 
let totalHits = 0; 

const refs = {
  form: document.querySelector(".form"),
  gallery: document.querySelector(".gallery"),
  loader: document.querySelector(".loader"),
  loadButton: document.querySelector(".load-button"), 
};

refs.form.addEventListener("submit", onFormSubmit);
refs.loadButton.addEventListener("click", onLoadButtonClick);

async function onFormSubmit(event) {
  event.preventDefault();

  query = event.currentTarget.elements.query.value.trim();

  if (query === "") {
    iziToast.show({
      title: 'Oops',
      message: "Sorry, there are no images matching your search query. Please try again!",
      color: "#ef4040",
      position: "bottomCenter"
    });
    return;
  }

  page = 1;
  refs.gallery.innerHTML = "";
  refs.loadButton.classList.add("hidden"); 
  showLoader();

  try {
    const data = await fetchPixabay(query, page);

    if (data.hits.length === 0) {
      iziToast.show({
        title: 'No results',
        message: "Sorry, there are no images matching your search query. Please try again!",
        color: "#ef4040",
        position: "bottomCenter"
      });
    } else {
      totalHits = data.totalHits; 
      renderImages(data.hits, refs.gallery);

      if (totalHits > page * 15) {
        refs.loadButton.classList.remove("hidden"); 
      }
    }

  } catch (error) { 
    iziToast.show({
      title: 'Error',
      message: "Something went wrong. Please try again later.",
      color: "#ef4040",
      position: "bottomCenter"
    });
  } finally {
    hideLoader();
    refs.form.reset(); 
  }
}

async function onLoadButtonClick(event) {
  page += 1; 
  showLoader();

  try {
    const data = await fetchPixabay(query, page);
    
    renderImages(data.hits, refs.gallery, true); 

    scrollCollection(); 

    if (totalHits <= page * 15) {
      refs.loadButton.classList.add("hidden");
      iziToast.show({
        title: 'Error',
        message: "We're sorry, but you've reached the end of search results.",
        color: "#ef4040",
        position: "bottomCenter"
      });
    }

  } catch (error) {
    iziToast.show({
      title: 'Error',
      message: "Something went wrong. Please try again later.",
      color: "#ef4040",
      position: "bottomCenter"
    });
  } finally {
    hideLoader();
  }
}

function showLoader() {
    refs.loader.classList.remove("hidden");
}
  
function hideLoader() {
    refs.loader.classList.add("hidden");
}

function scrollCollection() {
    const lastElementChild = refs.gallery.lastElementChild
    const imageHeight = lastElementChild.getBoundingClientRect().height; 
    window.scrollBy({
        top: imageHeight * 2,
        left: 0,
        behavior: "smooth" 
  });
}
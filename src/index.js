import axios from "axios";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const refs = {
    searchInput: document.querySelector(".input"),
    searchButton: document.querySelector(".btn"),
    gallery: document.querySelector(".gallery"),
    photoCard: document.querySelector(".photo-card")
}
const options = {
    key: "28027745-aff25637f942541845898cadc",
    q: '',
    image_type: "photo",
    orientation: "horizontal",
    safesearch: "true",
    page: 2,
    per_page: 20
}
const BASE_URL = "https://pixabay.com/api/";

function findByName(inputName) {
  options.q = inputName;
  const url = `${BASE_URL}?key=${options.key}&q=${options.q}&image_type=${options.image_type}&orientation=${options.orientation}&safesearch=${options.safesearch}&page=${options.page}&per_page=${options.per_page}`;
  console.log(url);
  return axios.get(url);
}

refs.searchButton.addEventListener("click", onSearch);

function onSearch(e) {
    e.preventDefault();

    const inputValue = refs.searchInput.value;
    
    findByName(inputValue)
        .then(data => {
            // console.log(data.data.hits.forEach(renderCard));
            data.data.hits.forEach(renderCard)
            // renderCard(data.data.hits.map(item => item));
    })
    .catch(error => console.log(error))
}
function renderCard({ largeImageURL, tags, likes, views, comments, downloads }) {
    const card = document.createElement("div");
    card.classList.add("photo-card");
    card.innerHTML = `<div class="img-container"><a class="gallery__item" href="${largeImageURL}"><img class="img" src="${largeImageURL}" alt="${tags}"  loading="lazy" /></a></div>
  <div class="info">
    <p class="info-item">
      <b>Likes:</b>
      ${likes}
    </p>
    <p class="info-item">
      <b>Views:</b>
      ${views}
    </p>
    <p class="info-item">
      <b>Comments:</b>
      ${comments}
    </p>
    <p class="info-item">
      <b>Downloads:</b>
      ${downloads}
    </p>
  </div>`;
  refs.gallery.append(card);
  
}

refs.gallery.addEventListener("click", onImageClick);

function onImageClick(e) {
  e.preventDefault();
  let galleryCard = new SimpleLightbox('.img-container a', { captionDelay: 250 });
  console.log(galleryCard); 
}

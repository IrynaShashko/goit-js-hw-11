import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import NewsService from "./news-service.js";

const refs = {
    form: document.querySelector("#search-form"),
    gallery: document.querySelector(".gallery"),
    loadBtn: document.querySelector(".load-btn")
}
const newsService = new NewsService();

refs.form.addEventListener("submit", onSearch);
refs.gallery.addEventListener("click", onImageClick);
refs.loadBtn.addEventListener("click", onLoadMore);

function onSearch(e) {
  e.preventDefault();
  
  newsService.query = e.currentTarget.elements.searchQuery.value;
  newsService.resetPage();
  refs.gallery.innerHTML = "";
  console.log(newsService.query);  
  newsService.fetchArticles()
    .then(data => {
      if (data.hits.length === 0) {
        Notify.info(`Sorry, there are no images matching your search query. Please try again.`);
        return;
      } else{
        data.hits.forEach(renderCard);
        Notify.success(`Hooray! We found ${data.totalHits} images.`);
      }
    
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

function onImageClick(e) {
  e.preventDefault();
  
  let galleryCard = new SimpleLightbox('.img-container a', { captionDelay: 250 });
  // galleryCard.refresh();
}
function onLoadMore(e) {
  e.preventDefault();
newsService.fetchArticles().then(data => {
  if (data.hits.length === 0) {
    Notify.failure(`Sorry, there are no more images matching your search query. Please try again.`);
    return;
  } else {
    data.hits.forEach(renderCard);
  }
  
  // console.log(data.hits.message);
  
      // renderCard(data.data.hits.map(item => item));
    })
    .catch(error => console.log(error));
}
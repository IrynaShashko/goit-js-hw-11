import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import NewsService from "./news-service.js";

const refs = {
  form: document.querySelector("#search-form"),
  searchBtn: document.querySelector(".search-btn"),
  gallery: document.querySelector(".gallery"),
  loadBtn: document.querySelector(".load-btn"),
  scroll: document.querySelector(".scroll-btn")
}
const newsService = new NewsService();

refs.form.addEventListener("submit", onSearch);
refs.loadBtn.addEventListener("click", onLoadMore);

function galleryAlbum() {
  const galleryCard = new SimpleLightbox('.img-container a', { captionDelay: 250 });
    galleryCard.refresh();
    refs.gallery.addEventListener("click", galleryCard);
}

function onSearch(e) {
  e.preventDefault();
  
  refs.gallery.innerHTML = "";
  refs.scroll.classList.add("is-hidden");

  newsService.query = e.currentTarget.elements.searchQuery.value;

  newsService.resetPage();

    if (newsService.query === '' || newsService.query === ' ') {
    return Notify.warning('Please enter a search query.');
  }
  
  newsService.fetchArticles()
    .then(data => {
      if (data.hits.length === 0) {
        refs.loadBtn.classList.add("is-hidden");
        Notify.info(`Sorry, there are no images matching your search query. Please try again.`);
        return;
    } else {
      data.hits.map(renderCard);
      galleryAlbum();
      refs.loadBtn.classList.remove("is-hidden");
        Notify.success(`Hooray! We found ${data.totalHits} images.`);
      }
    })
    .catch(error => console.log(error))
}

function onLoadMore(e) {
  e.preventDefault();
  newsService.fetchArticles().then(data => {
      if (data.hits.length === 0) {
        Notify.failure(`Sorry, there are no more images matching your search query. Please try again.`);
        return;
      } else {
        data.hits.map(renderCard);
        galleryAlbum();
        refs.scroll.classList.remove("is-hidden");
      }
    })
    .catch(error => console.log(error));
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

refs.scroll.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
})
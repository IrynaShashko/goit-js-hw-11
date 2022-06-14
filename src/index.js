import axios from "axios";

const refs = {
    searchInput: document.querySelector(".input"),
    searchButton: document.querySelector(".btn"),
    gallery: document.querySelector(".gallery")
}
const options = {
    key: "28027745-aff25637f942541845898cadc",
    q: '',
    image_type: "photo",
    orientation: "horizontal",
    safesearch: "true",
}
const BASE_URL = "https://pixabay.com/api/";

function findByName(inputName) {
  options.q = inputName;
  const url = `${BASE_URL}?key=${options.key}&q=${options.q}&image_type=${options.image_type}&orientation=${options.orientation}&safesearch=${options.safesearch}`;
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
function renderCard({largeImageURL, tags, likes, views, comments, downloads}) {
    const card = document.createElement("div");
    card.classList.add("photo-card");
    card.innerHTML = `<img class="img" src="${largeImageURL}" alt="${tags}"  loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes:<br>${likes}</b>
    </p>
    <p class="info-item">
      <b>Views:<br>${views}</b>
    </p>
    <p class="info-item">
      <b>Comments:<br>${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads:<br>${downloads}</b>
    </p>
  </div>`;
    refs.gallery.append(card);
}
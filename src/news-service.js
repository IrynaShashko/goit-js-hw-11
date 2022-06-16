import axios from "axios";
export default class NewsService {
    constructor() {
        this.searchQuery = "";
        this.page = 1;
    }
    

    fetchArticles() {
        const options = {
            key: "28027745-aff25637f942541845898cadc",
            q: '',
            image_type: "photo",
            orientation: "horizontal",
            safesearch: "true",
            page: this.page,
            per_page: 40
        };

        const BASE_URL = "https://pixabay.com/api/";

        const url = `${BASE_URL}?key=${options.key}&q=${this.searchQuery}&image_type=${options.image_type}&orientation=${options.orientation}&safesearch=${options.safesearch}&page=${this.page}&per_page=${options.per_page}`;
        return axios.get(url, options)
            .then(data => {
                this.page += 1;
                return data.data;
             });
    }
    resetPage() { 
        this.page = 1;
    }
    get query(){
            return this.searchQuery;
    }
    set query(newQuery) { 
        this.searchQuery = newQuery;
    }
}


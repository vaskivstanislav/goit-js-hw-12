export const BASE_URL = "https://pixabay.com/api/";

export const API_KEY = "46069437-f48122ef32c6bd1c27031b929";

import axios from 'axios';

export async function fetchPixabay(searchQuery, page = 1) {
    const URL = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(searchQuery)}&image_type=photo&orientation=horizontal&safesearch=true&per_page=15&page=${page}`;

    try {
        const response = await axios.get(URL);
        return response.data;
    } catch (error) {
        throw new Error("Sorry, there are no images matching your search query. Please try again!");
    }
  }
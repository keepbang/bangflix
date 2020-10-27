import axios from "axios";
import {API_KEY} from "config/dev"


const api = axios.create({
    baseURL:"https://api.themoviedb.org/3/",
    params: {
        api_key: API_KEY,
        language: "en-US",
    }
})

export const moviesApi = {
    nowPlaying: () => api.get("movie/now_playing"),
    upcoming: () => api.get("movie/upcoming"),
    popular: () => api.get("movie/popular")
}

export const tvApi = {
    topRated: () => api.get("tv/top_rated"),
    airingToday: () => api.get("tv/airing_today"),
    popular: () => api.get("tv/popular")
}

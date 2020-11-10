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
    popular: () => api.get("movie/popular"),
    movieDetail: (id) => api.get(`movie/${id}`,{
        params:{
            append_to_response: "videos"
        }
    }),
    search: (term) => api.get("search/movie",{
        params: {
            query: encodeURIComponent(term)
        }
    }),
    credits: (id) => api.get(`/movie/${id}/credits`)
    
}

export const tvApi = {
    topRated: () => api.get("tv/top_rated"),
    airingToday: () => api.get("tv/airing_today"),
    popular: () => api.get("tv/popular"),
    showDetail: (id) => api.get(`tv/${id}`,{
        params:{
            append_to_response: "videos"
        }
    }),
    search: (term) => api.get("search/tv",{
        params: {
            query: encodeURIComponent(term)
        }
    }),
    season: (id, season_number) => api.get(`/tv/${id}/season/${season_number}`),
    credits: (id) => api.get(`/tv/${id}/credits`)
}

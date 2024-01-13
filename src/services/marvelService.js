import { useHttp } from "../hooks/http.hooks";

const useMarvelService = () => {

    const { loading, request, error, clearError } = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public';
    const _apiKey = 'apikey=d256a3c14362945396d37f6684edfc32';
    const _baseOffset = 210;
    const _randomId = false;

    const getAllCharactersAsync = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}/characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    const getCharacterByIdAsync = async (id, randomId = _randomId) => {
        const res = await request(`${_apiBase}/characters/${id}?${_apiKey}`);

        if (res.code === 404 && randomId) {
            return res;
        }

       return _transformCharacter(res.data.results[0]);
    }

    const getAllComicsAsync = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}/comics?limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComics);
    }

    const getComicByIdAsync = async (id) => {
        const res = await request(`${_apiBase}/comics/${id}?${_apiKey}`);
       return _transformComics(res.data.results[0]);
    }

    const _transformCharacter = (res) => {
        return {
            id: res.id,
            name: res.name,
            description: res.description,
            thumbnail: `${res.thumbnail.path}.${res.thumbnail.extension}`,
            homepage: res.urls[0].url,
            wiki: res.urls[1].url,
            comics: res.comics.items
        }
    }

    const _transformComics = (res) => {
        console.log(res.prices[0].price);
        return {
            id: res.id,
            title: res.title,
            description: res.description || "There is no description",
            pages: res.pageCount
				? `${res.pageCount} p.`
				: "No information about the number of pages",
            language: res.textObjects[0]?.language || "en-us",
            thumbnail: `${res.thumbnail.path}.${res.thumbnail.extension}`,
            price: res.prices[0].price === 0 ? 'NOT AVAILABLE' : `${ res.prices[0].price }$`
        }
    }

    return { loading, error, getAllCharactersAsync, getCharacterByIdAsync, clearError, getAllComicsAsync, getComicByIdAsync }
}

export default useMarvelService;
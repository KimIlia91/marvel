
class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public';
    _apiKey = 'apikey=814893c03a88b29f0ff6115b255b551c';

    getResourcesAsync = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
        
        return await res.json();
    }

    getAllCharactersAsync = async () => {
        const res = await this.getResourcesAsync(`${this._apiBase}/characters?limit=9&offset=210&${this._apiKey}`);
        return res.data.results.map(this._transformCharacter);
    }

    getCharacterByIdAsync = async (id) => {
       const res = await this.getResourcesAsync(`${this._apiBase}/characters/${id}?${this._apiKey}`);
       return this._transformCharacter(res.data.results[0]);
    }

    _transformCharacter = (res) => {
        return {
            id: res.id,
            name: res.name.length > 21 ? `${res.name.slice(0, 21)}...` : res.name,
            description: res.description === '' 
                ? 'No description' 
                : res.description.length > 200 
                    ? `${res.description.slice(0, 200)}...` 
                    : res.description,
            thumbnail: `${res.thumbnail.path}.${res.thumbnail.extension}`,
            homepage: res.urls[0].url,
            wiki: res.urls[1].url
        }
    }
}

export default MarvelService;
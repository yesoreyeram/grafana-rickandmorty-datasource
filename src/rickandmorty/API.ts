import {
  RickAndMortyCharacterResponse,
  RickAndMortyCharacter,
  RickAndMortyCharactersFilter,
  RickAndMortyEpisodeResponse,
  RickAndMortyEpisode,
  RickAndMortyLocationResponse,
  RickAndMortyLocation,
  RickAndMortyEpisodesFilter,
  RickAndMortyLocationsFilter,
} from './types';

export class RickAndMortyAPI {
  private baseURL: string;
  constructor(apiURL = 'https://rickandmortyapi.com') {
    this.baseURL = apiURL;
  }
  private getResponse(url: string): Promise<any> {
    return new Promise((resolve, reject) => {
      fetch(`${this.baseURL}${url}`)
        .then(res => res.json())
        .then(res => {
          resolve(res);
        })
        .catch(reject);
    });
  }
  async getCharacters(limit: number, filters?: RickAndMortyCharactersFilter): Promise<RickAndMortyCharacter[]> {
    let filtersList: string[] = [];
    if (filters) {
      Object.keys(filters).forEach(key => {
        const value = filters[key as keyof RickAndMortyCharactersFilter];
        if (value) {
          filtersList.push(`${key}=${value}`);
        }
      });
    }
    return new Promise((resolve, reject) => {
      this.getResponse(`/api/character?${filtersList.join('&')}`)
        .then((rickAndMortyCharacterResponse: RickAndMortyCharacterResponse) => {
          resolve((rickAndMortyCharacterResponse.results || []).splice(0, limit));
        })
        .catch(reject);
    });
  }
  async getEpisodes(limit: number, filters?: RickAndMortyEpisodesFilter): Promise<RickAndMortyEpisode[]> {
    let filtersList: string[] = [];
    if (filters) {
      Object.keys(filters).forEach(key => {
        const value = filters[key as keyof RickAndMortyEpisodesFilter];
        if (value) {
          filtersList.push(`${key}=${value}`);
        }
      });
    }
    return new Promise((resolve, reject) => {
      this.getResponse(`/api/episode?${filtersList.join('&')}`)
        .then((rickAndMortyEpisodeResponse: RickAndMortyEpisodeResponse) => {
          resolve((rickAndMortyEpisodeResponse.results || []).splice(0, limit));
        })
        .catch(reject);
    });
  }
  async getLocations(limit: number, filters?: RickAndMortyLocationsFilter): Promise<RickAndMortyLocation[]> {
    let filtersList: string[] = [];
    if (filters) {
      Object.keys(filters).forEach(key => {
        const value = filters[key as keyof RickAndMortyLocationsFilter];
        if (value) {
          filtersList.push(`${key}=${value}`);
        }
      });
    }
    return new Promise((resolve, reject) => {
      this.getResponse(`/api/location?${filtersList.join('&')}`)
        .then((rickAndMortyLocationResponse: RickAndMortyLocationResponse) => {
          resolve((rickAndMortyLocationResponse.results || []).splice(0, limit));
        })
        .catch(reject);
    });
  }
}

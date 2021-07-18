import { SelectableValue } from '@grafana/data';

export interface RickAndMortyAPIResponseInfo {
  count: number;
  pages: number;
  next?: string;
  prev?: string;
}

export interface RickAndMortyCharacterResponse {
  info: RickAndMortyAPIResponseInfo;
  results: RickAndMortyCharacter[];
}
export interface RickAndMortyCharacter {
  id: number;
  name: string;
  status: CharacterStatus;
  gender: CharacterGender;
  image: string;
  type: string;
  url: string;
  created: string;
  episode: string[];
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
}

export type RickAndMortyCharactersFilter = {
  status?: CharacterStatus;
  gender?: CharacterGender;
  name?: string;
  species?: string;
  type?: string;
};

export const enum CharacterGender {
  All = '',
  Female = 'female',
  Male = 'male',
  GenderLess = 'genderless',
  Unknown = 'unknown',
}
export const characterGenders: Array<SelectableValue<CharacterGender>> = [
  { value: CharacterGender.All, label: 'All' },
  { value: CharacterGender.Female, label: 'Female' },
  { value: CharacterGender.Male, label: 'Male' },
  { value: CharacterGender.GenderLess, label: 'Genderless' },
  { value: CharacterGender.Unknown, label: 'Unknown' },
];

export const enum CharacterStatus {
  All = '',
  Alive = 'alive',
  Dead = 'dead',
  Unknown = 'unknown',
}

export const characterStatuses: Array<SelectableValue<CharacterStatus>> = [
  { value: CharacterStatus.All, label: 'All' },
  { value: CharacterStatus.Alive, label: 'Alive' },
  { value: CharacterStatus.Dead, label: 'Dead' },
  { value: CharacterStatus.Unknown, label: 'Unknown' },
];

export interface RickAndMortyEpisodeResponse {
  info: RickAndMortyAPIResponseInfo;
  results: RickAndMortyEpisode[];
}
export interface RickAndMortyEpisode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}

export type RickAndMortyEpisodesFilter = {
  name?: string;
  episode?: string;
};

export interface RickAndMortyLocationResponse {
  info: RickAndMortyAPIResponseInfo;
  results: RickAndMortyLocation[];
}
export interface RickAndMortyLocation {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  url: string;
  created: string;
}

export type RickAndMortyLocationsFilter = {
  name?: string;
  type?: string;
  dimension?: string;
};

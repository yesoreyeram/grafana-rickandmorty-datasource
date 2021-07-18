import { DataQuery, DataSourceJsonData } from '@grafana/data';
import { CharacterGender, CharacterStatus } from './rickandmorty/types';

export const enum ApiType {
  Characters = 'characters',
  Locations = 'locations',
  Episodes = 'episodes',
}

export interface RickAndMortyQuery extends DataQuery {
  apiType: ApiType;

  limit: number;

  status?: CharacterStatus;
  gender?: CharacterGender;
  name?: string;
  species?: string;
  type?: string;
  dimension?: string;
  episode?: string;
}

export interface RickAndMortyConfigJSON extends DataSourceJsonData {}

export interface RickAndMortySecureConfigJSON {}

import {
  DataQueryResponseData,
  DataQueryRequest,
  DataQueryResponse,
  DataSourceApi,
  DataSourceInstanceSettings,
  MutableDataFrame,
  FieldType,
  DataFrame,
} from '@grafana/data';
import { RickAndMortyAPI } from './rickandmorty/API';
import { RickAndMortyQuery, RickAndMortyConfigJSON, ApiType } from './types';

export class DataSource extends DataSourceApi<RickAndMortyQuery, RickAndMortyConfigJSON> {
  rmApi: RickAndMortyAPI;
  constructor(instanceSettings: DataSourceInstanceSettings<RickAndMortyConfigJSON>) {
    super(instanceSettings);
    this.rmApi = new RickAndMortyAPI();
  }
  async query(options: DataQueryRequest<RickAndMortyQuery>): Promise<DataQueryResponse> {
    const promises: Array<Promise<DataQueryResponseData>> = options.targets.map(query => {
      switch (query.apiType) {
        case ApiType.Characters:
          return this.rmApi
            .getCharacters(query.limit, {
              status: query.status,
              gender: query.gender,
              name: query.name,
              type: query.type,
              species: query.species,
            })
            .then(res => {
              return new MutableDataFrame({
                name: `${query.refId} - Characters`,
                refId: query.refId,
                fields: [
                  { name: 'ID', type: FieldType.number, values: res.map(u => u.id) },
                  { name: 'Name', type: FieldType.string, values: res.map(u => u.name) },
                  { name: 'Status', type: FieldType.string, values: res.map(u => u.status) },
                  { name: 'Gender', type: FieldType.string, values: res.map(u => u.gender) },
                  { name: 'Image', type: FieldType.string, values: res.map(u => u.image) },
                  { name: 'Type', type: FieldType.string, values: res.map(u => u.type) },
                  { name: 'Origin', type: FieldType.string, values: res.map(u => u.origin.name) },
                  { name: 'Location', type: FieldType.string, values: res.map(u => u.location.name) },
                  { name: 'URL', type: FieldType.string, values: res.map(u => u.url) },
                  { name: 'Created', type: FieldType.time, values: res.map(u => new Date(u.created)) },
                ],
              });
            });
        case ApiType.Episodes:
          return this.rmApi.getEpisodes(query.limit, { name: query.name, episode: query.episode }).then(res => {
            return new MutableDataFrame({
              name: `${query.refId} - Episodes`,
              refId: query.refId,
              fields: [
                { name: 'ID', type: FieldType.number, values: res.map(u => u.id) },
                { name: 'Name', type: FieldType.string, values: res.map(u => u.name) },
                { name: 'Air Date', type: FieldType.time, values: res.map(u => new Date(u.air_date)) },
                { name: 'Episode', type: FieldType.string, values: res.map(u => u.episode) },
                { name: 'URL', type: FieldType.string, values: res.map(u => u.url) },
                { name: 'Created', type: FieldType.time, values: res.map(u => new Date(u.created)) },
              ],
            });
          });
        case ApiType.Locations:
          return this.rmApi
            .getLocations(query.limit, { name: query.name, type: query.type, dimension: query.dimension })
            .then(res => {
              return new MutableDataFrame({
                name: `${query.refId} - Locations`,
                refId: query.refId,
                fields: [
                  { name: 'ID', type: FieldType.number, values: res.map(u => u.id) },
                  { name: 'Name', type: FieldType.string, values: res.map(u => u.name) },
                  { name: 'Type', type: FieldType.string, values: res.map(u => u.type) },
                  { name: 'Dimension', type: FieldType.string, values: res.map(u => u.dimension) },
                  { name: 'URL', type: FieldType.string, values: res.map(u => u.url) },
                  { name: 'Created', type: FieldType.time, values: res.map(u => new Date(u.created)) },
                ],
              });
            });
      }
    });
    return Promise.all(promises).then((data: DataFrame[]) => ({ data }));
  }
  async testDatasource() {
    return {
      status: 'success',
      message: 'Successfully connected to Rick and Morty',
    };
  }
}

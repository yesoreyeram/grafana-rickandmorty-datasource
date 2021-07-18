import { DataSourcePlugin } from '@grafana/data';
import { DataSource } from './datasource';
import { ConfigEditor } from './ConfigEditor';
import { QueryEditor } from './QueryEditor';
import { RickAndMortyQuery, RickAndMortyConfigJSON } from './types';

export const plugin = new DataSourcePlugin<DataSource, RickAndMortyQuery, RickAndMortyConfigJSON>(DataSource)
  .setConfigEditor(ConfigEditor)
  .setQueryEditor(QueryEditor);

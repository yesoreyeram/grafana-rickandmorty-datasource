import React from 'react';
import { DataSourcePluginOptionsEditorProps } from '@grafana/data';
import { RickAndMortyConfigJSON } from './types';

interface RickAndMortyConfigEditorProps extends DataSourcePluginOptionsEditorProps<RickAndMortyConfigJSON> {}

export const ConfigEditor = (props: RickAndMortyConfigEditorProps) => {
  return <div>Configuration Editor</div>;
};

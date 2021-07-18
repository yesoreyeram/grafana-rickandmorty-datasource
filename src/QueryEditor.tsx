import React from 'react';
import { QueryEditorProps, SelectableValue } from '@grafana/data';
import { InlineFormLabel, Input, RadioButtonGroup } from '@grafana/ui';
import { DataSource } from './datasource';
import { CharacterFilter } from './editors/CharacterFilter';
import { RickAndMortyQuery, RickAndMortyConfigJSON, ApiType } from './types';
import { LocationsFilter } from 'editors/LocationsFilter';
import { EpisodesFilter } from 'editors/EpisodesFilter';

type RickAndMortyQueryEditorProps = QueryEditorProps<DataSource, RickAndMortyQuery, RickAndMortyConfigJSON>;

export const QueryEditor = (props: RickAndMortyQueryEditorProps) => {
  const apiTypes: Array<SelectableValue<ApiType>> = [
    { value: ApiType.Characters, label: 'Characters' },
    { value: ApiType.Episodes, label: 'Episodes' },
    { value: ApiType.Locations, label: 'Locations' },
  ];

  const onApiTypeChange = (apiType: ApiType) => {
    props.onChange({ ...props.query, apiType });
    props.onRunQuery();
  };
  const onLimitChange = (limit: number) => {
    props.onChange({ ...props.query, limit });
    props.onRunQuery();
  };

  return (
    <div>
      <div className="gf-form">
        <InlineFormLabel width={6}>API Type</InlineFormLabel>
        <RadioButtonGroup<ApiType> onChange={e => onApiTypeChange(e!)} value={props.query.apiType} options={apiTypes} />
      </div>
      {props.query.apiType === ApiType.Characters && <CharacterFilter {...props} />}
      {props.query.apiType === ApiType.Episodes && <EpisodesFilter {...props} />}
      {props.query.apiType === ApiType.Locations && <LocationsFilter {...props} />}
      <div className="gf-form">
        <InlineFormLabel width={6}>Limit</InlineFormLabel>
        <Input
          className="width-10"
          css={{}}
          type="number"
          value={props.query.limit}
          onChange={e => onLimitChange(+e.currentTarget.value)}
        />
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { InlineFormLabel, Input } from '@grafana/ui';
import { RickAndMortyQuery } from 'types';

type LocationFilterProps = {
  query: RickAndMortyQuery;
  onChange: (value: RickAndMortyQuery) => void;
  onRunQuery: () => void;
};

export const LocationsFilter = (props: LocationFilterProps) => {
  const [name, setName] = useState(props.query.name || '');
  const [type, setType] = useState(props.query.type || '');
  const [dimension, setDimension] = useState(props.query.dimension || '');
  const onLocationNameChange = () => {
    props.onChange({ ...props.query, name });
    props.onRunQuery();
  };
  const onLocationTypeChange = () => {
    props.onChange({ ...props.query, type });
    props.onRunQuery();
  };
  const onLocationDimensionChange = () => {
    props.onChange({ ...props.query, dimension });
    props.onRunQuery();
  };
  return (
    <>
      <div className="gf-form">
        <InlineFormLabel width={6} tooltip="Location Name to filter">
          Name
        </InlineFormLabel>
        <Input
          css={{}}
          className="width-10"
          value={name}
          onChange={e => setName(e.currentTarget.value)}
          onBlur={onLocationNameChange}
        />
        <InlineFormLabel width={6} tooltip="Location Type to filter">
          Type
        </InlineFormLabel>
        <Input
          css={{}}
          className="width-10"
          value={type}
          onChange={e => setType(e.currentTarget.value)}
          onBlur={onLocationTypeChange}
        />
        <InlineFormLabel width={6} tooltip="Location Dimension to filter">
          Dimension
        </InlineFormLabel>
        <Input
          css={{}}
          className="width-10"
          value={dimension}
          onChange={e => setDimension(e.currentTarget.value)}
          onBlur={onLocationDimensionChange}
        />
      </div>
    </>
  );
};

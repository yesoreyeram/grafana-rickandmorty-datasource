import React, { useState } from 'react';
import { InlineFormLabel, Select, Input } from '@grafana/ui';
import { CharacterStatus, characterStatuses, CharacterGender, characterGenders } from './../rickandmorty/types';
import { RickAndMortyQuery } from 'types';

type CharacterFilterProps = {
  query: RickAndMortyQuery;
  onChange: (value: RickAndMortyQuery) => void;
  onRunQuery: () => void;
};

export const CharacterFilter = (props: CharacterFilterProps) => {
  const [name, setName] = useState(props.query.name || '');
  const [type, setType] = useState(props.query.type || '');
  const [species, setSpecies] = useState(props.query.species || '');
  const onCharacterStatusChange = (status: CharacterStatus) => {
    props.onChange({ ...props.query, status });
    props.onRunQuery();
  };
  const onCharacterGenderChange = (gender: CharacterGender) => {
    props.onChange({ ...props.query, gender });
    props.onRunQuery();
  };
  const onCharacterNameChange = () => {
    props.onChange({ ...props.query, name });
    props.onRunQuery();
  };
  const onCharacterTypeChange = () => {
    props.onChange({ ...props.query, type });
    props.onRunQuery();
  };
  const onCharacterSpeciesChange = () => {
    props.onChange({ ...props.query, species });
    props.onRunQuery();
  };
  return (
    <>
      <div className="gf-form">
        <InlineFormLabel width={6} tooltip="Character Name to filter">
          Name
        </InlineFormLabel>
        <Input
          css={{}}
          className="width-10"
          value={name}
          onChange={e => setName(e.currentTarget.value)}
          onBlur={onCharacterNameChange}
        />
        <InlineFormLabel width={6} tooltip="Character Type to filter">
          Type
        </InlineFormLabel>
        <Input
          css={{}}
          className="width-10"
          value={type}
          onChange={e => setType(e.currentTarget.value)}
          onBlur={onCharacterTypeChange}
        />
        <InlineFormLabel width={6} tooltip="Character Species to filter">
          Species
        </InlineFormLabel>
        <Input
          css={{}}
          className="width-10"
          value={species}
          onChange={e => setSpecies(e.currentTarget.value)}
          onBlur={onCharacterSpeciesChange}
        />
      </div>
      <div className="gf-form">
        <InlineFormLabel width={6}>Status</InlineFormLabel>
        <Select
          className="width-10"
          value={props.query.status}
          options={characterStatuses}
          onChange={e => onCharacterStatusChange(e.value!)}
        />
        <InlineFormLabel width={6}>Gender</InlineFormLabel>
        <Select
          className="width-10"
          value={props.query.gender}
          options={characterGenders}
          onChange={e => onCharacterGenderChange(e.value!)}
        />
      </div>
    </>
  );
};

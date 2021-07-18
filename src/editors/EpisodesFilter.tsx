import React, { useState } from 'react';
import { InlineFormLabel, Input } from '@grafana/ui';
import { RickAndMortyQuery } from 'types';

type EpisodesFilterProps = {
  query: RickAndMortyQuery;
  onChange: (value: RickAndMortyQuery) => void;
  onRunQuery: () => void;
};

export const EpisodesFilter = (props: EpisodesFilterProps) => {
  const [name, setName] = useState(props.query.name || '');
  const [episode, setEpisode] = useState(props.query.episode || '');
  const onEpisodeNameChange = () => {
    props.onChange({ ...props.query, name });
    props.onRunQuery();
  };
  const onEpisodeCodeChange = () => {
    props.onChange({ ...props.query, episode });
    props.onRunQuery();
  };
  return (
    <>
      <div className="gf-form">
        <InlineFormLabel width={6} tooltip="Episode Name to filter">
          Name
        </InlineFormLabel>
        <Input
          css={{}}
          className="width-10"
          value={name}
          onChange={e => setName(e.currentTarget.value)}
          onBlur={onEpisodeNameChange}
        />
        <InlineFormLabel width={8} tooltip="Episode code to filter">
          Episode Code
        </InlineFormLabel>
        <Input
          css={{}}
          className="width-10"
          value={episode}
          onChange={e => setEpisode(e.currentTarget.value)}
          onBlur={onEpisodeCodeChange}
        />
      </div>
    </>
  );
};

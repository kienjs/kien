import React from 'react';

import { memo } from '../lib/helpers';
import type { BaseUnitProps, PositionState } from '../lib/types';

import Unit from './Unit';

export type HeroProps = BaseUnitProps & {
  id: string;
  position?: Partial<PositionState>;
  moveTo?: { x: number, y: number };
  skin: string;
};

const width = 20;
const height = 30;
const heroOptions = {
  density: 1,
};

// TODO: The ant will have movee ment and thing here
const Ant = (props: HeroProps) => {
  const {
    id, moveTo, position, skin,
  } = props;

  return (
    <Unit
      id={id}
      position={position}
      width={width}
      height={height}
      moveTo={moveTo}
      anchor={[0.5, 0.6]}
      options={heroOptions}
      shape="circle"
      radius={width / 1.5}
      skin={skin}
      speed={3}
    />
  );
};

export default memo(Ant);

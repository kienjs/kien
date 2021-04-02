import React, { useState } from 'react';
import { isEqual } from 'lodash';

import { memo } from '../lib/helpers';
import { usePrevious, useTick } from '../lib/hooks';
import type {
  BaseUnitProps,
  PositionState,
  Point,
} from '../lib/types';

import Unit from './Unit';

export type HeroProps = BaseUnitProps & {
  id: string;
  position?: Partial<PositionState>;
  moveTo?: { x: number, y: number };
  skin: string;
  onSignal: (p: Point) => void;
};

const width = 20;
const height = 30;

// TODO: The ant will have move ment and thing here
const Ant = (props: HeroProps) => {
  const {
    id,
    moveTo,
    position,
    onSignal,
    skin,
  } = props;

  const [counter, setCounter] = useState<number>(0);
  const [currentPosition, setCurrentPosition] = useState<PositionState>();

  // If this way hurts performance, try to use ref
  const prevPosition = usePrevious(currentPosition);

  useTick(() => {
    if (counter >= 60) { // 60fps :D
      setCounter(0);
      if (currentPosition && !isEqual(prevPosition, currentPosition)) {
        const { x, y } = currentPosition;
        onSignal({ x, y });
      }
    } else {
      setCounter(counter + 1);
    }
  });

  return (
    <Unit
      id={id}
      position={position}
      width={width}
      height={height}
      moveTo={{ x: 800, y: 600 }}
      anchor={[0.5, 0.6]}
      skin={skin}
      speed={3}
      onChange={setCurrentPosition}
    />
  );
};

export default memo(Ant);

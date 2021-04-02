import React, { useCallback, useState } from 'react';
import { isEqual } from 'lodash';

import { memo } from '../lib/helpers';
import {
  usePrevious,
  useTick,
  useWindowSize,
} from '../lib/hooks';
import type {
  BaseUnitProps,
  PositionState,
  SignalPoint,
} from '../lib/types';

import Unit from './Unit';

export type HeroProps = BaseUnitProps & {
  id: string;
  position?: Partial<PositionState>;
  moveTo?: { x: number, y: number };
  skin: string;
  onSignal: (p: SignalPoint) => void;
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

  const { width: ww, height: wh } = useWindowSize();

  const [counter, setCounter] = useState<number>(0);
  const [currentPosition, setCurrentPosition] = useState<PositionState>();

  // If this way hurts performance, try to use ref
  const prevPosition = usePrevious(currentPosition);

  const randomMove = useCallback(() => ({
    x: Math.floor(Math.random() * (ww - 10)),
    y: Math.floor(Math.random() * (wh - 10)),
  }), [ww, wh]);

  const [next, setNext] = useState(randomMove);

  useTick(() => {
    if (counter % 10 === 0) {
      setNext(randomMove());
    }
    if (counter >= 10) { // 60 is 1 second
      setCounter(0);
      if (currentPosition && !isEqual(prevPosition, currentPosition)) {
        const { x, y } = currentPosition;

        onSignal({ id, x, y });
      }
    } else {
      setCounter(counter + 1);
    }
  });

  /* useTime(() => { */
  /*   const { x, y } = currentPosition; */
  /*   onSignal({ x, y }); */
  /* }, 1, [currentPosition]); */

  return (
    <Unit
      id={id}
      position={position}
      width={width}
      height={height}
      moveTo={next}
      anchor={[0.5, 0.6]}
      skin={skin}
      speed={3}
      onChange={setCurrentPosition}
    />
  );
};

export default memo(Ant);

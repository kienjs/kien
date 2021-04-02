import React, {
  useCallback,
  useEffect,
  useReducer,
} from 'react';
import { Sprite, useTick } from '@inlet/react-pixi';

import {
  angularLerp,
  getDistance,
  lerp,
  memo,
  merge,
} from '../lib/helpers';
import { initialPosition } from '../lib/constants';

import type {
  BaseUnitProps,
  Point,
  PositionAction,
  PositionState,
} from '../lib/types';

export type Props = BaseUnitProps & {
  fillStyle?: number[];
  lineStyle?: number[];
  skin?: string;
  speed?: number;
  moveTo?: Point;
  debug?: boolean;
  onChange?: (state: any) => void;
};

const reducer = (s: PositionState, a: PositionAction): PositionState => {
  switch (a.type) {
    case 'update':
      return merge(s, a.payload);
    case 'reset':
      return initialPosition;
    default:
      return initialPosition;
  }
};

// const debug = import.meta.env.DEV;

const Unit = (props: Props) => {
  const {
    anchor = 0.5,
    height = 10,
    width = 10,
    moveTo,
    speed = 6,
    skin = '/warning.png',
    options = {},
    position,
    onChange,
  } = props;

  const [localPosition, update] = useReducer(reducer, merge(initialPosition, position));

  // const finalOptions = merge(defaultOptions, options);

  // FIXME: make types here
  // Guess the next point to move, we will try to use this to find best direction
  const predict = useCallback(() => {
    const current = { ...localPosition };
    const distance = getDistance(current, moveTo);

    if (distance === null) {
      return localPosition;
    }

    const direction = Math.atan2(distance.y, distance.x);

    let dx = speed * Math.cos(direction);
    let dy = speed * Math.sin(direction);

    if (distance.value < 50) {
      dx *= distance.value / 50;
      dy *= distance.value / 50;
    }

    if (distance.value >= 2) {
      return merge(localPosition, {
        x: current.x + dx,
        y: current.y + dy,
        rotation: direction,
      });
    }

    return current;
  }, [localPosition, speed, moveTo]);

  useTick((delta = 0) => {
    if (!options.isStatic) {
      const next = predict();

      const microPosition = {
        x: lerp(localPosition.x, next.x, delta),
        y: lerp(localPosition.y, next.y, delta),
        rotation: angularLerp(localPosition.rotation, next.rotation, delta),
      };

      const step = merge(localPosition, microPosition);

      // interpolate between the origin and next position
      update({
        type: 'update',
        payload: step,
      });
    }
  });

  useEffect(() => {
    if (typeof onChange === 'function') {
      onChange(localPosition);
    }
  }, [onChange, localPosition]);

  return (
    <Sprite
      interactive
      image={skin}
      height={height}
      width={width}
      anchor={anchor}
      // mouseover={(e) => console.log(id, e)}
      x={localPosition.x}
      y={localPosition.y}
      rotation={localPosition.rotation + Math.PI / 2}
    />
  );
};

export default memo(Unit);

import React, { useCallback, useEffect, useState } from 'react';
import { Graphics } from '@inlet/react-pixi';

import { useTick } from '../lib/hooks';
import type { Point } from '../lib/types';

type Props = {
  index: number;
  position: Point;
  type: 'HOME' | 'FOOD';
  onDestroy: (index: number) => void;
};

const TTL = 200;

const Chemical = (props: Props) => {
  const {
    index,
    position: { x, y },
    type,
    onDestroy,
  } = props;
  const [time, setTime] = useState(TTL);

  useTick((delta = 0) => {
    if (time > 0 && time >= delta) {
      setTime(time - delta);
    } else {
      setTime(time - delta);
    }
  });

  useEffect(() => {
    if (time <= 0) {
      onDestroy(index);
    }
  }, [index, time, onDestroy]);

  const draw = useCallback((g: any) => {
    g.clear();
    g.lineStyle(0);
    g.beginFill(type === 'HOME' ? 0xff000b : 0x00ff0b, time / TTL);
    g.drawCircle(x, y, 10);
    g.endFill();
  }, [x, y, time, type]);

  return (
    <Graphics draw={draw} />
  );
};

export default Chemical;

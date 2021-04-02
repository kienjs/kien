import React, { useCallback } from 'react';
import { Graphics } from '@inlet/react-pixi';

import type { Point } from '../lib/types';

type Props = {
  position: Point;
  type: 'HOME' | 'FOOD';
};

const Chemical = (props: Props) => {
  const { position: { x, y }, type } = props;

  const draw = useCallback((g: any) => {
    g.clear();
    g.lineStyle(0);
    g.beginFill(type === 'HOME' ? 0xff000b : 0x00ff0b, 0.5);
    g.drawCircle(x, y, 10);
    g.endFill();
  }, [x, y, type]);

  return (
    <Graphics draw={draw} />
  );
};

export default Chemical;

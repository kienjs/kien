import React, { useCallback } from 'react';
import { Graphics } from '@inlet/react-pixi';

import type { PositionState } from '../lib/types';

type Props = {
  position: Partial<PositionState>;
};

const Chemical = (props: Props) => {
  const { position: { x, y } } = props;

  const draw = useCallback((g: any) => {
    g.clear();
    g.lineStyle(0);
    g.beginFill(0xffff0b, 0.5);
    g.drawCircle(x, y, 10);
    g.endFill();
  }, [x, y]);

  return (
    <Graphics draw={draw} />
  );
};

export default Chemical;

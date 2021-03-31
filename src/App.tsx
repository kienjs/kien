import React, { useCallback, useState } from 'react';

import {
  Ant,
  Container,
  Stage,
  TilingSprite,
  Tree,
} from './components';
import { stageOptions } from './lib/constants';
import { useWindowSize } from './lib/hooks';

export default function App() {
  const { width, height } = useWindowSize();

  const initHero1 = { x: 100, y: 300 };
  const [newPosition, setNewPosition] = useState(initHero1);

  const handleMoveTo = useCallback((e: any) => {
    setNewPosition({ ...e.data.global });
  }, []);

  return (
    <Stage
      width={width}
      height={height}
      options={stageOptions}
    >
      <Container
        interactive
        x={0}
        y={0}
        rightdown={handleMoveTo}
      >
        <TilingSprite
          image="/dirt.jpg"
          width={width}
          height={height}
          tilePosition={{ x: 0, y: 0 }}
        />

        <Ant
          id="ant1"
          position={initHero1}
          moveTo={newPosition}
          skin="/ant.png"
        />

      </Container>
    </Stage>
  );
}

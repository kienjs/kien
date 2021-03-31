import React, { useCallback, useState } from 'react';

import {
  Ant,
  Chemical,
  Container,
  Stage,
  TilingSprite,
  Tree,
} from './components';
import { stageOptions } from './lib/constants';
import { useWindowSize } from './lib/hooks';
import type { PositionState } from './lib/types';

export default function App() {
  const { width, height } = useWindowSize();

  const initHero1 = { x: 100, y: 300 };
  const [newPosition, setNewPosition] = useState(initHero1);
  const [chemicals, setChemicals] = useState<PositionState[]>([]);

  const handleMoveTo = useCallback((e: any) => {
    setNewPosition({ ...e.data.global });
  }, []);

  const handleSignal = useCallback((p: PositionState) => {
    const tmp = [...chemicals];
    tmp.push(p);
    setChemicals(tmp);
  }, [chemicals, setChemicals]);

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

        {chemicals.length !== 0 && chemicals.map((o) => (
          <Chemical key={`${o.x}-${o.y}-${Date.now()}`} position={o} />
        ))}

        <Ant
          id="ant1"
          position={initHero1}
          moveTo={newPosition}
          skin="/ant.png"
          onSignal={handleSignal}
        />

      </Container>
    </Stage>
  );
}

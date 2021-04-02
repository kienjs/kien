import React, { useCallback, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import {
  Ant,
  Chemical,
  Container,
  Counter,
  Stage,
  TilingSprite,
} from './components';
import { stageOptions } from './lib/constants';
import { useTimeoutFn, useWindowSize } from './lib/hooks';
import type { Point, SignalPoint } from './lib/types';

const initPosition = { x: 100, y: 300 };

export default function App() {
  const { width, height } = useWindowSize();

  const [newPosition, setNewPosition] = useState<Point>(initPosition);
  const [chemicals, setChemicals] = useState<Record<string, SignalPoint[]>>({});
  const [ants, setAnts] = useState<string[]>([]);

  const handleMoveTo = useCallback((e: any) => {
    setNewPosition({ ...e.data.global });
  }, []);

  const handleSignal = useCallback((p: SignalPoint) => {
    const tmp = [...(chemicals[p.id] || [])];
    tmp.push(p);
    setChemicals({ ...chemicals, [p.id]: tmp });
  }, [chemicals, setChemicals]);

  const handleDestroy = useCallback((id: string, index: number) => {
    const tmp = [...chemicals[id]];
    tmp.splice(index, 1);
    setChemicals({ ...chemicals, [id]: tmp });
  }, [chemicals]);

  const counterData = [
    { title: 'Chemical objects', value: 0 },
    { title: 'Total ants', value: ants.length },
  ];

  const generateNewAnt = () => {
    const id = uuidv4();
    const tmp = [...ants];
    tmp.push(id);
    setAnts(tmp);
  };

  const [isReady, cancel, reset] = useTimeoutFn(generateNewAnt, 3000);

  useEffect(() => {
    reset();
  }, [ants.length, reset]);

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

        <Counter data={counterData} />

        {Object.keys(chemicals).map((id: string) => {
          const chemicalSet = chemicals[id];

          return chemicalSet.map((o: any, index: number) => (
            <Chemical
              id={id}
              index={index}
              key={`${o.x}-${o.y}`}
              position={{ x: o.x, y: o.y }}
              type="HOME"
              onDestroy={handleDestroy}
            />
          ));
        })}

        {ants.map((id: string) => (
          <Ant
            key={id}
            id={id}
            position={initPosition}
            moveTo={newPosition}
            skin="/ant.png"
            onSignal={handleSignal}
          />
        ))}

      </Container>
    </Stage>
  );
}

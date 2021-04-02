import React from 'react';
import { Text } from '@inlet/react-pixi';

import type { Count } from '../lib/types';

type Props = {
  data: Count[];
};

const textStyle = { fill: '#FFFFFF', fontSize: 14 };

const Counter = (props: Props) => {
  const { data } = props;

  return (
    <>
      {data.map(({ title, value }: Count, i: number) => (
        <Text
          key={`${title}-${i * 10}`}
          text={`${title}: ${value}`}
          x={30}
          y={30 + i * 20}
          style={textStyle}
        />
      ))}
    </>
  );
};

export default Counter;

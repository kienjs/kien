import { useState } from 'react';
import { useApp, useTick } from '@inlet/react-pixi';
import { isEqual } from 'lodash';

import {
  usePrevious,
  useTimeoutFn,
  useWindowSize,
} from 'react-use';

// time: number in seconds
const useTime = (callback: () => void, time = 0, deps: any) => {
  const [counter, setCounter] = useState<number>(0);

  const prevDeps = usePrevious(deps);

  useTick(() => {
    if (counter >= time * 60) { // 60 is 1 second
      setCounter(0);

      if (deps || deps.length > 0) {
        if (!isEqual(prevDeps, deps)) {
          callback();
        }
      } else {
        callback();
      }
    } else {
      setCounter(counter + 1);
    }
  });
};

export {
  // From React Pixi
  useApp,
  useTick,

  // From react-use
  usePrevious,
  useTimeoutFn,
  useWindowSize,

  // Our custom hooks
  useTime,
};

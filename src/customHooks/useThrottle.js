import { useState, useEffect, useRef } from "react";

const useThrottle = (value, callback, delay = 1500) => {
  const [throttledValue, setThrottledValue] = useState(value);
  const active = useRef(false);
  const lastArg = useRef(null);

  useEffect(() => {
    if (active.current == false && value) {
      active.current = true;
      setThrottledValue(value);
      callback?.(value);
      setTimeout(() => {
        if (lastArg.current != null) {
          setThrottledValue(lastArg.current);
          callback?.(lastArg.current);
          lastArg.current = null;
        }
        active.current = true;
      }, delay);
    } else {
      lastArg.current = value;
    }

    return () => {};
  }, [callback, delay, value]);

  return throttledValue;
};

export default useThrottle;

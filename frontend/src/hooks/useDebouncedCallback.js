import { useCallback, useRef } from "react";

export default function useDebouncedCallback(callback, delay = 300) {
  const timer = useRef();

  return useCallback(
    (...args) => {
      clearTimeout(timer);
      timer.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );
}

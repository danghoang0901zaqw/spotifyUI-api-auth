import { useEffect, useState } from "react";

const useDebounced = (value, delay) => {
  const [debouncedValue,setDebouncedValue]=useState(value)
  
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedValue(value)
    }, delay);
    return () => clearTimeout(timerId);
  }, [value]);

  return debouncedValue;
};

export default useDebounced;

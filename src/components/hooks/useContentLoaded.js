import { useState, useEffect, useRef } from 'react';

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export default loading => {
  const [loaded, setLoaded] = useState(false);
  const prevLoading = usePrevious(loading);

  useEffect(() => {
    if (prevLoading && !loading) {
      setLoaded(true);
    }
  }, [loading, prevLoading, setLoaded]);

  return loaded;
}
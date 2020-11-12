import usePrevious from './usePrevious';
import { useState, useEffect } from 'react';

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
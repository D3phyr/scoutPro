import { useState, useEffect } from 'react';
import { loadMedia } from '~/utils/loadMedia';

const useLoaded = (src, isVideo = false, delay = 0) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const onMounted = async () => {
    if (!src || src.includes('undefined')) return;
    await loadMedia(src, isVideo);
    setTimeout(() => {
      setIsLoaded(true);
    }, delay);
  };

  useEffect(() => {
    onMounted();
  }, []);

  return isLoaded;
};

export default useLoaded;

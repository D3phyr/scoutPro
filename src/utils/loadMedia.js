export const loadMedia = (src, isVideo) => {
  return new Promise((resolve, reject) => {
    if (isVideo) {
      const video = document.createElement('video');
      video.setAttribute('src', src);
      video.onloadeddata = () => {
        resolve();
      };
      video.addEventListener('error', reject);
      video.src = src;
    } else {
      const image = new Image();
      image.addEventListener('load', resolve);
      image.addEventListener('error', reject);
      image.src = src;
    }
  });
};

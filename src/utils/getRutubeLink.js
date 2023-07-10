export const getRutubeLink = url => {
  return '//rutube.ru/play/embed/' + url.replace(/.*video\//gm, '');
};

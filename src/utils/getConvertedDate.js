export const getConvertedDate = (date, isShortened = false, time = false) => {
  const months = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря',
  ];
  const year = new Date(date).getFullYear();
  const month = months[new Date(date).getUTCMonth()];
  const day = new Date(date).getUTCDate();
  const hours = new Date(date).getUTCHours();
  const minutes = new Date(date).getMinutes();
  return time
    ? `${day > 9 ? day : '0' + day} ${isShortened && month.length > 3 ? month.slice(0, 3) + '.' : month} ${year}, ${
        hours > 9 ? hours : '0' + hours
      }:${minutes > 9 ? minutes : '0' + minutes}`
    : `${day > 9 ? day : '0' + day} ${isShortened && month.length > 3 ? month.slice(0, 3) + '.' : month} ${year}`;
};

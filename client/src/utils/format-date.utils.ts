export const formatDate = (
  date: Date,
  locale = 'ru-RU',
  options?: Intl.DateTimeFormatOptions,
) => {
  const defaultOptions = options ?? {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };
  return new Intl.DateTimeFormat(locale, defaultOptions).format(new Date(date));
};

export const formatDateTime = (
  date: Date,
  locale = 'ru-RU',
  options?: Intl.DateTimeFormatOptions,
) => {
  const defaultOptions = options ?? {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  };
  return new Intl.DateTimeFormat(locale, defaultOptions).format(new Date(date));
};

export const formatDateTimeForFile = (date: Date) => {
  const formattedDate = date
    .toLocaleString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
    .replace(',', '')
    .replace(/\s/g, '_')
    .replace(/\./g, '-')
    .replace(/:/g, '-');

  return formattedDate;
};

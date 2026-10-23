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

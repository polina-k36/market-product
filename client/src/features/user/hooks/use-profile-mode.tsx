import { useSearchParams } from 'react-router';

export function useProfileMode() {
  const [searchParams, setSearchParams] = useSearchParams();

  const setMode = (mode: 'settings' | 'orders') => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);

      next.set('mode', mode);

      return next;
    });
  };

  return {
    mode: searchParams.get('mode'),
    setMode,
  };
}

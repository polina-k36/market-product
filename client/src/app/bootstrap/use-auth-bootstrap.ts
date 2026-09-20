import { authApi } from '@/features/auth/api/auth.api';
import { useAuthStore } from '@/stores/auth/auth.store';
import type { AxiosError } from 'axios';
import { useEffect, useRef } from 'react';

export function useAuthBootstrap() {
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const setUser = useAuthStore((state) => state.setUser);
  const setAuthStatus = useAuthStore((state) => state.setAuthStatus);
  const initializedRef = useRef(false);
  useEffect(() => {
    if (initializedRef.current) return;

    initializedRef.current = true;
    authApi
      .refresh()
      .then((data) => {
        setAccessToken(data.accessToken);
        setUser(data.user);
        setAuthStatus('authenticated');
      })
      .catch((e: AxiosError) => {
        console.log(e.message);
        setAccessToken(null);
        setUser(null);
        setAuthStatus('unauthenticated');
      })
      .finally(() => {
        console.log('bootstrap finally');
      });
  }, []);
}

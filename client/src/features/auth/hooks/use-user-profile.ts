import { useQuery } from '@tanstack/react-query';
import { authApi } from '../api/auth.api';
import { useAuthStore } from '@/stores/auth/auth.store';

export const PROFILE_QUERY_KEY = ['auth', 'profile'];

export function useUserProfile() {
  const authStatus = useAuthStore((state) => state.status);
  return useQuery({
    queryKey: PROFILE_QUERY_KEY,
    queryFn: authApi.getProfile,
    enabled: authStatus === 'authenticated',
  });
}

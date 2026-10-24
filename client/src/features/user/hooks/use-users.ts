import { useQuery } from '@tanstack/react-query';
import { userApi } from '../api/user.api';

export function useUsers() {
  //TODO: проверить авторизации и роли
  return useQuery({
    queryKey: ['users'],
    queryFn: () => userApi.findAllUsers(),
  });
}

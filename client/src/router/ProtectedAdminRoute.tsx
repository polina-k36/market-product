import { useAuthStore } from '@/stores/auth/auth.store';
import { Navigate, Outlet } from 'react-router';

const ProtectedAdminRoute = () => {
  const { status, user } = useAuthStore();

  if (status === 'unknown') {
    return <div>Загрузка...</div>;
  }
  if (status === 'unauthenticated') {
    return <Navigate to="/auth" replace />;
  }
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  if (user.role.title !== 'ADMIN') {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedAdminRoute;

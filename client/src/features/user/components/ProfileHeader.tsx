import NavButton from '@/components/ui/buttons/NavButton';
import ActiveOrderHeader from '@/features/orders/components/ActiveOrderHeader';
import { User2 } from 'lucide-react';
import { useNavigate } from 'react-router';

interface IProfileHeaderProps {
  user: {
    name: string;
    email: string | null;
  };
}

const ProfileHeader = ({ user }: IProfileHeaderProps) => {
  const navigate = useNavigate();
  return (
    <div className="border-b border-border bg-surface">
      <div className="py-6">
        <NavButton onNavigate={() => navigate('/')}>
          Вернуться в магазин
        </NavButton>
        <div className="flex items-center gap-4">
          <div className="flex size-18 items-center justify-center rounded-full bg-primary">
            <User2 className="size-9 text-text-inverse" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-text-primary">
              {user.name}
            </h1>
            <p className="text-text-secondary">{user.email}</p>
          </div>
        </div>
      </div>
      <ActiveOrderHeader />
    </div>
  );
};

export default ProfileHeader;

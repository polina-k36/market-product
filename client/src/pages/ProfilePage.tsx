import { useUserProfile } from '@/features/auth/hooks/use-user-profile';
import OrderCardList from '@/features/orders/components/card/OrderCardList';
import ProfileHeader from '@/features/user/components/ProfileHeader';
import ProfileSettings from '@/features/user/components/ProfileSettings';
import ProfileTabs from '@/features/user/components/ProfileTabs';
import { useProfileMode } from '@/features/user/hooks/use-profile-mode';

const ProfilePage = () => {
  const { data: user } = useUserProfile();
  const { mode } = useProfileMode();
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <ProfileHeader
        user={{
          name: user?.name ?? '',
          email: user?.email ?? null,
        }}
      />
      <ProfileTabs />
      <div className="py-5">
        {mode === 'settings' && <ProfileSettings />}
        {mode === 'orders' && <OrderCardList />}
      </div>
    </div>
  );
};

export default ProfilePage;

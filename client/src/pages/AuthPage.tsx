import AuthForm from '@/features/auth/components/AuthForm';
import AuthBg from '@/assets/imgs/img-bg-auth.jpg';
import FullLogo from '@/components/ui/logo/FullLogo';

const AuthPage = () => {
  return (
    <div className="flex min-h-screen">
      <div className="relative hidden overflow-hidden lg:flex lg:w-1/2">
        <img
          src={AuthBg}
          alt="Fresh produce"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-br from-primary/80 via-primary-hover/70 to-primary-soft/50" />

        <div className="z-10 m-auto w-full pr-10 pl-10 text-text-inverse">
          <FullLogo variant="white" size="lg" />
          <h2 className="mt-4 text-4xl leading-snug font-bold">
            Свежие продукты
            <br />у вашего порога
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-white/70">
            Более 500 товаров. Доставка за 2 часа.
            <br />
            Бесплатно от 1000 ₽.
          </p>

          <div className="mt-10 grid grid-cols-3 gap-4">
            {[
              { val: '30+', label: 'Товаров' },
              { val: '2ч', label: 'Доставка' },
              { val: '4.9', label: 'Рейтинг' },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-2xl bg-white/10 p-4 text-center backdrop-blur-sm"
              >
                <p className="text-2xl font-bold">{s.val}</p>
                <p className="text-sm text-white/60">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <AuthForm />
    </div>
  );
};

export default AuthPage;

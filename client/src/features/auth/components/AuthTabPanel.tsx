interface IAuthTabPanelProps {
  mode: 'login' | 'register';
  onChangeMode: (mode: 'login' | 'register') => void;
}

const AuthTabPanel = ({ mode, onChangeMode }: IAuthTabPanelProps) => {
  return (
    <div className="mt-5 flex rounded-2xl bg-surface-muted p-1">
      <button
        onClick={() => onChangeMode('login')}
        className={`flex-1 cursor-pointer rounded-xl py-2.5 text-sm font-semibold transition-all ${
          mode === 'login'
            ? 'bg-surface text-text-primary shadow-sm'
            : 'text-text-muted hover:text-text-secondary'
        }`}
      >
        Войти
      </button>
      <button
        onClick={() => onChangeMode('register')}
        className={`flex-1 cursor-pointer rounded-xl py-2.5 text-sm font-semibold transition-all ${
          mode === 'register'
            ? 'bg-surface text-text-primary shadow-sm'
            : 'text-text-muted hover:text-text-secondary'
        }`}
      >
        Регистрация
      </button>
    </div>
  );
};

export default AuthTabPanel;

import Button from '@/components/ui/buttons/Button';
import ButtonIcon from '@/components/ui/buttons/ButtonIcon';
import { X, type LucideIcon } from 'lucide-react';
import { useEffect, useRef, type ReactNode } from 'react';

interface IHeaderProps {
  title: string;
  subtitle: string;
  icon: LucideIcon;
}

interface IFooterProps {
  btnSubmitTitle: string;
  btnSubmitIcon: LucideIcon;
  formId?: string;
}

interface IModalProps {
  size?: 'big' | 'medium' | 'small';
  header?: IHeaderProps;
  footer?: IFooterProps;
  children: ReactNode;
  padding?: string;
  isOpen?: boolean;
  onClose?: () => void;
}

const Modal = ({
  size = 'medium',
  children,
  header,
  footer,
  padding,
  isOpen = true,
  onClose,
}: IModalProps) => {
  const HeaderIcon = header?.icon;
  const BtnSubmitIcon = footer?.btnSubmitIcon;
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  //TODO: сделать закрытие на затемненный фон
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) dialog.showModal();
      document.body.style.overflow = 'hidden';
    } else {
      if (dialog.open) dialog.close();
      document.body.style.overflow = 'scroll';
    }
  }, [isOpen]);
  const sizes = {
    big: 'w-[calc(100%-2rem)] max-w-3xl',
    medium: 'w-[calc(100%-2rem)] max-w-2xl',
    small: 'w-[calc(100%-2rem)] max-w-xl',
  };

  return (
    <dialog
      id="modal"
      ref={dialogRef}
      aria-label="Модальное окно"
      className={`fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-border bg-surface p-0 text-text-primary shadow-xl backdrop-blur-xs backdrop:bg-black/30 ${sizes[size]}`}
    >
      <div className={padding ?? ''}>
        {header && (
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <div className="flex size-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500">
                {HeaderIcon && <HeaderIcon className="size-4" />}
              </div>
              <div>
                <h2 className="text-lg font-bold text-text-primary">
                  {header.title}
                </h2>
                <p className="mt-0.5 text-xs text-text-muted">
                  {header.subtitle}
                </p>
              </div>
            </div>
            <ButtonIcon
              variant="transparent"
              type="button"
              aria-label="Закрыть"
              onClick={onClose}
            >
              <X className="size-4" />
            </ButtonIcon>
          </div>
        )}

        {children}
        {footer && (
          <div className="mt-6 flex items-center justify-end gap-2 border-t border-border pt-5">
            <Button type="button" variant="transparent" onClick={onClose}>
              Отмена
            </Button>
            <Button type="submit" variant="primary" form={footer.formId}>
              {BtnSubmitIcon && <BtnSubmitIcon className="size-4" />}
              {footer.btnSubmitTitle}
            </Button>
          </div>
        )}
      </div>
    </dialog>
  );
};

export default Modal;

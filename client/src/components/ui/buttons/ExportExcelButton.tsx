import { useState } from 'react';
import { FileSpreadsheet } from 'lucide-react';

interface ExportExcelButtonProps {
  onExport: () => Promise<Blob>;
  fileName: string;
  label?: string;
}

const ExportExcelButton = ({
  onExport,
  fileName,
  label = 'Скачать Excel',
}: ExportExcelButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleExport = async () => {
    try {
      setIsLoading(true);

      const blob = await onExport();

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');

      link.href = url;
      link.download = fileName;

      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Ошибка при экспорте Excel:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleExport}
      disabled={isLoading}
      className="flex cursor-pointer items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
    >
      <FileSpreadsheet size={18} />

      {isLoading ? 'Формирование...' : label}
    </button>
  );
};

export default ExportExcelButton;

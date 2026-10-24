import { useState } from 'react';
import type { CSSProperties } from 'react';
import type { IAdminTableColumn } from './admin-table.types';
import { Pencil, Trash2, Search, Inbox } from 'lucide-react';

interface IAdminTableProps<T> {
  data: T[];
  columns: IAdminTableColumn<T>[];
  getRowId: (row: T) => string | number;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  horizontalScroll?: boolean;
  emptyMessage?: string;
  rowHeight?: 'compact' | 'normal';
}

function AdminTable<T>({
  data,
  columns,
  getRowId,
  onEdit,
  onDelete,
  searchValue,
  onSearchChange,
  searchPlaceholder = 'Поиск по таблице...',
  horizontalScroll = false,
  emptyMessage = 'Записи не найдены',
  rowHeight = 'normal',
}: IAdminTableProps<T>) {
  const [internalSearch, setInternalSearch] = useState('');
  const currentSearch = searchValue ?? internalSearch;
  const hasActions = Boolean(onEdit || onDelete);

  const handleSearchChange = (value: string) => {
    if (onSearchChange) {
      onSearchChange(value);
    } else {
      setInternalSearch(value);
    }
  };

  const filteredData = data.filter((row) => {
    const query = currentSearch.trim().toLocaleLowerCase();

    if (!query) return true;

    return columns.some((column) => {
      if (column.searchable === false) return false;

      const value = column.value
        ? column.value(row)
        : (row as Record<string, unknown>)[column.key];

      return String(value ?? '')
        .toLocaleLowerCase()
        .includes(query);
    });
  });

  const getWidthInPixels = (
    value: number | string | undefined,
    fallback: number,
  ) => {
    if (typeof value === 'number') return value;

    if (typeof value === 'string' && /^\d+(\.\d+)?px$/.test(value)) {
      return Number.parseFloat(value);
    }

    return fallback;
  };

  const minTableWidth = columns.reduce(
    (total, column) =>
      total +
      getWidthInPixels(column.minWidth, getWidthInPixels(column.width, 80)),
    hasActions ? 96 : 0,
  );

  const getColumnStyle = (column: IAdminTableColumn<T>): CSSProperties => ({
    width: column.width,
    minWidth: column.minWidth,
    maxWidth: column.maxWidth,
    textAlign: column.align ?? 'left',
  });

  const getCellContent = (row: T, column: IAdminTableColumn<T>) => {
    if (column.render) return column.render(row);

    const value = column.value
      ? column.value(row)
      : (row as Record<string, unknown>)[column.key];

    if (value === null || value === undefined || value === '') {
      return '—';
    }

    if (column.maxLines) {
      return (
        <div
          className="wrap-break-words overflow-hidden"
          style={{
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: column.maxLines,
          }}
          title={String(value)}
        >
          {String(value)}
        </div>
      );
    }

    return String(value);
  };

  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-4 overflow-hidden">
      <div className="relative w-full shrink-0 sm:max-w-sm">
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-text-muted" />
        <input
          type="search"
          value={currentSearch}
          onChange={(event) => handleSearchChange(event.target.value)}
          placeholder={searchPlaceholder}
          className="w-full rounded-xl border border-border bg-surface py-2.5 pr-3 pl-9 text-sm text-text-primary transition outline-none placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/15"
        />
      </div>

      <div className="small-custom-scrollbar min-h-0 w-full max-w-full min-w-0 flex-1 overflow-auto rounded-xl border border-border">
        <table
          className="w-full table-fixed border-collapse text-left text-sm"
          style={{
            minWidth: horizontalScroll ? minTableWidth : undefined,
          }}
        >
          <colgroup>
            {columns.map((column) => (
              <col
                key={column.key}
                style={{
                  width: column.width,
                  minWidth: column.minWidth,
                  maxWidth: column.maxWidth,
                }}
              />
            ))}
            {hasActions && <col style={{ width: 96 }} />}
          </colgroup>

          <thead className="sticky top-0 z-10 bg-surface-muted">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`border-b border-border px-2 font-semibold text-text-secondary sm:px-3 ${
                    rowHeight === 'compact' ? 'py-2' : 'py-3'
                  } ${column.className ?? ''}`}
                  style={getColumnStyle(column)}
                >
                  <span className="wrap-break-words block">{column.title}</span>
                </th>
              ))}

              {hasActions && (
                <th
                  className="sticky right-0 z-20 w-24 border-b border-l border-border bg-surface-muted px-1 py-3 text-center font-semibold text-text-secondary shadow-[-6px_0_10px_-8px_rgba(0,0,0,0.25)] sm:px-2"
                  style={{ minWidth: 96, width: 96 }}
                >
                  Действия
                </th>
              )}
            </tr>
          </thead>

          <tbody className="divide-y divide-border">
            {filteredData.map((row) => (
              <tr
                key={getRowId(row)}
                className="transition-colors hover:bg-surface-muted/60"
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={`overflow-hidden px-2 text-text-primary sm:px-3 ${
                      rowHeight === 'compact' ? 'py-2' : 'py-3'
                    } ${column.className ?? ''}`}
                    style={getColumnStyle(column)}
                  >
                    {getCellContent(row, column)}
                  </td>
                ))}

                {hasActions && (
                  <td
                    className="sticky right-0 z-5 border-l border-border bg-surface px-1 py-2 shadow-[-6px_0_10px_-8px_rgba(0,0,0,0.25)] sm:px-2"
                    style={{ minWidth: 96, width: 96 }}
                  >
                    <div className="flex items-center justify-center gap-1">
                      {onEdit && (
                        <button
                          type="button"
                          onClick={() => onEdit(row)}
                          aria-label="Редактировать"
                          className="cursor-pointer rounded-lg p-2 text-text-secondary transition hover:bg-primary-soft hover:text-primary"
                        >
                          <Pencil size={16} />
                        </button>
                      )}

                      {onDelete && (
                        <button
                          type="button"
                          onClick={() => onDelete(row)}
                          aria-label="Удалить"
                          className="cursor-pointer rounded-lg p-2 text-text-secondary transition hover:bg-danger/10 hover:text-danger"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}

            {filteredData.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length + Number(hasActions)}
                  className="px-4 py-12 text-center"
                >
                  <div className="flex flex-col items-center gap-2 text-text-muted">
                    <Inbox size={30} strokeWidth={1.5} />
                    <span className="text-sm">{emptyMessage}</span>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="shrink-0 text-xs text-text-muted">
        Показано: {filteredData.length} из {data.length}
      </div>
    </div>
  );
}

export default AdminTable;

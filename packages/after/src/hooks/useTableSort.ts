import { useState, useMemo } from 'react';

interface UseTableSortOptions<T> {
  data: T[];
  enabled?: boolean;
}

interface UseTableSortReturn<T> {
  sortedData: T[];
  sortColumn: string | null;
  sortDirection: 'asc' | 'desc';
  handleSort: (columnKey: string) => void;
}

export function useTableSort<T = unknown>({
  data,
  enabled = true,
}: UseTableSortOptions<T>): UseTableSortReturn<T> {
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const sortedData = useMemo(() => {
    if (!enabled || !sortColumn) {
      return data;
    }

    return [...data].sort((a, b) => {
      const aVal = (a as Record<string, unknown>)[sortColumn];
      const bVal = (b as Record<string, unknown>)[sortColumn];

      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
      }

      return sortDirection === 'asc'
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });
  }, [data, sortColumn, sortDirection, enabled]);

  const handleSort = (columnKey: string) => {
    if (!enabled) return;

    const newDirection = sortColumn === columnKey && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortColumn(columnKey);
    setSortDirection(newDirection);
  };

  return {
    sortedData,
    sortColumn,
    sortDirection,
    handleSort,
  };
}


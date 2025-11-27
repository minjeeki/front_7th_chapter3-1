import React, { useState, useMemo } from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '../ui/table';
import { Search } from '../molecules/Search';
import { Pagination } from '../molecules/Pagination';
import { useTableSort } from '../../hooks/useTableSort';

interface Column {
  key: string;
  header: string;
  width?: string;
  sortable?: boolean;
}

interface TableContainerProps<T = unknown> {
  columns: Column[];
  data: T[];
  renderCell?: (row: T, columnKey: string) => React.ReactNode;
  striped?: boolean;
  hover?: boolean;
  searchable?: boolean;
  sortable?: boolean;
  pageSize?: number;
  onRowClick?: (row: T) => void;
}

export const TableContainer = <T = unknown>({
  columns,
  data,
  renderCell,
  striped = false,
  hover = false,
  searchable = false,
  sortable = false,
  pageSize = 10,
  onRowClick,
}: TableContainerProps<T>) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // 검색 필터링
  const filteredData = useMemo(() => {
    if (!searchable || !searchTerm) {
      return data;
    }

    return data.filter((row) =>
      Object.values(row as Record<string, unknown>).some((val) =>
        String(val).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [data, searchTerm, searchable]);

  // 정렬
  const { sortedData, sortColumn, sortDirection, handleSort } = useTableSort({
    data: filteredData,
    enabled: sortable,
  });

  // 페이지네이션
  const totalPages = Math.ceil(sortedData.length / pageSize);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // 검색어 변경 시 첫 페이지로 리셋
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const getCellContent = (row: T, columnKey: string): React.ReactNode => {
    if (renderCell) {
      return renderCell(row, columnKey);
    }

    const value = row[columnKey as keyof T];
    if (React.isValidElement(value)) {
      return value;
    }

    return value as React.ReactNode;
  };

  const tableRowClasses = [
    hover && 'cursor-pointer',
    striped && 'even:bg-muted/50',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="table-container">
      {searchable && (
        <Search value={searchTerm} onChange={setSearchTerm} />
      )}

      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead
                key={column.key}
                style={column.width ? { width: column.width } : undefined}
                onClick={() => sortable && handleSort(column.key)}
                className={sortable ? 'cursor-pointer select-none' : ''}
              >
                <div className="flex items-center gap-1">
                  {column.header}
                  {sortable && sortColumn === column.key && (
                    <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>
                  )}
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center py-8 text-muted-foreground">
                데이터가 없습니다
              </TableCell>
            </TableRow>
          ) : (
            paginatedData.map((row, rowIndex) => (
              <TableRow
                key={rowIndex}
                onClick={() => onRowClick?.(row)}
                className={tableRowClasses}
              >
                {columns.map((column) => (
                  <TableCell key={column.key}>
                    {getCellContent(row, column.key)}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};


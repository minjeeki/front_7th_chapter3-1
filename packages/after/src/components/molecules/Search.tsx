import React from 'react';
import { Input } from '../ui/input';

interface SearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const Search: React.FC<SearchProps> = ({
  value,
  onChange,
  placeholder = '검색...',
  className,
}) => {
  return (
    <div className={className || 'mb-4'}>
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-[300px]"
      />
    </div>
  );
};


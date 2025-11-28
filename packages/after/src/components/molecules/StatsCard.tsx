import React from 'react';
import { Card, CardContent } from '../ui/card';
import { cn } from '@/lib/utils';

interface StatItem {
  label: string;
  value: number | string;
}

interface StatsCardProps {
  label: string;
  value: number | string;
  variant?: 'blue' | 'green' | 'orange' | 'red' | 'gray';
  className?: string;
}

const variantCardStyles = {
  blue: 'bg-blue-50 border-blue-300',
  green: 'bg-green-50 border-green-300',
  orange: 'bg-orange-50 border-orange-300',
  red: 'bg-red-50 border-red-300',
  gray: 'bg-gray-50 border-gray-300',
};

const variantTextStyles = {
  blue: 'text-blue-700',
  green: 'text-green-700',
  orange: 'text-orange-700',
  red: 'text-red-700',
  gray: 'text-gray-700',
};

export const StatsCard: React.FC<StatsCardProps> = ({
  label,
  value,
  variant = 'blue',
  className,
}) => {
  return (
    <Card className={cn(variantCardStyles[variant], className)}>
      <CardContent className="py-3">
        <div className="text-xs text-gray-600 mb-1">{label}</div>
        <div className={cn('text-2xl font-bold', variantTextStyles[variant])}>
          {value}
        </div>
      </CardContent>
    </Card>
  );
};

interface StatsGridProps {
  stats: StatItem[];
  variantOrder?: Array<'blue' | 'green' | 'orange' | 'red' | 'gray'>;
  className?: string;
}

export const StatsGrid: React.FC<StatsGridProps> = ({
  stats,
  variantOrder = ['blue', 'green', 'orange', 'red', 'gray'],
  className,
}) => {
  return (
    <div className={cn('grid grid-cols-[repeat(auto-fit,minmax(130px,1fr))] gap-2.5 mb-4', className)}>
      {stats.map((stat, index) => (
        <StatsCard
          key={stat.label}
          label={stat.label}
          value={stat.value}
          variant={variantOrder[index % variantOrder.length]}
        />
      ))}
    </div>
  );
};


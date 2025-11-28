import React from 'react';
import type { User } from '../../domains/user/types';
import { calculateUserStats } from '../../domains/user/mappers';
import { StatsGrid } from '../molecules/StatsCard';

interface UserStatsProps {
  users: User[];
}

export const UserStats: React.FC<UserStatsProps> = ({ users }) => {
  const stats = calculateUserStats(users);

  const statItems = [
    { label: '전체', value: stats.total },
    { label: stats.stat1.label, value: stats.stat1.value },
    { label: stats.stat2.label, value: stats.stat2.value },
    { label: stats.stat3.label, value: stats.stat3.value },
    { label: stats.stat4.label, value: stats.stat4.value },
  ];

  return <StatsGrid stats={statItems} variantOrder={['blue', 'green', 'orange', 'red', 'gray']} />;
};


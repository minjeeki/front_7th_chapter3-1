import React from 'react';
import type { Post } from '../../domains/post/types';
import { calculatePostStats } from '../../domains/post/mappers';
import { StatsGrid } from '../molecules/StatsCard';

interface PostStatsProps {
  posts: Post[];
}

export const PostStats: React.FC<PostStatsProps> = ({ posts }) => {
  const stats = calculatePostStats(posts);

  const statItems = [
    { label: '전체', value: stats.total },
    { label: stats.stat1.label, value: stats.stat1.value },
    { label: stats.stat2.label, value: stats.stat2.value },
    { label: stats.stat3.label, value: stats.stat3.value },
    { label: stats.stat4.label, value: stats.stat4.value },
  ];

  return <StatsGrid stats={statItems} variantOrder={['blue', 'green', 'orange', 'red', 'blue']} />;
};


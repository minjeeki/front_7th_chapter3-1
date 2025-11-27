import React from 'react';
import type { Post } from '../../../domains/post/types';
import { calculatePostStats } from '../../../domains/post/mappers';
import { Card, CardContent } from '../../../components/ui/card';

interface PostStatsProps {
  posts: Post[];
}

export const PostStats: React.FC<PostStatsProps> = ({ posts }) => {
  const stats = calculatePostStats(posts);

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(130px,1fr))] gap-2.5 mb-4">
      <Card className="bg-blue-50 border-blue-300">
        <CardContent className="py-3">
          <div className="text-xs text-gray-600 mb-1">전체</div>
          <div className="text-2xl font-bold text-blue-700">{stats.total}</div>
        </CardContent>
      </Card>

      <Card className="bg-green-50 border-green-300">
        <CardContent className="py-3">
          <div className="text-xs text-gray-600 mb-1">{stats.stat1.label}</div>
          <div className="text-2xl font-bold text-green-700">{stats.stat1.value}</div>
        </CardContent>
      </Card>

      <Card className="bg-orange-50 border-orange-300">
        <CardContent className="py-3">
          <div className="text-xs text-gray-600 mb-1">{stats.stat2.label}</div>
          <div className="text-2xl font-bold text-orange-700">{stats.stat2.value}</div>
        </CardContent>
      </Card>

      <Card className="bg-red-50 border-red-300">
        <CardContent className="py-3">
          <div className="text-xs text-gray-600 mb-1">{stats.stat3.label}</div>
          <div className="text-2xl font-bold text-red-700">{stats.stat3.value}</div>
        </CardContent>
      </Card>

      <Card className="bg-blue-50 border-blue-300">
        <CardContent className="py-3">
          <div className="text-xs text-gray-600 mb-1">{stats.stat4.label}</div>
          <div className="text-2xl font-bold text-blue-700">{stats.stat4.value}</div>
        </CardContent>
      </Card>
    </div>
  );
};


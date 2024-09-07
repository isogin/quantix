import React from 'react';
import { Typography } from '@mui/material';

interface StatsDisplayProps {
  xMedian: number | null;
  yMedian: number | null;
  xMean: number | null;
  yMean: number | null;
  xVariance: number | null;
  yVariance: number | null;
  correlation: number | null;
}

const StatsDisplay: React.FC<StatsDisplayProps> = ({
  xMedian,
  yMedian,
  xMean,
  yMean,
  xVariance,
  yVariance,
  correlation
}) => (
  <div className="mt-4">
    {xMedian !== null && <Typography variant="body1">X軸の中央値: {xMedian}</Typography>}
    {yMedian !== null && <Typography variant="body1">Y軸の中央値: {yMedian}</Typography>}
    {xMean !== null && <Typography variant="body1">X軸の平均値: {xMean}</Typography>}
    {yMean !== null && <Typography variant="body1">Y軸の平均値: {yMean}</Typography>}
    {xVariance !== null && <Typography variant="body1">X軸の分散: {xVariance}</Typography>}
    {yVariance !== null && <Typography variant="body1">Y軸の分散: {yVariance}</Typography>}
    {correlation !== null && <Typography variant="body1">相関係数: {correlation}</Typography>}
  </div>
);

export default StatsDisplay;

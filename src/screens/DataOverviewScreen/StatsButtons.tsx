import React from 'react';
import { Button, Grid } from '@mui/material';
import { StudentData } from './types';

interface StatsButtonsProps {
  xAxis: string;
  yAxis: string[];
  studentData: StudentData[];
  setXMedian: (value: number | null) => void;
  setYMedian: (value: number | null) => void;
  setXMean: (value: number | null) => void;
  setYMean: (value: number | null) => void;
  setXVariance: (value: number | null) => void;
  setYVariance: (value: number | null) => void;
  setCorrelation: (value: number | null) => void;
}

const StatsButtons: React.FC<StatsButtonsProps> = ({
  xAxis,
  yAxis,
  studentData,
  setXMedian,
  setYMedian,
  setXMean,
  setYMean,
  setXVariance,
  setYVariance,
  setCorrelation,
}) => {

  const calculateMedian = (values: number[]) => {
    const sorted = values.sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
  };

  const calculateMean = (values: number[]) => values.reduce((a, b) => a + b, 0) / values.length;

  const calculateVariance = (values: number[]) => {
    const mean = calculateMean(values);
    return values.reduce((sum, val) => sum + (val - mean) ** 2, 0) / values.length;
  };

  const calculateCorrelation = (x: number[], y: number[]) => {
    const n = x.length;
    const sumX = x.reduce((a, b) => a + b, 0);
    const sumY = y.reduce((a, b) => a + b, 0);
    const sumXY = x.reduce((acc, val, i) => acc + val * y[i], 0);
    const sumX2 = x.reduce((acc, val) => acc + val * val, 0);
    const sumY2 = y.reduce((acc, val) => acc + val * val, 0);
    const numerator = n * sumXY - sumX * sumY;
    const denominator = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));
    return numerator / denominator;
  };

  const handleXStats = () => {
    const xValues = studentData.map((student) => student[xAxis as keyof StudentData] as number);
    setXMedian(calculateMedian(xValues));
    setXMean(calculateMean(xValues));
    setXVariance(calculateVariance(xValues));
  };

  const handleYStats = () => {
    yAxis.forEach((y) => {
      const yValues = studentData.map((student) => student[y as keyof StudentData] as number);
      setYMedian(calculateMedian(yValues));
      setYMean(calculateMean(yValues));
      setYVariance(calculateVariance(yValues));
    });
  };

  const handleCorrelation = () => {
    if (yAxis.length > 0) {
      const xValues = studentData.map((student) => student[xAxis as keyof StudentData] as number);
      const yValues = studentData.map((student) => student[yAxis[0] as keyof StudentData] as number);
      setCorrelation(calculateCorrelation(xValues, yValues));
    }
  };

  return (
    <div className="mt-4">
      <Grid container spacing={2}>
        <Grid item>
          <Button variant="outlined" onClick={handleXStats}>X軸の統計を計算</Button>
        </Grid>
        <Grid item>
          <Button variant="outlined" onClick={handleYStats}>Y軸の統計を計算</Button>
        </Grid>
        <Grid item>
          <Button variant="outlined" onClick={handleCorrelation}>相関係数を計算</Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default StatsButtons;

import React from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

interface FrequencyTableProps {
  title: string;
  axis: string[];
  studentData: number[];
}

// 度数分布を範囲で表示するロジック
const calculateFrequency = (data: number[], numBins: number = 10) => {
  const filteredData = data.filter((value) => !isNaN(value) && value !== null && value !== undefined); // 無効なデータを除外
  const min = Math.min(...filteredData);
  const max = Math.max(...filteredData);
  const binSize = (max - min) / numBins;

  const bins = Array(numBins).fill(0);
  filteredData.forEach((value) => {
    const binIndex = Math.min(Math.floor((value - min) / binSize), numBins - 1);
    bins[binIndex]++;
  });

  return bins.map((count, i) => ({
    binRange: `${Math.round(min + i * binSize)} - ${Math.round(min + (i + 1) * binSize)}`,
    count,
  }));
};

const FrequencyTable: React.FC<FrequencyTableProps> = ({ title, axis, studentData }) => {
  // 度数分布を計算
  const frequencyData = calculateFrequency(studentData);

  return (
    <div>
      <Typography variant="h6" className="text-gray-800 font-bold">{title} - {axis.join(', ')}</Typography>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>範囲</TableCell>
              <TableCell align="right">度数</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {frequencyData.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.binRange}</TableCell>
                <TableCell align="right">{row.count}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default FrequencyTable;

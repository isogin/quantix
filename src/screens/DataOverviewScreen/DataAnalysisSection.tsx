import React, { useState } from 'react';
import { Typography, Grid, Paper, IconButton, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import { StudentData } from './types';

interface DataAnalysisSectionProps {
  show: boolean;
  setShow: (value: boolean) => void;
  studentData: StudentData[];
}

const selectableOptions = [
  { label: '前学期の成績', value: 'Last Semester Score' },
  { label: '今学期の成績', value: 'Current Semester Score' },
  { label: '出席率', value: 'Attendance Rate' },
  { label: '宿題提出率', value: 'Homework Submission Rate' },
  { label: '平日の学習時間', value: 'Weekday Study Hours' },
  { label: '週末の学習時間', value: 'Weekend Study Hours' },
  { label: '授業理解度', value: 'Class Understanding' },
  { label: '成績の変化(今学期-前学期)', value: 'GradeDifference' }
];

const DataAnalysisSection: React.FC<DataAnalysisSectionProps> = ({ show, setShow, studentData }) => {
  const [selectedStatData, setSelectedStatData] = useState<string>(''); // 統計計算用の選択データ
  const [selectedCorrelationData1, setSelectedCorrelationData1] = useState<string>(''); // 相関用の1つ目のデータ
  const [selectedCorrelationData2, setSelectedCorrelationData2] = useState<string>(''); // 相関用の2つ目のデータ

  // 統計値を計算する関数
  const calculateStatistics = (dataKey: string) => {
    const data = studentData.map((student) => student[dataKey as keyof StudentData]);
    const validData = data.filter(value => value !== undefined && value !== null);

    const mean = validData.reduce((sum, val) => sum + val, 0) / validData.length;
    const sortedData = [...validData].sort((a, b) => a - b);
    const median = sortedData[Math.floor(validData.length / 2)];
    const variance = validData.reduce((sum, val) => sum + (val - mean) ** 2, 0) / validData.length;

    return { mean, median, variance };
  };

  // 相関係数を計算する関数
  const calculateCorrelation = (key1: string, key2: string) => {
    const data1 = studentData.map((student) => student[key1 as keyof StudentData]);
    const data2 = studentData.map((student) => student[key2 as keyof StudentData]);

    const validData = data1
      .map((val, index) => ({ val1: val, val2: data2[index] }))
      .filter(({ val1, val2 }) => val1 !== undefined && val1 !== null && val2 !== undefined && val2 !== null);

    const mean1 = validData.reduce((sum, { val1 }) => sum + val1, 0) / validData.length;
    const mean2 = validData.reduce((sum, { val2 }) => sum + val2, 0) / validData.length;

    const covariance = validData.reduce((sum, { val1, val2 }) => sum + (val1 - mean1) * (val2 - mean2), 0) / validData.length;
    const variance1 = validData.reduce((sum, { val1 }) => sum + (val1 - mean1) ** 2, 0) / validData.length;
    const variance2 = validData.reduce((sum, { val2 }) => sum + (val2 - mean2) ** 2, 0) / validData.length;

    const correlation = covariance / (Math.sqrt(variance1) * Math.sqrt(variance2));
    return correlation;
  };

  const stats = selectedStatData ? calculateStatistics(selectedStatData) : { mean: null, median: null, variance: null };
  const correlation = selectedCorrelationData1 && selectedCorrelationData2
    ? calculateCorrelation(selectedCorrelationData1, selectedCorrelationData2)
    : null;

  return (
    <>
      <Grid container alignItems="center" spacing={1}>
        <Grid item>
          <IconButton onClick={() => setShow(!show)}>
            {show ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </Grid>
        <Grid item>
          <Typography variant="h5" className="text-gray-800 font-bold">
            データ解析
          </Typography>
        </Grid>
      </Grid>

      {show && (
        <Paper elevation={3} className="p-4 mt-2">
          <Typography variant="body1">データを選択して統計と相関を表示します。</Typography>

          {/* 統計用データの選択 */}
          <FormControl fullWidth margin="normal">
            <InputLabel>統計用のデータを選択</InputLabel>
            <Select value={selectedStatData} onChange={(e) => setSelectedStatData(e.target.value as string)}>
              {selectableOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* 統計結果の表示 */}
          {selectedStatData && (
            <>
              <Typography variant="body1">平均値: {stats.mean}</Typography>
              <Typography variant="body1">中央値: {stats.median}</Typography>
              <Typography variant="body1">分散: {stats.variance}</Typography>
            </>
          )}

          {/* 相関用データ1の選択 */}
          <FormControl fullWidth margin="normal">
            <InputLabel>相関を計算する1つ目のデータを選択</InputLabel>
            <Select value={selectedCorrelationData1} onChange={(e) => setSelectedCorrelationData1(e.target.value as string)}>
              {selectableOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* 相関用データ2の選択 */}
          <FormControl fullWidth margin="normal">
            <InputLabel>相関を計算する2つ目のデータを選択</InputLabel>
            <Select value={selectedCorrelationData2} onChange={(e) => setSelectedCorrelationData2(e.target.value as string)}>
              {selectableOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* 相関係数の表示 */}
          {selectedCorrelationData1 && selectedCorrelationData2 && (
            <Typography variant="body1">相関係数: {correlation}</Typography>
          )}
        </Paper>
      )}
    </>
  );
};

export default DataAnalysisSection;

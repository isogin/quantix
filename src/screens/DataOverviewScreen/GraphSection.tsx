import React from 'react';
import { Typography, Paper, Grid, IconButton, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { Scatter } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend } from 'chart.js';
import { StudentData } from './types';
import { ExpandMore, ExpandLess } from '@mui/icons-material';

ChartJS.register(CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

interface GraphSectionProps {
  show: boolean;
  setShow: (value: boolean) => void;
  xAxis: string;
  setXAxis: (value: string) => void;
  yAxis: string[];
  setYAxis: (value: string[]) => void;
  studentData: StudentData[];
}

const selectableOptionsForYAxis = [
  { label: '前学期の成績', value: 'Last Semester Score' },
  { label: '今学期の成績', value: 'Current Semester Score' },
  { label: '出席率', value: 'Attendance Rate' },
  { label: '宿題提出率', value: 'Homework Submission Rate' },
  { label: '平日の学習時間', value: 'Weekday Study Hours' },
  { label: '週末の学習時間', value: 'Weekend Study Hours' },
  { label: '授業理解度', value: 'Class Understanding' }
];

const selectableOptionsForXAxis = [
  ...selectableOptionsForYAxis,
  { label: '生徒ごとの値', value: 'Student-wise' }
];

const GraphSection: React.FC<GraphSectionProps> = ({
  show,
  setShow,
  xAxis,
  setXAxis,
  yAxis,
  setYAxis,
  studentData,
}) => {
  const handleAddYAxis = () => {
    setYAxis([...yAxis, '']);
  };

  const handleRemoveYAxis = (index: number) => {
    const newYAxis = [...yAxis];
    newYAxis.splice(index, 1);
    setYAxis(newYAxis);
  };

  const handleYAxisChange = (event: any, index: number) => {
    const newYAxis = [...yAxis];
    newYAxis[index] = event.target.value as string;
    setYAxis(newYAxis);
  };

  const scatterChartData = {
    datasets: yAxis.map((yDataKey, index) => ({
      label: yDataKey,
      data: studentData.map((student, idx) => ({
        // X軸が「生徒ごとの値」の場合、インデックスを使う
        x: xAxis === 'Student-wise' ? idx + 1 : student[xAxis as keyof StudentData],
        y: student[yDataKey as keyof StudentData],
      })),
      backgroundColor: `hsl(${index * 60}, 70%, 50%)`,
    })),
  };

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
            グラフ
          </Typography>
        </Grid>
      </Grid>

      {show && (
        <Paper elevation={3} className="p-4 mt-2">
          <Typography variant="body1">データを選択してグラフを表示します</Typography>

          {/* X軸のデータ選択 */}
          <FormControl fullWidth margin="normal">
            <InputLabel>X軸のデータ</InputLabel>
            <Select value={xAxis} onChange={(event) => setXAxis(event.target.value as string)}>
              {selectableOptionsForXAxis.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Y軸のデータ選択 */}
          <Grid container spacing={2}>
            {yAxis.map((yData, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Y軸のデータ {index + 1}</InputLabel>
                  <Select value={yData} onChange={(event) => handleYAxisChange(event, index)}>
                    {selectableOptionsForYAxis.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {yAxis.length > 1 && (
                  <IconButton color="secondary" onClick={() => handleRemoveYAxis(index)}>
                    <RemoveCircleOutlineIcon />
                  </IconButton>
                )}
              </Grid>
            ))}

            <Grid item xs={12}>
              <IconButton color="primary" onClick={handleAddYAxis}>
                <AddCircleOutlineIcon />
              </IconButton>
            </Grid>
          </Grid>

          {/* グラフの表示 */}
          <Scatter data={scatterChartData} options={{ responsive: true }} />
        </Paper>
      )}
    </>
  );
};

export default GraphSection;

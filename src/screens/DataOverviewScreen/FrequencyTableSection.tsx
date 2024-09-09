import React from 'react';
import { Typography, Paper, Grid, IconButton, FormControl, InputLabel, Select, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import { StudentData } from './types';

interface FrequencyTableSectionProps {
  show: boolean;
  setShow: (value: boolean) => void;
  selectedData: string[];
  setSelectedData: (value: string[]) => void;
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
];

// 度数分布を計算する関数
const calculateFrequency = (data: number[], numBins: number = 10) => {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const binSize = (max - min) / numBins;
  
  const bins = Array(numBins).fill(0);
  data.forEach((value) => {
    const binIndex = Math.min(Math.floor((value - min) / binSize), numBins - 1);
    bins[binIndex]++;
  });

  return bins.map((count, i) => ({
    binRange: `${Math.round(min + i * binSize)} - ${Math.round(min + (i + 1) * binSize)}`,
    count,
  }));
};

const FrequencyTableSection: React.FC<FrequencyTableSectionProps> = ({
  show,
  setShow,
  selectedData,
  setSelectedData,
  studentData,
}) => {
  const handleAddData = () => {
    setSelectedData([...selectedData, '']);
  };

  const handleRemoveData = (index: number) => {
    const newData = [...selectedData];
    newData.splice(index, 1);
    setSelectedData(newData);
  };

  const handleDataChange = (event: any, index: number) => {
    const newData = [...selectedData];
    newData[index] = event.target.value as string;
    setSelectedData(newData);
  };

  // 選択されたデータの度数分布を計算
  const frequencyData = selectedData.map((dataKey) => {
    const selectedValues = studentData.map((student) => student[dataKey as keyof StudentData]);
    return calculateFrequency(selectedValues as number[]);
  });

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
            度数分布表
          </Typography>
        </Grid>
      </Grid>

      {show && (
        <Paper elevation={3} className="p-4 mt-2">
          <Typography variant="body1">データを選択してください</Typography>
          <Grid container spacing={2}>
            {selectedData.map((data, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <FormControl fullWidth margin="normal">
                  <InputLabel>データ選択</InputLabel>
                  <Select
                    value={data}
                    onChange={(event) => handleDataChange(event, index)}
                  >
                    {selectableOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {selectedData.length > 1 && (
                  <IconButton color="secondary" onClick={() => handleRemoveData(index)}>
                    <RemoveCircleOutlineIcon />
                  </IconButton>
                )}
              </Grid>
            ))}

            <Grid item xs={12}>
              <IconButton color="primary" onClick={handleAddData}>
                <AddCircleOutlineIcon />
              </IconButton>
            </Grid>
          </Grid>

          {/* 度数分布表を2列で表示 */}
          <Grid container spacing={2}>
            {frequencyData.map((freqData, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Typography variant="h6" className="mt-4">{`データ ${index + 1}`}</Typography>
                <TableContainer component={Paper}>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>範囲</TableCell>
                        <TableCell align="right">度数</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {freqData.map((row, i) => (
                        <TableRow key={i}>
                          <TableCell>{row.binRange}</TableCell>
                          <TableCell align="right">{row.count}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            ))}
          </Grid>
        </Paper>
      )}
    </>
  );
};

export default FrequencyTableSection;

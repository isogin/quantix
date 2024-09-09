import React, { useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem, IconButton, Box } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { SelectChangeEvent } from '@mui/material';

interface DataSelectionProps {
  axis: string[]; // X軸またはY軸のデータ
  setAxis: (value: string[]) => void;
  isXAxis: boolean; // X軸かY軸かを判断するフラグ
}

const selectableOptions = [
  { label: '前学期の成績', value: 'Last Semester Score' },
  { label: '今学期の成績', value: 'Current Semester Score' },
  { label: '出席率', value: 'Attendance Rate' },
  { label: '宿題提出率', value: 'Homework Submission Rate' },
  { label: '平日の学習時間', value: 'Weekday Study Hours' },
  { label: '週末の学習時間', value: 'Weekend Study Hours' },
  { label: '授業理解度', value: 'Class Understanding' },
  { label: '生徒ごとの値(生徒ID)', value: 'Student-wise' }
];

const DataSelection: React.FC<DataSelectionProps> = ({ axis, setAxis, isXAxis }) => {

  // 初期状態で一つの選択欄を表示
  useEffect(() => {
    if (axis.length === 0) {
      setAxis(['']);
    }
  }, [axis, setAxis]);

  const handleAxisChange = (event: SelectChangeEvent<string>, index: number) => {
    const newAxis = [...axis];
    newAxis[index] = event.target.value as string;
    setAxis(newAxis);
  };

  const handleAddAxis = () => {
    setAxis([...axis, '']);
  };

  const handleRemoveAxis = (index: number) => {
    const newAxis = [...axis];
    newAxis.splice(index, 1);
    setAxis(newAxis);
  };

  return (
    <>
      {axis.map((value, index) => (
        <Box key={index} display="flex" alignItems="center">
          <FormControl fullWidth margin="normal">
            <InputLabel id={`axis-label-${index}`}>{isXAxis ? 'X軸のデータ' : `Y軸のデータ ${index + 1}`}</InputLabel>
            <Select
              labelId={`axis-label-${index}`}
              value={value}
              onChange={(e) => handleAxisChange(e, index)}
            >
              {selectableOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Y軸の場合のみ、削除ボタンを表示 */}
          {!isXAxis && axis.length > 1 && (
            <IconButton color="secondary" onClick={() => handleRemoveAxis(index)}>
              <RemoveCircleOutlineIcon />
            </IconButton>
          )}
        </Box>
      ))}

      {/* Y軸の場合のみ、+ボタンを表示 */}
      {!isXAxis && (
        <Box textAlign="center" margin="normal">
          <IconButton color="primary" onClick={handleAddAxis}>
            <AddCircleOutlineIcon />
          </IconButton>
        </Box>
      )}
    </>
  );
};

export default DataSelection;

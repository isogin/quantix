import React, { useState, useEffect } from 'react';
import { Container, Button, Typography, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { usePapaParse } from 'react-papaparse';
import Graph from './Graph';
import DataSelection from './DataSelection';
import StatsButtons from './StatsButtons';
import StatsDisplay from './StatsDisplay';
import FrequencyTable from './FrequencyTable';
import { StudentData } from './types';

const DataOverviewScreen: React.FC = () => {
  const navigate = useNavigate();
  const [studentData, setStudentData] = useState<StudentData[]>([]);
  const [xAxis, setXAxis] = useState<string[]>([]); // X軸のデータ選択
  const [yAxis, setYAxis] = useState<string[]>([]); // Y軸のデータ選択
  const [xMedian, setXMedian] = useState<number | null>(null);
  const [yMedian, setYMedian] = useState<number | null>(null);
  const [xMean, setXMean] = useState<number | null>(null);
  const [yMean, setYMean] = useState<number | null>(null);
  const [xVariance, setXVariance] = useState<number | null>(null);
  const [yVariance, setYVariance] = useState<number | null>(null);
  const [correlation, setCorrelation] = useState<number | null>(null);
  const { readString } = usePapaParse();

  const parseCsvData = (csvData: string) => {
    readString<StudentData>(csvData, {
      header: true,
      dynamicTyping: true,
      complete: (results) => {
        setStudentData(results.data);
      },
    });
  };

  const fetchData = async () => {
    const response = await fetch('/data/students_data.csv');
    const text = await response.text();
    parseCsvData(text);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleNext = () => {
    navigate('/data-exploration');
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col justify-between">
      <header className="bg-blue-600 text-white p-4">
        <Typography variant="h4" className="text-center font-bold">
          QuantiX - データ概要
        </Typography>
      </header>

      <main className="flex-grow flex items-center justify-center">
        <Container maxWidth="lg" className="bg-white rounded-lg shadow-lg p-8">
          <Typography variant="h5" gutterBottom className="text-gray-800 font-bold">
            データ選択画面
          </Typography>

          {/* X軸のデータ選択 */}
          <DataSelection axis={xAxis} setAxis={setXAxis} isXAxis={true} />

          {/* Y軸のデータ選択 */}
          <DataSelection axis={yAxis} setAxis={setYAxis} isXAxis={false} />

          <Grid container spacing={2} className="mt-4">
            <Grid item xs={6}>
              {xAxis.length > 0 && (
                <FrequencyTable
                  title="X軸の度数分布"
                  axis={xAxis}  // X軸も string[] に変更
                  studentData={studentData.map((student) => student[xAxis[0] as keyof StudentData])}
                />
              )}
            </Grid>
            <Grid item xs={6}>
              {yAxis.length > 0 && (
                <FrequencyTable
                  title="Y軸の度数分布"
                  axis={yAxis}  // string[] 型をそのまま渡す
                  studentData={studentData.map((student) => student[yAxis[0] as keyof StudentData])}
                />
              )}
            </Grid>
          </Grid>

          <Graph studentData={studentData} xAxis={xAxis} yAxis={yAxis} />

          <StatsButtons
            xAxis={xAxis[0]} // X軸の最初のデータを使う
            yAxis={yAxis}
            studentData={studentData}
            setXMedian={setXMedian}
            setYMedian={setYMedian}
            setXMean={setXMean}
            setYMean={setYMean}
            setXVariance={setXVariance}
            setYVariance={setYVariance}
            setCorrelation={setCorrelation}
          />

          <StatsDisplay
            xMedian={xMedian}
            yMedian={yMedian}
            xMean={xMean}
            yMean={yMean}
            xVariance={xVariance}
            yVariance={yVariance}
            correlation={correlation}
          />

          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleNext}
            className="mt-6 bg-blue-500 hover:bg-blue-700"
          >
            次へ進む
          </Button>
        </Container>
      </main>

      <footer className="bg-blue-600 text-white text-center p-4">
        <Typography variant="body2">© 2024 QuantiX 成績分析アプリ</Typography>
      </footer>
    </div>
  );
};

export default DataOverviewScreen;

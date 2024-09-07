import React, { useState, useEffect } from 'react';
import { Container, Button, Typography, Grid, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { usePapaParse } from 'react-papaparse';
import Graph from './Graph';
import DataSelection from './DataSelection';
import StatsButtons from './StatsButtons';
import StatsDisplay from './StatsDisplay';
import FrequencyTable from './FrequencyTable';
import { StudentData } from './types';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const DataOverviewScreen: React.FC = () => {
  const navigate = useNavigate();
  const [studentData, setStudentData] = useState<StudentData[]>([]);

  // 各コンポーネントに個別のデータ選択状態を追加 (string[] 型で初期化)
  const [distributionXAxis, setDistributionXAxis] = useState<string[]>([]); // 度数分布表用のX軸データ
  const [distributionYAxis, setDistributionYAxis] = useState<string[]>([]); // 度数分布表用のY軸データ
  const [graphXAxis, setGraphXAxis] = useState<string[]>([]); // グラフ用のX軸データ
  const [graphYAxis, setGraphYAxis] = useState<string[]>([]); // グラフ用のY軸データ
  const [statsXAxis, setStatsXAxis] = useState<string[]>([]); // 統計用のX軸データ
  const [statsYAxis, setStatsYAxis] = useState<string[]>([]); // 統計用のY軸データ
  const [correlationXAxis, setCorrelationXAxis] = useState<string[]>([]); // 相関用のX軸データ
  const [correlationYAxis, setCorrelationYAxis] = useState<string[]>([]); // 相関用のY軸データ

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
    navigate('/answer');
  };

  // 戻るボタンの処理
  const handleBack = () => {
    navigate(-1); // 1つ前の画面に戻る
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col justify-between">
      {/* ヘッダー */}
      <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <IconButton color="inherit" onClick={handleBack}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" className="text-center font-bold flex-grow">
          QuantiX - データ分析
        </Typography>
      </header>

      <main className="flex-grow flex items-center justify-center">
        <Container maxWidth="lg" className="bg-white rounded-lg shadow-lg p-8">
          <Typography variant="h5" gutterBottom className="text-gray-800 font-bold">
            度数分布表
          </Typography>

          {/* 度数分布表用のデータ選択 */}
          <DataSelection 
            axis={distributionXAxis} 
            setAxis={setDistributionXAxis} 
            isXAxis={true} 
          />
          <DataSelection 
            axis={distributionYAxis} 
            setAxis={setDistributionYAxis} 
            isXAxis={false} 
          />

          <Grid container spacing={2} className="mt-4">
            <Grid item xs={6}>
              {distributionXAxis.length > 0 && (
                <FrequencyTable
                  title="X軸の度数分布"
                  axis={distributionXAxis}
                  studentData={studentData.map((student) => 
                    student[distributionXAxis[0] as keyof StudentData]
                  )}
                />
              )}
            </Grid>
            <Grid item xs={6}>
              {distributionYAxis.length > 0 && (
                <FrequencyTable
                  title="Y軸の度数分布"
                  axis={distributionYAxis}
                  studentData={studentData.map((student) => 
                    student[distributionYAxis[0] as keyof StudentData]
                  )}
                />
              )}
            </Grid>
          </Grid>

          <Typography variant="h5" gutterBottom className="text-gray-800 font-bold">
            グラフ表示
          </Typography>

          {/* グラフ用のデータ選択 */}
          <DataSelection 
            axis={graphXAxis} 
            setAxis={setGraphXAxis} 
            isXAxis={true} 
          />
          <DataSelection 
            axis={graphYAxis} 
            setAxis={setGraphYAxis} 
            isXAxis={false} 
          />

          <Graph studentData={studentData} xAxis={graphXAxis} yAxis={graphYAxis} />

          <Typography variant="h5" gutterBottom className="text-gray-800 font-bold">
            各種データ解析
          </Typography>

          {/* 統計用のデータ選択 */}
          <DataSelection 
            axis={statsXAxis} 
            setAxis={setStatsXAxis} 
            isXAxis={true} 
          />
          <DataSelection 
            axis={statsYAxis} 
            setAxis={setStatsYAxis} 
            isXAxis={false} 
          />

          <StatsButtons
            xAxis={statsXAxis[0]} // X軸の最初のデータを使う
            yAxis={statsYAxis} // Y軸の最初のデータを使う
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

          {/* 相関関数用のデータ選択 */}
          <DataSelection 
            axis={correlationXAxis} 
            setAxis={setCorrelationXAxis} 
            isXAxis={true} 
          />
          <DataSelection 
            axis={correlationYAxis} 
            setAxis={setCorrelationYAxis} 
            isXAxis={false} 
          />

          {/* 次へ進むボタン */}
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

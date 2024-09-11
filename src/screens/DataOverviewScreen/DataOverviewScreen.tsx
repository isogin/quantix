import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Paper, IconButton, Button } from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import GraphSection from './GraphSection';
import FrequencyTableSection from './FrequencyTableSection';
import DataAnalysisSection from './DataAnalysisSection';
import { StudentData } from './types'; // CSV データ用の型
import { usePapaParse } from 'react-papaparse'; // CSV解析用
import { Canvas } from '@react-three/fiber';
import RotatingWireframeCube from '../components/RotatingWireframeCube';
import DynamicGradientShape from '../components/DynamicGradientShape';

const DataOverviewScreen: React.FC = () => {
  const [showFrequencyTable, setShowFrequencyTable] = useState(false);
  const [showGraph, setShowGraph] = useState(false);
  const [showDataAnalysis, setShowDataAnalysis] = useState(false);

  const [studentData, setStudentData] = useState<StudentData[]>([]); // CSVデータを保持
  const [graphXAxis, setGraphXAxis] = useState<string>(''); // X軸のデータ選択
  const [graphYAxis, setGraphYAxis] = useState<string[]>(['']); // Y軸のデータ選択
  const [selectedData, setSelectedData] = useState<string[]>(['']); // 度数分布表に表示するデータの選択

  const { readString } = usePapaParse(); // CSV読み込み用のライブラリ
  const navigate = useNavigate();

  const handleNext = () => {
    navigate('/answer'); // データ選択画面に遷移
  };

  const handleBack = () => {
    navigate(-1); // 1つ前の画面に戻る
  };

  // CSVデータをパースして state にセットする関数
  const parseCsvData = (csvData: string) => {
    readString<StudentData>(csvData, {
      header: true,
      dynamicTyping: true,
      complete: (results) => {
        const filteredData = results.data.filter(student => {
          // すべてのカラムがnullまたはundefinedでないことを確認
          return Object.values(student).some(value => value !== null && value !== undefined);
        }).map(student => ({
          ...student,
          GradeDifference: student['Current Semester Score'] - student['Last Semester Score'], // 成績差を計算
        }));
  
        setStudentData(filteredData); // フィルタリング後のデータをセット
        console.log('Parsed and Filtered CSV Data:', filteredData);
      },
    });
  };

  // CSVデータを取得してパースする
  const fetchData = async () => {
    try {
      const response = await fetch('/data/students_data.csv');
      const text = await response.text();
      parseCsvData(text); // 取得したデータをパースして表示
    } catch (error) {
      console.error('Error fetching CSV data:', error);
    }
  };

  // コンポーネントがマウントされたときに CSV データを読み込む
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* ヘッダー */}
      <header className="bg-blue-600 text-white p-4 flex justify-between items-center z-10">
        <IconButton color="inherit" onClick={handleBack}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" className="text-center font-bold flex-grow">
          QuantiX - データ分析
        </Typography>
      </header>

      <main className="flex-grow flex items-center justify-center">
        <div className="absolute top-0 left-0 w-full h-full z-0">
          <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <DynamicGradientShape
              position={[-1.2,-1.75,3]}
              shapeType={1}
            />
            <DynamicGradientShape
              position={[1.5,1.75,1]}
              shapeType={2}
            />
            <DynamicGradientShape
              position={[1.25,-2,3]}
              shapeType={3}
            />
          </Canvas>
        </div>
        <Container maxWidth="lg" className="bg-white rounded-lg shadow-lg p-8 items-center z-10">
          {/* 度数分布表 */}
          <FrequencyTableSection
            show={showFrequencyTable}
            setShow={setShowFrequencyTable}
            studentData={studentData}
            selectedData={selectedData}  // 度数分布表用のデータ選択を渡す
            setSelectedData={setSelectedData}  // 選択されたデータをセットする関数
          />

          {/* グラフ表示 */}
          <GraphSection
            show={showGraph}
            setShow={setShowGraph}
            xAxis={graphXAxis}
            setXAxis={setGraphXAxis}
            yAxis={graphYAxis}
            setYAxis={setGraphYAxis}
            studentData={studentData}
          />

          {/* データ解析 */}
          <DataAnalysisSection
            show={showDataAnalysis}
            setShow={setShowDataAnalysis}
            studentData={studentData}
          />
          <div className='w-full flex items-center justify-center mt-8'>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleNext}
              className="bg-blue-500 hover:bg-blue-700"
            >
              次へ進む
            </Button>
          </div>
        </Container>
      </main>
    </div>
  );
};

export default DataOverviewScreen;

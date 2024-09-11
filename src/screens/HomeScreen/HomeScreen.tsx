// src/screens/HomeScreen.tsx
import React from 'react';
import { Container, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import RotatingWireframeCube from '../components/RotatingWireframeCube';

const HomeScreen: React.FC = () => {
  const navigate = useNavigate();

  const handleStartAnalysis = () => {
    navigate('/problem-setting');
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col justify-between relative">
      {/* ヘッダー */}
      <header className="bg-blue-600 text-white p-4 z-10 relative">
        <Typography variant="h4" className="text-center font-bold">
          QuantiX
        </Typography>
      </header>

      {/* メインコンテンツ */}
      <main className="flex-grow flex items-center justify-center z-10 relative">
        <div className="absolute top-0 left-0 w-full h-full -z-10">
          <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <RotatingWireframeCube
              position={[1.75,1.75,1]}
              shapeType={1}
            />
            <RotatingWireframeCube
              position={[-1.75,-1.5,3]}
              shapeType={2}
            />
            <RotatingWireframeCube
              position={[-1.25,1.75,3]}
              shapeType={3}
            />
          </Canvas>
        </div>
        <Container maxWidth="md" className="text-center bg-white rounded-lg shadow-lg p-10">
          <Typography variant="h4" gutterBottom className="mb-8 text-gray-800 font-bold">
            データ分析学習アプリ
          </Typography>
          <Typography variant="body1" className="mb-8 text-gray-600 text-lg">
            データを分析し、課題を解決しよう
            <br />
            {"このアプリは 問題 => データ分析 => 回答 の構成になっています"}
          </Typography>
          <div className='w-full flex items-center justify-center mt-8'>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleStartAnalysis}
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

export default HomeScreen;

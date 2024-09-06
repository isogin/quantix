// src/screens/HomeScreen.tsx

import React from 'react';
import { Container, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';  // useNavigateをインポート

const HomeScreen: React.FC = () => {
  const navigate = useNavigate();

  const handleStartAnalysis = () => {
    navigate('/problem-setting');  // クリックで問題設定画面に遷移
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col justify-between">
      {/* ヘッダー */}
      <header className="bg-blue-600 text-white p-4">
        <Typography variant="h4" className="text-center font-bold">
          QuantiX
        </Typography>
      </header>

      {/* メインコンテンツ */}
      <main className="flex-grow flex items-center justify-center">
        <Container maxWidth="md" className="text-center bg-white rounded-lg shadow-lg p-10">
          <Typography variant="h3" gutterBottom className="mb-8 text-gray-800 font-bold">
            成績分析アプリ
          </Typography>
          <Typography variant="body1" className="mb-8 text-gray-600 text-lg">
            データを使って成績低下の理由を分析し、解決策を見つけましょう。
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleStartAnalysis}  // クリックイベントで遷移
            className="text-lg font-semibold py-3 px-8 rounded-full shadow-md"
          >
            分析を始める
          </Button>
        </Container>
      </main>

      {/* フッター */}
      <footer className="bg-blue-600 text-white text-center p-4">
        <Typography variant="body2">
          © 2024 QuantiX 成績分析アプリ
        </Typography>
      </footer>
    </div>
  );
};

export default HomeScreen;

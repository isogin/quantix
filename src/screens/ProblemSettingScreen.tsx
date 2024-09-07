// src/screens/ProblemSettingScreen.tsx

import React from 'react';
import { Container, Button, Typography, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ProblemSettingScreen: React.FC = () => {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate('/data-overview'); // データ選択画面に遷移
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
          QuantiX - 問題
        </Typography>
      </header>

      {/* メインコンテンツ */}
      <main className="flex-grow flex items-center justify-center">
        <Container maxWidth="md" className="text-center bg-white rounded-lg shadow-lg p-8">
          <Typography variant="h5" gutterBottom className="text-gray-800 font-bold">
            課題: 数学の成績が低下しました
          </Typography>
          <Typography variant="body1" className="mb-8 text-gray-600">
            今学期、数学の平均成績が前学期よりも10点低下しました。<br />
            この原因を見つけ出し、改善策を提案しましょう。
          </Typography>
          <Typography variant="body2" className="mb-8 text-gray-500">
            分析の流れ: <br />
            データ探索 → 仮説設定 → 仮説検証 → 解決策提案
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleNext}
            className="bg-blue-500 hover:bg-blue-700"
          >
            次へ進む
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

export default ProblemSettingScreen;

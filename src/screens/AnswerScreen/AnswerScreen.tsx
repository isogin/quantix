// src/screens/AnswerScreen.tsx
import React, { useState } from 'react';
import { Container, Button, Typography, RadioGroup, FormControlLabel, Radio, Box, Paper, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import DynamicGradientShape from '../components/DynamicGradientShape';

interface Question {
  question: string;
  options: string[];
  correctAnswer: number; // 正解のインデックス
  explanations: string[]; // 各選択肢に対する解説
}

const AnswerScreen: React.FC = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  // シナリオに基づくサンプル問題
  const question: Question = {
    question: "成績の低下に最も影響を与えた要因はどれですか？",
    options: ["出席率", "宿題提出率", "平日の学習時間", "週末の学習時間"],
    correctAnswer: 3, // 正解は「週末の学習時間」
    explanations: [
      "出席率も成績に影響するが、今回のデータでは直接的な関連性が見られませんでした。",
      "宿題提出率も重要な要素ですが、今回のデータでは他の要因と比べて影響が少ないです。",
      "平日の学習時間は重要ですが、週末に学んだ内容の復習が成績向上に効果的です。",
      "週末の学習時間が成績に最も大きな影響を与えました。復習によって理解度が深まるためです。",
    ],
  };

  // 回答選択処理
  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(Number(event.target.value));
  };

  // 戻るボタンの処理
  const handleBack = () => {
    navigate(-1); // 1つ前の画面に戻る
  };

  // 回答を確認する処理
  const checkAnswer = () => {
    setShowFeedback(true);
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col justify-between">
      {/* ヘッダー */}
      <header className="bg-blue-600 text-white p-4 flex justify-between items-center z-10">
        <IconButton color="inherit" onClick={handleBack}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" className="text-center font-bold flex-grow">
          QuantiX - 回答
        </Typography>
      </header>

      {/* メインコンテンツ */}
      <main className="flex-grow flex items-center justify-center">
        <div className="absolute top-0 left-0 w-full h-full z-0">
          <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <DynamicGradientShape
              position={[2,-1,3]}
              shapeType={1}
            />
            <DynamicGradientShape
              position={[-1,2,3]}
              shapeType={3}
            />
            <DynamicGradientShape
              position={[-2,-2,3]}
              shapeType={5}
            />
          </Canvas>
        </div>
        <Container maxWidth="sm" className="bg-white rounded-lg shadow-lg p-8 mt-4 z-10">
          <Typography variant="h4" className="text-center font-bold mb-4" gutterBottom>
            {question.question}
          </Typography>

          <Paper elevation={3} className="p-4 mb-4">
            <RadioGroup value={selectedOption?.toString()} onChange={handleOptionChange}>
              {question.options.map((option, index) => (
                <FormControlLabel
                  key={index}
                  value={index.toString()}
                  control={<Radio color="primary" />}
                  label={<Typography variant="h6">{option}</Typography>}
                />
              ))}
            </RadioGroup>
          </Paper>

          {showFeedback && (
            <Paper elevation={6} className="p-4 mt-4">
              <Typography variant="h5" className={selectedOption === question.correctAnswer ? 'text-green-600' : 'text-red-600'} gutterBottom>
                {selectedOption === question.correctAnswer ? '正解です！' : '不正解です。'}
              </Typography>

              <Typography variant="body1" className="mt-2">
                {question.explanations[selectedOption ?? 0]} {/* 選択肢に対応した解説を表示 */}
              </Typography>
            </Paper>
          )}

          <Box textAlign="center" mt={4}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={checkAnswer}
              disabled={selectedOption === null} // 選択がないとボタンを無効化
              className="mt-4"
              style={{ minWidth: '200px' }}
            >
              回答を確認
            </Button>
          </Box>
        </Container>
      </main>

      {/* フッター */}
      <footer className="bg-blue-600 text-white text-center p-4 z-10">
        <Typography variant="body2">© 2024 QuantiX 成績分析アプリ</Typography>
      </footer>
    </div>
  );
};

export default AnswerScreen;

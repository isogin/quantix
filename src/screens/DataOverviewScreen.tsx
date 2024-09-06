// src/screens/DataOverviewScreen.tsx

import React from 'react';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const DataOverviewScreen: React.FC = () => {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate('/data-exploration'); // データ探索画面に遷移
  };

  // 仮のデータセット（成績、出席率、宿題提出率など）
  const data = [
    { id: 1, name: '生徒A', 成績: 80, 出席率: '90%', 宿題提出率: '95%', 学習時間: '2時間', 授業理解度: '良い' },
    { id: 2, name: '生徒B', 成績: 70, 出席率: '85%', 宿題提出率: '80%', 学習時間: '1.5時間', 授業理解度: '普通' },
    { id: 3, name: '生徒C', 成績: 60, 出席率: '75%', 宿題提出率: '70%', 学習時間: '1時間', 授業理解度: '普通' },
    // その他のデータ...
  ];

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col justify-between">
      {/* ヘッダー */}
      <header className="bg-blue-600 text-white p-4">
        <Typography variant="h4" className="text-center font-bold">
          QuantiX - データ概要
        </Typography>
      </header>

      {/* メインコンテンツ */}
      <main className="flex-grow flex items-center justify-center">
        <Container maxWidth="lg" className="bg-white rounded-lg shadow-lg p-8">
          <Typography variant="h5" gutterBottom className="text-gray-800 font-bold">
            データ選択画面
          </Typography>
          <Typography variant="body1" className="mb-6 text-gray-600">
            以下は成績、出席率、宿題提出率、学習時間、授業理解度のデータです。
            データを確認し、次に進んで分析を行いましょう。
          </Typography>

          {/* データをテーブルで表示 */}
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>生徒名</TableCell>
                  <TableCell align="right">成績</TableCell>
                  <TableCell align="right">出席率</TableCell>
                  <TableCell align="right">宿題提出率</TableCell>
                  <TableCell align="right">学習時間</TableCell>
                  <TableCell align="right">授業理解度</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">{row.name}</TableCell>
                    <TableCell align="right">{row.成績}</TableCell>
                    <TableCell align="right">{row.出席率}</TableCell>
                    <TableCell align="right">{row.宿題提出率}</TableCell>
                    <TableCell align="right">{row.学習時間}</TableCell>
                    <TableCell align="right">{row.授業理解度}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

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

      {/* フッター */}
      <footer className="bg-blue-600 text-white text-center p-4">
        <Typography variant="body2">
          © 2024 QuantiX 成績分析アプリ
        </Typography>
      </footer>
    </div>
  );
};

export default DataOverviewScreen;

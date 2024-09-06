// src/App.tsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProblemSettingScreen from './screens/ProblemSettingScreen';  // 問題設定画面をインポート

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* ルート "/" でホーム画面を表示 */}
        <Route path="/" element={<HomeScreen />} />
        {/* 問題設定画面へのルート */}
        <Route path="/problem-setting" element={<ProblemSettingScreen />} />
      </Routes>
    </Router>
  );
};

export default App;

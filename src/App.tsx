// src/App.tsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import ProblemSettingScreen from './screens/ProblemSettingScreen/ProblemSettingScreen';  // 問題設定画面をインポート
import DataOverviewScreen from './screens/DataOverviewScreen/DataOverviewScreen';
import AnswerScreen from './screens/AnswerScreen/AnswerScreen';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* ルート "/" でホーム画面を表示 */}
        <Route path="/" element={<HomeScreen />} />
        {/* 問題設定画面へのルート */}
        <Route path="/problem-setting" element={<ProblemSettingScreen />} />
        {/* データ選択画面へのルート */}
        <Route path="/data-overview" element={<DataOverviewScreen />} />
        {/* 回答画面へのルート */}
        <Route path="/answer" element={<AnswerScreen />} />
      </Routes>
    </Router>
  );
};

export default App;

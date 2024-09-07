import React from 'react';
import { Scatter } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { StudentData } from './types';

ChartJS.register(CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

interface GraphProps {
  studentData: StudentData[];
  xAxis: string[];  // 修正: X軸も複数選択可能
  yAxis: string[];  // 修正: Y軸も複数選択可能
}

const labelMapping: { [key: string]: string } = {
  "Last Semester Score": "前学期の成績",
  "Current Semester Score": "今学期の成績",
  "Attendance Rate": "出席率",
  "Homework Submission Rate": "宿題提出率",
  "Weekday Study Hours": "平日の学習時間",
  "Weekend Study Hours": "週末の学習時間",
  "Class Understanding": "授業理解度",
  "Student-wise": "生徒ごとの値"
};

const Graph: React.FC<GraphProps> = ({ studentData, xAxis, yAxis }) => {
  const scatterChartData = {
    labels: studentData.map((_, index) => `生徒 ${index + 1}`), // 生徒ごとの値の場合のラベル
    datasets: yAxis.map((axis, index) => ({
      label: `${labelMapping[xAxis[0]]} vs ${labelMapping[axis]}`,
      data: studentData.map((student, idx) => ({
        x: xAxis.includes('Student-wise') ? idx + 1 : student[xAxis[0] as keyof StudentData], // X軸に複数データも対応
        y: student[axis as keyof StudentData],
      })),
      backgroundColor: `rgba(${(index * 50) % 255}, ${(index * 100) % 255}, ${(index * 150) % 255}, 0.6)`,
    }))
  };

  return (
    <div className="mt-8">
      <Scatter data={scatterChartData} options={{ responsive: true }} />
    </div>
  );
};

export default Graph;

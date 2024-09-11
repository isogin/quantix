import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface RotatingWireframeCubeProps {
  position: [number, number, number];  // 描画する位置を指定
  shapeType: number;                   // 形状を指定
}

// 8色のカラーパレット
const colorPalette = [
  '#FF5733',  // 鮮やかなオレンジ
  '#33FF57',  // ライムグリーン
  '#3357FF',  // 鮮やかなブルー
  '#FF33A6',  // ピンク
  '#FFEB33',  // 黄色
  '#33FFEB',  // 水色
  '#C700FF',  // パープル
  '#FF8F33',  // 橙色
];

const RotatingWireframeCube: React.FC<RotatingWireframeCubeProps> = ({ position, shapeType }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [scale, setScale] = useState(1);  // 初期のスケール
  const [randomColor, setRandomColor] = useState<string>('#FFFFFF');  // 初期値を白に

  // コンポーネントがマウントされたときにランダムな色を設定
  useEffect(() => {
    setRandomColor(colorPalette[Math.floor(Math.random() * colorPalette.length)]);
  }, []);

  // 回転と大きさの変化を管理
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.001;
      meshRef.current.rotation.y += 0.001;

      // スケールの変更（0.5〜1.5の間で動的に変化）
      const newScale = 1 + Math.sin(Date.now() / 500) * 0.05;
      setScale(newScale);
      meshRef.current.scale.set(newScale, newScale, newScale);
    }
  });

  // 形状を選択
  const getGeometry = () => {
    switch (shapeType) {
      case 1:
        return <tetrahedronGeometry args={[1, 0]} />;  // 四面体
      case 2:
        return <boxGeometry args={[1, 1, 1]} />;  // キューブ型
      case 3:
        return <icosahedronGeometry args={[1, 0]} />;  // 二十面体
      default:
        return <boxGeometry args={[1, 1, 1]} />;  // デフォルトはキューブ型
    }
  };

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      {/* 選択した形状のジオメトリ */}
      {getGeometry()}
      {/* ランダムに選択された色のワイヤーフレーム */}
      <meshBasicMaterial wireframe color={randomColor} />
    </mesh>
  );
};

export default RotatingWireframeCube;

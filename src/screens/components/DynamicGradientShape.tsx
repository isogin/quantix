import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface DynamicGradientShapeProps {
  position: [number, number, number];
  shapeType: number;
}

const colorPalette = [
  '#FF5733', '#33FF57', '#3357FF', '#FF33A6', '#FFEB33',
  '#33FFEB', '#C700FF', '#FF8F33',
];

const DynamicGradientShape: React.FC<DynamicGradientShapeProps> = ({ position, shapeType }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [scale, setScale] = useState(1);
  const [randomColor1, setRandomColor1] = useState<string>('#FFFFFF');
  const [randomColor2, setRandomColor2] = useState<string>('#FFFFFF');

  const colorsAreDifferentEnough = (color1: THREE.Color, color2: THREE.Color, threshold: number) => {
    const distance = Math.sqrt(
      Math.pow(color1.r - color2.r, 2) +
      Math.pow(color1.g - color2.g, 2) +
      Math.pow(color1.b - color2.b, 2)
    );
    return distance > threshold;
  };

  useEffect(() => {
    const color1 = new THREE.Color(colorPalette[Math.floor(Math.random() * colorPalette.length)]);
    let color2 = new THREE.Color(colorPalette[Math.floor(Math.random() * colorPalette.length)]);
    
    const threshold = 0.5;
    while (!colorsAreDifferentEnough(color1, color2, threshold)) {
      color2 = new THREE.Color(colorPalette[Math.floor(Math.random() * colorPalette.length)]);
    }

    setRandomColor1(`#${color1.getHexString()}`);
    setRandomColor2(`#${color2.getHexString()}`);
  }, []);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.001;
      meshRef.current.rotation.y += 0.001;

      const newScale = 0.75 + Math.sin(Date.now() / 500) * 0.05;
      setScale(newScale);
      meshRef.current.scale.set(newScale, newScale, newScale);
    }
  });
  const getGeometry = () => {
    switch (shapeType) {
      case 1:
        return <cylinderGeometry args={[0.5, 0.5, 1, 32]} />; // 円柱
      case 2:
        return <sphereGeometry args={[1, 32, 32]} />; // 球体
      case 3:
        return <octahedronGeometry args={[1, 0]} />; // 八面体
      default:
        return <sphereGeometry args={[1, 32, 32]} />; // デフォルトは球体
    }
  };

  const shaderMaterial = new THREE.ShaderMaterial({
    uniforms: {
      color1: { value: new THREE.Color(randomColor1) },
      color2: { value: new THREE.Color(randomColor2) },
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 color1;
      uniform vec3 color2;
      varying vec2 vUv;
      void main() {
        gl_FragColor = vec4(mix(color1, color2, vUv.y), 1.0);
      }
    `,
  });

  return (
    <mesh ref={meshRef} position={position} scale={shapeType === 2 ? [1, 1.5, 1] : scale}>
      {getGeometry()}
      <primitive object={shaderMaterial} attach="material" />
    </mesh>
  );
};

export default DynamicGradientShape;

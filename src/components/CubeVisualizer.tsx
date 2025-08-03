import React from 'react';
import { CubeState, CubeColor } from '@/types/cube';

interface CubeVisualizerProps {
  cubeState: CubeState;
  rotation: { x: number; y: number };
  isAnimating?: boolean;
}

const CubeVisualizer: React.FC<CubeVisualizerProps> = ({ 
  cubeState, 
  rotation, 
  isAnimating = false 
}) => {
  const getStickerClass = (color: CubeColor) => {
    return `cube-sticker sticker-${color}`;
  };

  const renderFace = (face: CubeColor[][], faceClass: string) => (
    <div className={`cube-face ${faceClass}`}>
      {face.map((row, rowIndex) =>
        row.map((color, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className={getStickerClass(color)}
          />
        ))
      )}
    </div>
  );

  return (
    <div className="cube-container">
      <div 
        className={`cube ${isAnimating ? 'animate-pulse-glow' : ''}`}
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          width: '300px',
          height: '300px',
          margin: '0 auto'
        }}
      >
        {renderFace(cubeState.front, 'face-front')}
        {renderFace(cubeState.back, 'face-back')}
        {renderFace(cubeState.right, 'face-right')}
        {renderFace(cubeState.left, 'face-left')}
        {renderFace(cubeState.top, 'face-top')}
        {renderFace(cubeState.bottom, 'face-bottom')}
      </div>
    </div>
  );
};

export default CubeVisualizer;
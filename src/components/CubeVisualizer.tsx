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
    const colorClass = `cube-sticker sticker-${color}`;
    console.log('Applying color class:', colorClass, 'for color:', color);
    return colorClass;
  };

  const renderFace = (face: CubeColor[][], faceClass: string) => (
    <div className={`cube-face ${faceClass}`}>
      {face.map((row, rowIndex) =>
        row.map((color, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className={getStickerClass(color)}
            style={{ 
              backgroundColor: color === 'white' ? '#fafafa' : 
                              color === 'yellow' ? '#ffd700' :
                              color === 'orange' ? '#ff8c00' :
                              color === 'red' ? '#ff0000' :
                              color === 'green' ? '#00ff00' :
                              color === 'blue' ? '#0066ff' : '#333'
            }}
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
import { CubeState, CubeColor, Face, Move } from '@/types/cube';

// Create solved cube state
export const createSolvedCube = (): CubeState => ({
  front: [
    ['green', 'green', 'green'],
    ['green', 'green', 'green'],
    ['green', 'green', 'green']
  ],
  back: [
    ['blue', 'blue', 'blue'],
    ['blue', 'blue', 'blue'],
    ['blue', 'blue', 'blue']
  ],
  right: [
    ['red', 'red', 'red'],
    ['red', 'red', 'red'],
    ['red', 'red', 'red']
  ],
  left: [
    ['orange', 'orange', 'orange'],
    ['orange', 'orange', 'orange'],
    ['orange', 'orange', 'orange']
  ],
  top: [
    ['white', 'white', 'white'],
    ['white', 'white', 'white'],
    ['white', 'white', 'white']
  ],
  bottom: [
    ['yellow', 'yellow', 'yellow'],
    ['yellow', 'yellow', 'yellow'],
    ['yellow', 'yellow', 'yellow']
  ]
});

// Deep clone cube state
export const cloneCube = (cube: CubeState): CubeState => {
  return {
    front: cube.front.map(row => [...row]),
    back: cube.back.map(row => [...row]),
    right: cube.right.map(row => [...row]),
    left: cube.left.map(row => [...row]),
    top: cube.top.map(row => [...row]),
    bottom: cube.bottom.map(row => [...row])
  };
};

// Rotate a face 90 degrees clockwise
const rotateFaceClockwise = (face: Face): Face => {
  const n = face.length;
  const rotated: Face = Array(n).fill(null).map(() => Array(n).fill('white'));
  
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      rotated[j][n - 1 - i] = face[i][j];
    }
  }
  
  return rotated;
};

// Rotate a face 90 degrees counterclockwise
const rotateFaceCounterClockwise = (face: Face): Face => {
  const n = face.length;
  const rotated: Face = Array(n).fill(null).map(() => Array(n).fill('white'));
  
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      rotated[n - 1 - j][i] = face[i][j];
    }
  }
  
  return rotated;
};

// Apply a single move to the cube
export const applyMove = (cube: CubeState, move: Move): CubeState => {
  const newCube = cloneCube(cube);
  
  switch (move) {
    case 'R': // Right face clockwise
      newCube.right = rotateFaceClockwise(newCube.right);
      // Cycle the right column of adjacent faces
      const tempR = [newCube.front[0][2], newCube.front[1][2], newCube.front[2][2]];
      newCube.front[0][2] = newCube.bottom[0][2];
      newCube.front[1][2] = newCube.bottom[1][2];
      newCube.front[2][2] = newCube.bottom[2][2];
      newCube.bottom[0][2] = newCube.back[2][0];
      newCube.bottom[1][2] = newCube.back[1][0];
      newCube.bottom[2][2] = newCube.back[0][0];
      newCube.back[0][0] = newCube.top[2][2];
      newCube.back[1][0] = newCube.top[1][2];
      newCube.back[2][0] = newCube.top[0][2];
      newCube.top[0][2] = tempR[0];
      newCube.top[1][2] = tempR[1];
      newCube.top[2][2] = tempR[2];
      break;
      
    case "R'": // Right face counterclockwise
      newCube.right = rotateFaceCounterClockwise(newCube.right);
      const tempRPrime = [newCube.front[0][2], newCube.front[1][2], newCube.front[2][2]];
      newCube.front[0][2] = newCube.top[0][2];
      newCube.front[1][2] = newCube.top[1][2];
      newCube.front[2][2] = newCube.top[2][2];
      newCube.top[0][2] = newCube.back[2][0];
      newCube.top[1][2] = newCube.back[1][0];
      newCube.top[2][2] = newCube.back[0][0];
      newCube.back[0][0] = newCube.bottom[2][2];
      newCube.back[1][0] = newCube.bottom[1][2];
      newCube.back[2][0] = newCube.bottom[0][2];
      newCube.bottom[0][2] = tempRPrime[0];
      newCube.bottom[1][2] = tempRPrime[1];
      newCube.bottom[2][2] = tempRPrime[2];
      break;
      
    case 'L': // Left face clockwise
      newCube.left = rotateFaceClockwise(newCube.left);
      const tempL = [newCube.front[0][0], newCube.front[1][0], newCube.front[2][0]];
      newCube.front[0][0] = newCube.top[0][0];
      newCube.front[1][0] = newCube.top[1][0];
      newCube.front[2][0] = newCube.top[2][0];
      newCube.top[0][0] = newCube.back[2][2];
      newCube.top[1][0] = newCube.back[1][2];
      newCube.top[2][0] = newCube.back[0][2];
      newCube.back[0][2] = newCube.bottom[2][0];
      newCube.back[1][2] = newCube.bottom[1][0];
      newCube.back[2][2] = newCube.bottom[0][0];
      newCube.bottom[0][0] = tempL[0];
      newCube.bottom[1][0] = tempL[1];
      newCube.bottom[2][0] = tempL[2];
      break;
      
    case "L'": // Left face counterclockwise
      newCube.left = rotateFaceCounterClockwise(newCube.left);
      const tempLPrime = [newCube.front[0][0], newCube.front[1][0], newCube.front[2][0]];
      newCube.front[0][0] = newCube.bottom[0][0];
      newCube.front[1][0] = newCube.bottom[1][0];
      newCube.front[2][0] = newCube.bottom[2][0];
      newCube.bottom[0][0] = newCube.back[2][2];
      newCube.bottom[1][0] = newCube.back[1][2];
      newCube.bottom[2][0] = newCube.back[0][2];
      newCube.back[0][2] = newCube.top[2][0];
      newCube.back[1][2] = newCube.top[1][0];
      newCube.back[2][2] = newCube.top[0][0];
      newCube.top[0][0] = tempLPrime[0];
      newCube.top[1][0] = tempLPrime[1];
      newCube.top[2][0] = tempLPrime[2];
      break;
      
    case 'U': // Up face clockwise
      newCube.top = rotateFaceClockwise(newCube.top);
      const tempU = [...newCube.front[0]];
      newCube.front[0] = [...newCube.right[0]];
      newCube.right[0] = [...newCube.back[0]];
      newCube.back[0] = [...newCube.left[0]];
      newCube.left[0] = [...tempU];
      break;
      
    case "U'": // Up face counterclockwise
      newCube.top = rotateFaceCounterClockwise(newCube.top);
      const tempUPrime = [...newCube.front[0]];
      newCube.front[0] = [...newCube.left[0]];
      newCube.left[0] = [...newCube.back[0]];
      newCube.back[0] = [...newCube.right[0]];
      newCube.right[0] = [...tempUPrime];
      break;
      
    case 'D': // Down face clockwise
      newCube.bottom = rotateFaceClockwise(newCube.bottom);
      const tempD = [...newCube.front[2]];
      newCube.front[2] = [...newCube.left[2]];
      newCube.left[2] = [...newCube.back[2]];
      newCube.back[2] = [...newCube.right[2]];
      newCube.right[2] = [...tempD];
      break;
      
    case "D'": // Down face counterclockwise
      newCube.bottom = rotateFaceCounterClockwise(newCube.bottom);
      const tempDPrime = [...newCube.front[2]];
      newCube.front[2] = [...newCube.right[2]];
      newCube.right[2] = [...newCube.back[2]];
      newCube.back[2] = [...newCube.left[2]];
      newCube.left[2] = [...tempDPrime];
      break;
      
    case 'F': // Front face clockwise
      newCube.front = rotateFaceClockwise(newCube.front);
      const tempF = [newCube.top[2][0], newCube.top[2][1], newCube.top[2][2]];
      newCube.top[2][0] = newCube.left[2][2];
      newCube.top[2][1] = newCube.left[1][2];
      newCube.top[2][2] = newCube.left[0][2];
      newCube.left[0][2] = newCube.bottom[0][0];
      newCube.left[1][2] = newCube.bottom[0][1];
      newCube.left[2][2] = newCube.bottom[0][2];
      newCube.bottom[0][0] = newCube.right[2][0];
      newCube.bottom[0][1] = newCube.right[1][0];
      newCube.bottom[0][2] = newCube.right[0][0];
      newCube.right[0][0] = tempF[0];
      newCube.right[1][0] = tempF[1];
      newCube.right[2][0] = tempF[2];
      break;
      
    case "F'": // Front face counterclockwise
      newCube.front = rotateFaceCounterClockwise(newCube.front);
      const tempFPrime = [newCube.top[2][0], newCube.top[2][1], newCube.top[2][2]];
      newCube.top[2][0] = newCube.right[0][0];
      newCube.top[2][1] = newCube.right[1][0];
      newCube.top[2][2] = newCube.right[2][0];
      newCube.right[0][0] = newCube.bottom[0][2];
      newCube.right[1][0] = newCube.bottom[0][1];
      newCube.right[2][0] = newCube.bottom[0][0];
      newCube.bottom[0][0] = newCube.left[0][2];
      newCube.bottom[0][1] = newCube.left[1][2];
      newCube.bottom[0][2] = newCube.left[2][2];
      newCube.left[0][2] = tempFPrime[2];
      newCube.left[1][2] = tempFPrime[1];
      newCube.left[2][2] = tempFPrime[0];
      break;
      
    case 'B': // Back face clockwise
      newCube.back = rotateFaceClockwise(newCube.back);
      const tempB = [newCube.top[0][0], newCube.top[0][1], newCube.top[0][2]];
      newCube.top[0][0] = newCube.right[0][2];
      newCube.top[0][1] = newCube.right[1][2];
      newCube.top[0][2] = newCube.right[2][2];
      newCube.right[0][2] = newCube.bottom[2][2];
      newCube.right[1][2] = newCube.bottom[2][1];
      newCube.right[2][2] = newCube.bottom[2][0];
      newCube.bottom[2][0] = newCube.left[2][0];
      newCube.bottom[2][1] = newCube.left[1][0];
      newCube.bottom[2][2] = newCube.left[0][0];
      newCube.left[0][0] = tempB[2];
      newCube.left[1][0] = tempB[1];
      newCube.left[2][0] = tempB[0];
      break;
      
    case "B'": // Back face counterclockwise
      newCube.back = rotateFaceCounterClockwise(newCube.back);
      const tempBPrime = [newCube.top[0][0], newCube.top[0][1], newCube.top[0][2]];
      newCube.top[0][0] = newCube.left[2][0];
      newCube.top[0][1] = newCube.left[1][0];
      newCube.top[0][2] = newCube.left[0][0];
      newCube.left[0][0] = newCube.bottom[2][2];
      newCube.left[1][0] = newCube.bottom[2][1];
      newCube.left[2][0] = newCube.bottom[2][0];
      newCube.bottom[2][0] = newCube.right[2][2];
      newCube.bottom[2][1] = newCube.right[1][2];
      newCube.bottom[2][2] = newCube.right[0][2];
      newCube.right[0][2] = tempBPrime[0];
      newCube.right[1][2] = tempBPrime[1];
      newCube.right[2][2] = tempBPrime[2];
      break;
      
    default:
      console.warn(`Move ${move} not implemented yet`);
  }
  
  return newCube;
};

// Apply a sequence of moves
export const applyMoveSequence = (cube: CubeState, moves: Move[]): CubeState => {
  return moves.reduce((currentCube, move) => applyMove(currentCube, move), cube);
};

// Check if cube is solved
export const isCubeSolved = (cube: CubeState): boolean => {
  const faces = [cube.front, cube.back, cube.right, cube.left, cube.top, cube.bottom];
  
  return faces.every(face => {
    const firstColor = face[0][0];
    return face.every(row => row.every(color => color === firstColor));
  });
};

// Generate random scramble
export const generateScramble = (moveCount: number = 20): Move[] => {
  const moves: Move[] = ['R', "R'", 'L', "L'", 'U', "U'", 'D', "D'", 'F', "F'", 'B', "B'"];
  const scramble: Move[] = [];
  
  for (let i = 0; i < moveCount; i++) {
    const randomMove = moves[Math.floor(Math.random() * moves.length)];
    scramble.push(randomMove);
  }
  
  return scramble;
};

// Utility functions for cube analysis
export const getEdgePosition = (cube: CubeState, color1: CubeColor, color2: CubeColor): string | null => {
  // Find edge piece with given colors
  // This would be used by the solver to locate pieces
  return null; // Placeholder
};

export const getCornerPosition = (cube: CubeState, color1: CubeColor, color2: CubeColor, color3: CubeColor): string | null => {
  // Find corner piece with given colors
  return null; // Placeholder
};
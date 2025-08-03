// Cube solver type definitions

export type CubeColor = 'white' | 'yellow' | 'orange' | 'red' | 'green' | 'blue';

export type Face = CubeColor[][];

export interface CubeState {
  front: Face;
  back: Face;
  right: Face;
  left: Face;
  top: Face;
  bottom: Face;
}

export type Move = 'R' | "R'" | 'R2' | 'L' | "L'" | 'L2' | 'U' | "U'" | 'U2' | 
                  'D' | "D'" | 'D2' | 'F' | "F'" | 'F2' | 'B' | "B'" | 'B2';

export interface SolveStep {
  move: Move;
  description: string;
  cubeState: CubeState;
}

export interface SolverState {
  isScrambled: boolean;
  isSolving: boolean;
  isSolved: boolean;
  currentStep: number;
  totalSteps: number;
  moveSequence: Move[];
  solveSteps: SolveStep[];
  solveTime: number;
  efficiency: number;
}

export interface PerformanceMetrics {
  moveCount: number;
  solveTime: number;
  movesPerSecond: number;
  efficiency: number;
  algorithm: string;
}
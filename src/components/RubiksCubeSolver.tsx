import React, { useState, useEffect, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import CubeVisualizer from './CubeVisualizer';
import ControlPanel from './ControlPanel';
import MoveSequenceDisplay from './MoveSequenceDisplay';
import { CubeState, SolverState, PerformanceMetrics } from '@/types/cube';
import { createSolvedCube, generateScramble, applyMoveSequence, isCubeSolved } from '@/utils/cubeLogic';
import { CubeSolver } from '@/utils/cubeSolver';
import { toast } from 'sonner';

const RubiksCubeSolver: React.FC = () => {
  const [cubeState, setCubeState] = useState<CubeState>(createSolvedCube());
  const [rotation, setRotation] = useState({ x: 15, y: 45 });
  const [solverState, setSolverState] = useState<SolverState>({
    isScrambled: false,
    isSolving: false,
    isSolved: true,
    currentStep: 0,
    totalSteps: 0,
    moveSequence: [],
    solveSteps: [],
    solveTime: 0,
    efficiency: 0,
  });
  const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetrics | null>(null);
  const [autoRotate, setAutoRotate] = useState(true);

  // Auto-rotation effect
  useEffect(() => {
    if (!autoRotate || solverState.isSolving) return;
    
    const interval = setInterval(() => {
      setRotation(prev => ({
        x: 15,
        y: (prev.y + 1) % 360
      }));
    }, 50);

    return () => clearInterval(interval);
  }, [autoRotate, solverState.isSolving]);

  // Handle scrambling
  const handleScramble = useCallback(() => {
    const scrambleMoves = generateScramble(20);
    const scrambledCube = applyMoveSequence(createSolvedCube(), scrambleMoves);
    
    setCubeState(scrambledCube);
    setSolverState(prev => ({
      ...prev,
      isScrambled: true,
      isSolved: false,
      currentStep: 0,
      totalSteps: 0,
      moveSequence: scrambleMoves,
      solveSteps: [],
    }));
    setPerformanceMetrics(null);
    setAutoRotate(false);
    
    toast.success('Cube scrambled! Ready to solve.');
  }, []);

  // Handle solving
  const handleSolve = useCallback(() => {
    if (!solverState.isScrambled) return;

    setSolverState(prev => ({ ...prev, isSolving: true }));
    setAutoRotate(false);
    
    toast.info('Solving cube...');

    // Simulate solving with delay for visualization
    setTimeout(() => {
      const solver = new CubeSolver(cubeState);
      const result = solver.solve();
      
      setSolverState(prev => ({
        ...prev,
        isSolving: false,
        totalSteps: result.steps.length,
        moveSequence: result.moves,
        solveSteps: result.steps,
        solveTime: result.metrics.solveTime,
        efficiency: result.metrics.efficiency,
      }));
      
      setPerformanceMetrics(result.metrics);
      
      toast.success(`Cube solving algorithm completed! ${result.moves.length} moves in ${result.metrics.solveTime}ms`);
    }, 1000);
  }, [cubeState, solverState.isScrambled]);

  // Handle step-by-step solving
  const handleStep = useCallback(() => {
    if (solverState.currentStep >= solverState.totalSteps) return;

    const nextStep = solverState.currentStep + 1;
    const currentStepData = solverState.solveSteps[nextStep - 1];
    
    if (currentStepData) {
      setCubeState(currentStepData.cubeState);
      setSolverState(prev => ({
        ...prev,
        currentStep: nextStep,
        isSolved: nextStep === prev.totalSteps
      }));

      if (nextStep === solverState.totalSteps) {
        toast.success('Cube solved step by step!');
        setAutoRotate(true);
      }
    }
  }, [solverState.currentStep, solverState.totalSteps, solverState.solveSteps]);

  // Handle pause
  const handlePause = useCallback(() => {
    setSolverState(prev => ({ ...prev, isSolving: false }));
    toast.info('Solving paused');
  }, []);

  // Handle reset
  const handleReset = useCallback(() => {
    setCubeState(createSolvedCube());
    setSolverState({
      isScrambled: false,
      isSolving: false,
      isSolved: true,
      currentStep: 0,
      totalSteps: 0,
      moveSequence: [],
      solveSteps: [],
      solveTime: 0,
      efficiency: 0,
    });
    setPerformanceMetrics(null);
    setAutoRotate(true);
    toast.success('Cube reset to solved state');
  }, []);

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent mb-2">
            3D Rubik's Cube Solver
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Advanced algorithm visualization with layer-by-layer solving, state prediction, 
            and performance analysis. Showcasing data structures and computational efficiency.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Controls */}
          <div className="space-y-6">
            <ControlPanel
              solverState={solverState}
              performanceMetrics={performanceMetrics}
              onScramble={handleScramble}
              onSolve={handleSolve}
              onReset={handleReset}
              onStep={handleStep}
              onPause={handlePause}
            />
          </div>

          {/* Center Column - 3D Cube */}
          <div className="flex items-center justify-center">
            <Card className="p-8 glass">
              <CubeVisualizer
                cubeState={cubeState}
                rotation={rotation}
                isAnimating={solverState.isSolving}
              />
              <div className="mt-4 text-center">
                <p className="text-sm text-muted-foreground">
                  {solverState.isSolved ? '✅ Solved' : 
                   solverState.isScrambled ? '🔄 Scrambled' : '⭐ Perfect'}
                </p>
              </div>
            </Card>
          </div>

          {/* Right Column - Move Sequence */}
          <div>
            <MoveSequenceDisplay
              moveSequence={solverState.moveSequence}
              solveSteps={solverState.solveSteps}
              currentStep={solverState.currentStep}
            />
          </div>
        </div>

        {/* Algorithm Information */}
        <Card className="mt-8 p-6 glass">
          <h3 className="text-lg font-semibold mb-4 text-foreground">Algorithm & Data Structure Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
            <div>
              <h4 className="font-medium text-primary mb-2">Problem Approach</h4>
              <ul className="text-muted-foreground space-y-1">
                <li>• Layer-by-layer decomposition</li>
                <li>• State space exploration</li>
                <li>• Move sequence optimization</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-primary mb-2">Data Structures</h4>
              <ul className="text-muted-foreground space-y-1">
                <li>• 3D array cube representation</li>
                <li>• Move sequence tracking</li>
                <li>• State transition mapping</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-primary mb-2">State Prediction</h4>
              <ul className="text-muted-foreground space-y-1">
                <li>• Real-time state tracking</li>
                <li>• Move simulation engine</li>
                <li>• Position validation</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-primary mb-2">Efficiency</h4>
              <ul className="text-muted-foreground space-y-1">
                <li>• O(n³) time complexity</li>
                <li>• O(n²) space complexity</li>
                <li>• 20-30 move average</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default RubiksCubeSolver;
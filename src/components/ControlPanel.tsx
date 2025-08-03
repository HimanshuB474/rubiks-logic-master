import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Play, Shuffle, RotateCcw, Pause, SkipForward, Zap } from 'lucide-react';
import { SolverState, PerformanceMetrics } from '@/types/cube';

interface ControlPanelProps {
  solverState: SolverState;
  performanceMetrics: PerformanceMetrics | null;
  selectedAlgorithm: string;
  onAlgorithmChange: (algorithm: string) => void;
  onScramble: () => void;
  onSolve: () => void;
  onReset: () => void;
  onStep: () => void;
  onPause: () => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  solverState,
  performanceMetrics,
  selectedAlgorithm,
  onAlgorithmChange,
  onScramble,
  onSolve,
  onReset,
  onStep,
  onPause,
}) => {
  return (
    <div className="space-y-6">
      {/* Algorithm Selection */}
      <Card className="p-6 glass">
        <h3 className="text-lg font-semibold mb-4 text-foreground">Algorithm Selection</h3>
        <Select value={selectedAlgorithm} onValueChange={onAlgorithmChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Choose solving algorithm" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="layer-by-layer">
              <div className="flex items-center gap-2">
                <Shuffle className="w-4 h-4" />
                Layer-by-Layer (Fast)
              </div>
            </SelectItem>
            <SelectItem value="astar">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4" />
                A* Search (Optimal)
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </Card>

      {/* Control Buttons */}
      <Card className="p-6 glass">
        <h3 className="text-lg font-semibold mb-4 text-foreground">Cube Controls</h3>
        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={onScramble}
            disabled={solverState.isSolving}
            variant="default"
            className="flex items-center gap-2"
          >
            <Shuffle className="w-4 h-4" />
            Scramble
          </Button>
          
          <Button
            onClick={solverState.isSolving ? onPause : onSolve}
            disabled={!solverState.isScrambled && !solverState.isSolving}
            variant="default"
            className="flex items-center gap-2"
          >
            {solverState.isSolving ? (
              <>
                <Pause className="w-4 h-4" />
                Pause
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                Solve
              </>
            )}
          </Button>
          
          <Button
            onClick={onStep}
            disabled={!solverState.isSolving && solverState.currentStep >= solverState.totalSteps}
            variant="outline"
            className="flex items-center gap-2"
          >
            <SkipForward className="w-4 h-4" />
            Step
          </Button>
          
          <Button
            onClick={onReset}
            variant="outline"
            className="flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </Button>
        </div>
      </Card>

      {/* Performance Metrics */}
      {performanceMetrics && (
        <Card className="p-6 glass">
          <h3 className="text-lg font-semibold mb-4 text-foreground">Performance Metrics</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Algorithm:</span>
              <span className="font-mono text-primary">{performanceMetrics.algorithm}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Moves:</span>
              <span className="font-mono text-foreground">{performanceMetrics.moveCount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Time:</span>
              <span className="font-mono text-foreground">{performanceMetrics.solveTime}ms</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Speed:</span>
              <span className="font-mono text-foreground">
                {performanceMetrics.movesPerSecond.toFixed(1)} moves/s
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Efficiency:</span>
              <span className="font-mono text-primary">
                {performanceMetrics.efficiency.toFixed(1)}%
              </span>
            </div>
          </div>
        </Card>
      )}

      {/* Progress Indicator */}
      {solverState.totalSteps > 0 && (
        <Card className="p-6 glass">
          <h3 className="text-lg font-semibold mb-4 text-foreground">Solving Progress</h3>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Step {solverState.currentStep} of {solverState.totalSteps}</span>
              <span className="text-primary">
                {((solverState.currentStep / solverState.totalSteps) * 100).toFixed(0)}%
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-gradient-to-r from-primary to-primary-glow rounded-full h-2 transition-all duration-300"
                style={{
                  width: `${(solverState.currentStep / solverState.totalSteps) * 100}%`
                }}
              />
            </div>
            {solverState.isSolved && (
              <div className="text-center text-primary font-semibold">
                ✨ Cube Solved! ✨
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  );
};

export default ControlPanel;
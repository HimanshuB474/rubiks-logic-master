import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Move, SolveStep } from '@/types/cube';

interface MoveSequenceDisplayProps {
  moveSequence: Move[];
  solveSteps: SolveStep[];
  currentStep: number;
}

const MoveSequenceDisplay: React.FC<MoveSequenceDisplayProps> = ({
  moveSequence,
  solveSteps,
  currentStep,
}) => {
  return (
    <Card className="p-6 glass">
      <h3 className="text-lg font-semibold mb-4 text-foreground">Move Sequence</h3>
      
      {/* Move Sequence */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-muted-foreground mb-2">Moves:</h4>
        <div className="flex flex-wrap gap-2">
          {moveSequence.map((move, index) => (
            <Badge
              key={index}
              variant={index < currentStep ? "default" : "outline"}
              className={`font-mono ${
                index === currentStep - 1 ? 'ring-2 ring-primary' : ''
              }`}
            >
              {move}
            </Badge>
          ))}
        </div>
      </div>

      {/* Current Step Description */}
      {solveSteps.length > 0 && currentStep > 0 && currentStep <= solveSteps.length && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-muted-foreground">Current Step:</h4>
          <div className="p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="default" className="font-mono">
                {solveSteps[currentStep - 1]?.move}
              </Badge>
              <span className="text-sm text-muted-foreground">
                Step {currentStep}
              </span>
            </div>
            <p className="text-sm text-foreground">
              {solveSteps[currentStep - 1]?.description}
            </p>
          </div>
        </div>
      )}

      {/* Algorithm Breakdown */}
      <div className="mt-6 space-y-2">
        <h4 className="text-sm font-medium text-muted-foreground">Algorithm Breakdown:</h4>
        <div className="text-xs text-muted-foreground space-y-1">
          <div>• Layer-by-Layer solving method</div>
          <div>• Time Complexity: O(n³) average case</div>
          <div>• Space Complexity: O(n²) for state tracking</div>
          <div>• Optimal moves: 20-25 for expert algorithms</div>
        </div>
      </div>
    </Card>
  );
};

export default MoveSequenceDisplay;
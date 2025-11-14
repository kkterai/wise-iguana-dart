import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Step {
  id: string;
  name: string;
  status: 'pending' | 'active' | 'complete' | 'error';
}

interface WorkflowStepperProps {
  steps: Step[];
  currentStep: number;
  onStepClick?: (stepIndex: number) => void;
}

export const WorkflowStepper = ({ steps, currentStep, onStepClick }: WorkflowStepperProps) => {
  return (
    <div className="w-full py-6">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center flex-1">
            <div className="flex flex-col items-center flex-1">
              <button
                onClick={() => onStepClick?.(index)}
                disabled={step.status === 'pending'}
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all",
                  step.status === 'complete' && "bg-green-600 text-white",
                  step.status === 'active' && "bg-blue-600 text-white ring-4 ring-blue-200",
                  step.status === 'pending' && "bg-gray-200 text-gray-500",
                  step.status === 'error' && "bg-red-600 text-white",
                  step.status !== 'pending' && "cursor-pointer hover:scale-110"
                )}
              >
                {step.status === 'complete' ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </button>
              <span className={cn(
                "mt-2 text-sm font-medium text-center",
                step.status === 'active' && "text-blue-600",
                step.status === 'complete' && "text-green-600",
                step.status === 'pending' && "text-gray-500"
              )}>
                {step.name}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className={cn(
                "h-1 flex-1 mx-2 transition-all",
                steps[index + 1].status === 'complete' || steps[index + 1].status === 'active' 
                  ? "bg-green-600" 
                  : "bg-gray-200"
              )} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
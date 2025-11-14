import { AlertCircle, AlertTriangle, Info } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ValidationIssue } from '@/types/cmmo';
import { cn } from '@/lib/utils';

interface ValidationIssueCardProps {
  issue: ValidationIssue;
  onFix?: (issueId: string) => void;
}

export const ValidationIssueCard = ({ issue, onFix }: ValidationIssueCardProps) => {
  const getSeverityIcon = () => {
    switch (issue.severity) {
      case 'blocker':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case 'info':
        return <Info className="w-5 h-5 text-blue-600" />;
    }
  };

  const getSeverityColor = () => {
    switch (issue.severity) {
      case 'blocker':
        return 'border-red-200 bg-red-50';
      case 'warning':
        return 'border-yellow-200 bg-yellow-50';
      case 'info':
        return 'border-blue-200 bg-blue-50';
    }
  };

  return (
    <Card className={cn("mb-3", getSeverityColor())}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="mt-0.5">{getSeverityIcon()}</div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant={issue.severity === 'blocker' ? 'destructive' : 'secondary'}>
                {issue.severity.toUpperCase()}
              </Badge>
              <span className="text-xs text-gray-500 font-mono">{issue.rule}</span>
            </div>
            <p className="text-sm font-medium text-gray-900 mb-2">{issue.message}</p>
            {(issue.row || issue.column) && (
              <div className="text-xs text-gray-600 mb-2">
                {issue.row && <span>Row {issue.row}</span>}
                {issue.row && issue.column && <span> • </span>}
                {issue.column && <span>Column: {issue.column}</span>}
                {issue.value && (
                  <span className="ml-2 font-mono bg-white px-2 py-0.5 rounded border">
                    "{issue.value}"
                  </span>
                )}
              </div>
            )}
            {issue.suggestion && (
              <div className="text-sm text-gray-700 bg-white p-2 rounded border mt-2">
                <span className="font-medium">Suggestion: </span>
                {issue.suggestion}
              </div>
            )}
          </div>
          {issue.severity === 'blocker' && onFix && (
            <Button size="sm" onClick={() => onFix(issue.id)}>
              Fix
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
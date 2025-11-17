import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Circle } from 'lucide-react';
import { SchemaCandidate } from '@/types/cmmo';

interface SchemaCandidateCardProps {
  schema: SchemaCandidate;
  selected?: boolean;
  onSelect?: () => void;
}

export const SchemaCandidateCard = ({ schema, selected, onSelect }: SchemaCandidateCardProps) => {
  const confidenceColor = schema.confidence >= 0.9 ? 'text-green-600' : 
                          schema.confidence >= 0.7 ? 'text-yellow-600' : 
                          'text-gray-600';

  return (
    <Card className={`cursor-pointer transition-all hover:shadow-md ${selected ? 'border-2 border-primary shadow-md' : 'border'}`} onClick={onSelect}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-lg text-gray-900">{schema.name}</h3>
              {selected ? (
                <CheckCircle2 className="w-5 h-5 text-primary" />
              ) : (
                <Circle className="w-5 h-5 text-gray-300" />
              )}
            </div>
            <p className="text-sm text-gray-500">Version {schema.version}</p>
          </div>
        </div>
        
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Confidence Score</span>
            <Badge variant="outline" className={`${confidenceColor} font-semibold`}>
              {(schema.confidence * 100).toFixed(0)}%
            </Badge>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all"
              style={{ width: `${schema.confidence * 100}%` }}
            />
          </div>
        </div>

        <p className="text-sm text-gray-600 leading-relaxed">{schema.rationale}</p>

        {selected && (
          <div className="mt-4 pt-4 border-t">
            <div className="flex items-center gap-2 text-sm text-primary font-medium">
              <CheckCircle2 className="w-4 h-4" />
              <span>Selected Schema</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';
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
    <Card className={selected ? 'border-blue-600 border-2' : ''}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-semibold text-lg">{schema.name}</h3>
            <p className="text-sm text-gray-500">Version {schema.version}</p>
          </div>
          {selected && <CheckCircle2 className="w-6 h-6 text-blue-600" />}
        </div>
        
        <div className="mb-3">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm text-gray-600">Confidence:</span>
            <Badge variant="outline" className={confidenceColor}>
              {(schema.confidence * 100).toFixed(0)}%
            </Badge>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all"
              style={{ width: `${schema.confidence * 100}%` }}
            />
          </div>
        </div>

        <p className="text-sm text-gray-700 mb-4">{schema.rationale}</p>

        {!selected && (
          <Button onClick={onSelect} className="w-full">
            Select Schema
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
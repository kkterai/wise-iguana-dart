import { useState } from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { WorkflowStepper } from '@/components/workflow-stepper';
import { mockFieldMappings, mockUploadedColumns } from '@/data/mockData';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

const MappingPage = () => {
  const navigate = useNavigate();
  const [mappings, setMappings] = useState<Record<string, string>>({});

  const steps = [
    { id: 'upload', name: 'Upload', status: 'complete' as const },
    { id: 'map', name: 'Map Fields', status: 'active' as const },
    { id: 'harmonize', name: 'Harmonize', status: 'pending' as const },
    { id: 'validate', name: 'Validate', status: 'pending' as const },
    { id: 'export', name: 'Export', status: 'pending' as const }
  ];

  const requiredFields = mockFieldMappings.filter(m => m.required);
  const optionalFields = mockFieldMappings.filter(m => !m.required);
  
  const requiredMapped = requiredFields.filter(f => mappings[f.targetField]).length;
  const canProgress = requiredMapped === requiredFields.length;

  const handleMapping = (targetField: string, sourceColumn: string) => {
    setMappings(prev => ({
      ...prev,
      [targetField]: sourceColumn
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Field Mapping</h1>
          <p className="text-gray-600">
            Map your CSV columns to the required schema fields
          </p>
        </div>

        <WorkflowStepper steps={steps} currentStep={1} />

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Mapping List */}
          <div className="lg:col-span-2 space-y-6">
            {/* Required Fields */}
            <Card>
              <CardHeader>
                <CardTitle>Required Fields</CardTitle>
                <CardDescription>
                  All required fields must be mapped to continue
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {requiredFields.map((field) => (
                    <div
                      key={field.targetField}
                      className={cn(
                        "border rounded-lg p-4",
                        mappings[field.targetField] ? "bg-white border-gray-200" : "bg-red-50 border-red-300"
                      )}
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-medium text-gray-900">
                              {field.targetField}
                            </span>
                            <Badge variant="destructive" className="text-xs">
                              Required
                            </Badge>
                          </div>
                          <Select
                            value={mappings[field.targetField] || ''}
                            onValueChange={(value) => handleMapping(field.targetField, value)}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select column from your CSV..." />
                            </SelectTrigger>
                            <SelectContent>
                              {mockUploadedColumns.map((col) => (
                                <SelectItem key={col} value={col}>
                                  {col}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        {mappings[field.targetField] && (
                          <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Optional Fields */}
            <Card>
              <CardHeader>
                <CardTitle>Optional Fields</CardTitle>
                <CardDescription>
                  These fields are optional but recommended
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {optionalFields.map((field) => (
                    <div
                      key={field.targetField}
                      className="border rounded-lg p-4 bg-white"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-medium text-gray-900">
                              {field.targetField}
                            </span>
                            <Badge variant="secondary" className="text-xs">
                              Optional
                            </Badge>
                          </div>
                          <Select
                            value={mappings[field.targetField] || ''}
                            onValueChange={(value) => handleMapping(field.targetField, value)}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select column from your CSV..." />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="__skip__">Skip this field</SelectItem>
                              {mockUploadedColumns.map((col) => (
                                <SelectItem key={col} value={col}>
                                  {col}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        {mappings[field.targetField] && mappings[field.targetField] !== '__skip__' && (
                          <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Summary Panel */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Mapping Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Required Fields</span>
                      <span className="font-medium">
                        {requiredMapped}/{requiredFields.length}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={cn(
                          "h-2 rounded-full transition-all",
                          canProgress ? "bg-green-600" : "bg-red-600"
                        )}
                        style={{
                          width: `${(requiredMapped / requiredFields.length) * 100}%`
                        }}
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Total required</span>
                      <span className="font-medium">{requiredFields.length}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Total optional</span>
                      <span className="font-medium">{optionalFields.length}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Unmapped required</span>
                      <span className={cn(
                        "font-medium",
                        canProgress ? "text-green-600" : "text-red-600"
                      )}>
                        {requiredFields.length - requiredMapped}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Readiness Check</CardTitle>
              </CardHeader>
              <CardContent>
                {canProgress ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-green-600">
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-medium">Ready to proceed</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      All required fields are mapped. You can continue to harmonization.
                    </p>
                    <Button
                      className="w-full"
                      size="lg"
                      onClick={() => navigate('/cmmo/harmonization')}
                    >
                      Continue to Harmonization
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-red-600">
                      <AlertCircle className="w-5 h-5" />
                      <span className="font-medium">Cannot proceed</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {requiredFields.length - requiredMapped} required field{requiredFields.length - requiredMapped !== 1 ? 's' : ''} must be mapped before continuing.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MappingPage;
import { useState } from 'react';
import { ArrowRight, Search, CheckCircle, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { WorkflowStepper } from '@/components/workflow-stepper';
import { mockFieldMappings } from '@/data/mockData';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

const MappingPage = () => {
  const navigate = useNavigate();
  const [mappings, setMappings] = useState(mockFieldMappings);
  const [searchTerm, setSearchTerm] = useState('');

  const steps = [
    { id: 'upload', name: 'Upload', status: 'complete' as const },
    { id: 'map', name: 'Map Fields', status: 'active' as const },
    { id: 'harmonize', name: 'Harmonize', status: 'pending' as const },
    { id: 'validate', name: 'Validate', status: 'pending' as const },
    { id: 'export', name: 'Export', status: 'pending' as const }
  ];

  const unmappedRequired = mappings.filter(m => m.required && !m.mapped).length;
  const canProgress = unmappedRequired === 0;

  const filteredMappings = mappings.filter(m =>
    m.sourceField.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.targetField.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggleMapping = (index: number) => {
    const newMappings = [...mappings];
    newMappings[index].mapped = !newMappings[index].mapped;
    setMappings(newMappings);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Field Mapping</h1>
          <p className="text-gray-600">
            Map source fields to canonical schema fields
          </p>
        </div>

        <WorkflowStepper steps={steps} currentStep={1} />

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Mapping List */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Field Mappings</CardTitle>
                    <CardDescription>
                      {mappings.filter(m => m.mapped).length} of {mappings.length} fields mapped
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Search className="w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Search fields..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-64"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {filteredMappings.map((mapping, index) => (
                    <div
                      key={index}
                      className={cn(
                        "border rounded-lg p-4 transition-all",
                        mapping.mapped ? "bg-white border-gray-200" : "bg-gray-50 border-gray-300",
                        mapping.required && !mapping.mapped && "border-red-300 bg-red-50"
                      )}
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-mono text-sm font-medium text-gray-900">
                              {mapping.sourceField}
                            </span>
                            {mapping.required && (
                              <Badge variant="destructive" className="text-xs">
                                Required
                              </Badge>
                            )}
                          </div>
                          <div className="text-xs text-gray-500">
                            Confidence: {(mapping.confidence * 100).toFixed(0)}%
                          </div>
                        </div>

                        <ArrowRight className="w-5 h-5 text-gray-400" />

                        <div className="flex-1">
                          <div className="font-mono text-sm font-medium text-blue-600">
                            {mapping.targetField}
                          </div>
                          <div className="text-xs text-gray-500">Canonical field</div>
                        </div>

                        <Button
                          size="sm"
                          variant={mapping.mapped ? "outline" : "default"}
                          onClick={() => handleToggleMapping(index)}
                        >
                          {mapping.mapped ? (
                            <>
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Mapped
                            </>
                          ) : (
                            "Map"
                          )}
                        </Button>
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
                <CardTitle>Mapping Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium">
                        {mappings.filter(m => m.mapped).length}/{mappings.length}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all"
                        style={{
                          width: `${(mappings.filter(m => m.mapped).length / mappings.length) * 100}%`
                        }}
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Required fields</span>
                      <span className="font-medium">
                        {mappings.filter(m => m.required).length}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Optional fields</span>
                      <span className="font-medium">
                        {mappings.filter(m => !m.required).length}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Unmapped required</span>
                      <span className={cn(
                        "font-medium",
                        unmappedRequired > 0 ? "text-red-600" : "text-green-600"
                      )}>
                        {unmappedRequired}
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
                      {unmappedRequired} required field{unmappedRequired !== 1 ? 's' : ''} must be mapped before continuing.
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
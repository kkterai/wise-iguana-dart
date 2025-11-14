import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { WorkflowStepper } from '@/components/workflow-stepper';
import { mockHarmonization, sampleTableData } from '@/data/mockData';
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CheckCircle, XCircle, Database } from 'lucide-react';

const HarmonizationPage = () => {
  const navigate = useNavigate();

  const steps = [
    { id: 'upload', name: 'Upload', status: 'complete' as const },
    { id: 'map', name: 'Map Fields', status: 'complete' as const },
    { id: 'harmonize', name: 'Harmonize', status: 'active' as const },
    { id: 'validate', name: 'Validate', status: 'pending' as const },
    { id: 'export', name: 'Export', status: 'pending' as const }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Harmonization</h1>
          <p className="text-gray-600">
            Canonical identifiers generated and entity relationships constructed
          </p>
        </div>

        <WorkflowStepper steps={steps} currentStep={2} />

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Entity Summary */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Canonical Entities</CardTitle>
                <CardDescription>
                  Unique entities identified across modalities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(mockHarmonization.canonicalIds).map(([entity, count]) => (
                    <div key={entity} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Database className="w-4 h-4 text-gray-600" />
                        <span className="font-medium capitalize">{entity}</span>
                      </div>
                      <Badge variant="secondary">{count}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Relationships</CardTitle>
                <CardDescription>
                  Entity relationship validation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockHarmonization.relationships.map((rel, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="text-sm">
                        <div className="font-medium">{rel.from} → {rel.to}</div>
                        <div className="text-gray-500 text-xs">{rel.type}</div>
                      </div>
                      {rel.valid ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-600" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total rows</span>
                    <span className="font-medium">{mockHarmonization.totalRows.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Valid relationships</span>
                    <span className="font-medium text-green-600">
                      {mockHarmonization.relationships.filter(r => r.valid).length}/
                      {mockHarmonization.relationships.length}
                    </span>
                  </div>
                </div>
                <Button
                  className="w-full mt-4"
                  size="lg"
                  onClick={() => navigate('/cmmo/validation')}
                >
                  Continue to Validation
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Data Preview */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Harmonized Data Preview</CardTitle>
                <CardDescription>
                  Sample of canonicalized metadata (first 3 rows)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Specimen_ID</TableHead>
                        <TableHead>Block_ID</TableHead>
                        <TableHead>Slide_ID</TableHead>
                        <TableHead>ROI_ID</TableHead>
                        <TableHead>Library_ID</TableHead>
                        <TableHead>Run_ID</TableHead>
                        <TableHead>Tissue_Type</TableHead>
                        <TableHead>Platform</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sampleTableData.map((row, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-mono text-xs">{row.Specimen_ID}</TableCell>
                          <TableCell className="font-mono text-xs">{row.Block_ID}</TableCell>
                          <TableCell className="font-mono text-xs">{row.Slide_ID}</TableCell>
                          <TableCell className="font-mono text-xs">{row.ROI_ID}</TableCell>
                          <TableCell className="font-mono text-xs">{row.Library_ID}</TableCell>
                          <TableCell className="font-mono text-xs">{row.Run_ID}</TableCell>
                          <TableCell className="text-xs">{row.Tissue_Type}</TableCell>
                          <TableCell className="text-xs">{row.Platform}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <div className="mt-4 text-sm text-gray-500 text-center">
                  Showing 3 of {mockHarmonization.totalRows.toLocaleString()} rows
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HarmonizationPage;
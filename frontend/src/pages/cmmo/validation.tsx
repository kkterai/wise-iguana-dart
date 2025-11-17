import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { WorkflowStepper } from '@/components/workflow-stepper';
import { ValidationIssueCard } from '@/components/validation-issue-card';
import { mockValidationIssues } from '@/data/mockData';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, AlertTriangle, Info, CheckCircle, Download, Upload, FileText } from 'lucide-react';
import { toast } from 'sonner';

const ValidationPage = () => {
  const navigate = useNavigate();
  const [issues, setIssues] = useState(mockValidationIssues);
  const [reuploadedFile, setReuploadedFile] = useState<string | null>(null);
  const [isRevalidating, setIsRevalidating] = useState(false);

  const steps = [
    { id: 'upload', name: 'Upload', status: 'complete' as const },
    { id: 'map', name: 'Map Fields', status: 'complete' as const },
    { id: 'harmonize', name: 'Harmonize', status: 'complete' as const },
    { id: 'validate', name: 'Validate', status: 'active' as const },
    { id: 'export', name: 'Export', status: 'pending' as const }
  ];

  const blockers = issues.filter(i => i.severity === 'blocker');
  const warnings = issues.filter(i => i.severity === 'warning');
  const infos = issues.filter(i => i.severity === 'info');

  const canExport = blockers.length === 0;

  const handleDownloadReport = () => {
    toast.success('Validation report downloaded', {
      description: 'Fix the issues in your spreadsheet and re-upload the corrected file below'
    });
  };

  const handleFileReupload = () => {
    setReuploadedFile('CosMx_Metadata_2024Q1_Fixed.csv');
    setIsRevalidating(true);
    
    toast.loading('Re-validating file...', { id: 'revalidate' });
    
    // Simulate re-validation
    setTimeout(() => {
      setIssues([]);
      setIsRevalidating(false);
      toast.success('Validation passed!', {
        id: 'revalidate',
        description: 'All blockers have been resolved. You can now proceed to export.'
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Validation</h1>
          <p className="text-gray-600">
            Deterministic rules engine validation results
          </p>
        </div>

        <WorkflowStepper steps={steps} currentStep={3} />

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Summary Cards */}
          <div className="lg:col-span-1 space-y-4">
            <Card className="border-red-200 bg-red-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-red-600">{blockers.length}</div>
                    <div className="text-sm text-red-700">Blockers</div>
                  </div>
                  <AlertCircle className="w-8 h-8 text-red-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-yellow-200 bg-yellow-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-yellow-600">{warnings.length}</div>
                    <div className="text-sm text-yellow-700">Warnings</div>
                  </div>
                  <AlertTriangle className="w-8 h-8 text-yellow-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-blue-200 bg-blue-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">{infos.length}</div>
                    <div className="text-sm text-blue-700">Info</div>
                  </div>
                  <Info className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            {/* Fix & Re-upload Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  {blockers.length > 0 ? 'Fix & Re-upload' : 'Validation Status'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {blockers.length > 0 ? (
                  <>
                    <p className="text-sm text-gray-600">
                      Download the validation report, fix the issues in your spreadsheet, then re-upload the corrected file.
                    </p>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={handleDownloadReport}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download Report (CSV)
                    </Button>

                    <div className="pt-3 border-t">
                      <p className="text-xs text-gray-600 mb-3 font-medium">
                        Re-upload corrected file:
                      </p>
                      
                      {!reuploadedFile ? (
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer bg-white">
                          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-xs text-gray-600 mb-3">
                            Upload corrected CSV
                          </p>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={handleFileReupload}
                            disabled={isRevalidating}
                          >
                            {isRevalidating ? 'Validating...' : 'Select File'}
                          </Button>
                        </div>
                      ) : (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-green-600" />
                            <span className="text-xs font-medium text-green-900">
                              {reuploadedFile}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-2 text-green-600">
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-medium text-sm">Ready to export</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      All validation checks passed. You can proceed to export your harmonized data.
                    </p>
                    <Button
                      className="w-full"
                      size="sm"
                      onClick={() => navigate('/cmmo/export')}
                    >
                      Continue to Export
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Issues List */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>Validation Issues</CardTitle>
                <CardDescription>
                  {blockers.length > 0 
                    ? 'Review issues and download the report to fix them in your spreadsheet'
                    : 'All validation checks passed successfully'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                {blockers.length === 0 && warnings.length === 0 && infos.length === 0 ? (
                  <div className="text-center py-16">
                    <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-600" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Validation Successful
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Your metadata has passed all validation checks and is ready for export.
                    </p>
                    <Button
                      size="lg"
                      onClick={() => navigate('/cmmo/export')}
                    >
                      Continue to Export
                    </Button>
                  </div>
                ) : (
                  <Tabs defaultValue="blockers">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="blockers" className="relative">
                        Blockers
                        {blockers.length > 0 && (
                          <Badge variant="destructive" className="ml-2">
                            {blockers.length}
                          </Badge>
                        )}
                      </TabsTrigger>
                      <TabsTrigger value="warnings" className="relative">
                        Warnings
                        {warnings.length > 0 && (
                          <Badge variant="secondary" className="ml-2">
                            {warnings.length}
                          </Badge>
                        )}
                      </TabsTrigger>
                      <TabsTrigger value="info" className="relative">
                        Info
                        {infos.length > 0 && (
                          <Badge variant="outline" className="ml-2">
                            {infos.length}
                          </Badge>
                        )}
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="blockers" className="mt-6">
                      {blockers.length === 0 ? (
                        <div className="text-center py-12 text-gray-500">
                          <CheckCircle className="w-12 h-12 mx-auto mb-4 text-green-600" />
                          <p>No blockers found</p>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {blockers.map(issue => (
                            <ValidationIssueCard
                              key={issue.id}
                              issue={issue}
                            />
                          ))}
                        </div>
                      )}
                    </TabsContent>

                    <TabsContent value="warnings" className="mt-6">
                      {warnings.length === 0 ? (
                        <div className="text-center py-12 text-gray-500">
                          <CheckCircle className="w-12 h-12 mx-auto mb-4 text-green-600" />
                          <p>No warnings found</p>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {warnings.map(issue => (
                            <ValidationIssueCard key={issue.id} issue={issue} />
                          ))}
                        </div>
                      )}
                    </TabsContent>

                    <TabsContent value="info" className="mt-6">
                      {infos.length === 0 ? (
                        <div className="text-center py-12 text-gray-500">
                          <Info className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                          <p>No info messages</p>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {infos.map(issue => (
                            <ValidationIssueCard key={issue.id} issue={issue} />
                          ))}
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValidationPage;
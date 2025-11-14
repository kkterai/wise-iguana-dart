import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { WorkflowStepper } from '@/components/workflow-stepper';
import { CheckCircle, Download, FileText, Database, FileJson, FileSpreadsheet } from 'lucide-react';

const ExportPage = () => {
  const steps = [
    { id: 'upload', name: 'Upload', status: 'complete' as const },
    { id: 'map', name: 'Map Fields', status: 'complete' as const },
    { id: 'harmonize', name: 'Harmonize', status: 'complete' as const },
    { id: 'validate', name: 'Validate', status: 'complete' as const },
    { id: 'export', name: 'Export', status: 'active' as const }
  ];

  const exportFiles = [
    {
      name: 'canonical_entities.csv',
      description: 'Harmonized entity tables with canonical identifiers',
      icon: Database,
      size: '2.4 MB'
    },
    {
      name: 'cross_modal_join_index.csv',
      description: 'Join index for multiomic data integration',
      icon: FileSpreadsheet,
      size: '856 KB'
    },
    {
      name: 'field_mapping.json',
      description: 'Source to canonical field mapping documentation',
      icon: FileJson,
      size: '12 KB'
    },
    {
      name: 'validation_report.pdf',
      description: 'Complete validation report with all checks',
      icon: FileText,
      size: '1.2 MB'
    },
    {
      name: 'validation_issues.csv',
      description: 'Machine-readable validation results',
      icon: FileSpreadsheet,
      size: '45 KB'
    },
    {
      name: 'manifest.json',
      description: 'Signed manifest with versions and hashes',
      icon: FileJson,
      size: '8 KB'
    }
  ];

  const manifestData = {
    schemaVersion: 'CosMx-2.1.0',
    rulesetVersion: '1.3.2',
    canonicalModelVersion: '2.0.0',
    generatedAt: new Date().toISOString(),
    operator: 'user@example.com',
    totalRows: 1247,
    blockers: 0,
    warnings: 3,
    info: 2
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Export Bundle</h1>
          <p className="text-gray-600">
            Download harmonized metadata and validation artifacts
          </p>
        </div>

        <WorkflowStepper steps={steps} currentStep={4} />

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Export Files */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-green-200 bg-green-50">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <CheckCircle className="w-12 h-12 text-green-600" />
                  <div>
                    <h3 className="text-lg font-semibold text-green-900">
                      Export Bundle Ready
                    </h3>
                    <p className="text-sm text-green-700">
                      All validation checks passed. Your harmonized metadata is ready for download.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Export Files</CardTitle>
                <CardDescription>
                  Complete harmonization bundle with all artifacts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {exportFiles.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <file.icon className="w-5 h-5 text-gray-600" />
                        <div>
                          <div className="font-medium text-sm">{file.name}</div>
                          <div className="text-xs text-gray-500">{file.description}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant="outline">{file.size}</Badge>
                        <Button size="sm" variant="ghost">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t">
                  <Button size="lg" className="w-full">
                    <Download className="w-5 h-5 mr-2" />
                    Download Complete Bundle (4.5 MB)
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Manifest & Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Manifest</CardTitle>
                <CardDescription>
                  Bundle metadata and signatures
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div>
                    <div className="text-gray-600 mb-1">Schema Version</div>
                    <div className="font-mono font-medium">{manifestData.schemaVersion}</div>
                  </div>
                  <div>
                    <div className="text-gray-600 mb-1">Ruleset Version</div>
                    <div className="font-mono font-medium">{manifestData.rulesetVersion}</div>
                  </div>
                  <div>
                    <div className="text-gray-600 mb-1">Canonical Model</div>
                    <div className="font-mono font-medium">{manifestData.canonicalModelVersion}</div>
                  </div>
                  <div>
                    <div className="text-gray-600 mb-1">Generated</div>
                    <div className="font-mono text-xs">{manifestData.generatedAt}</div>
                  </div>
                  <div>
                    <div className="text-gray-600 mb-1">Operator</div>
                    <div className="font-mono text-xs">{manifestData.operator}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Processing Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total rows</span>
                    <span className="font-medium">{manifestData.totalRows.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Blockers</span>
                    <Badge variant="outline" className="text-green-600">
                      {manifestData.blockers}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Warnings</span>
                    <Badge variant="outline" className="text-yellow-600">
                      {manifestData.warnings}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Info</span>
                    <Badge variant="outline" className="text-blue-600">
                      {manifestData.info}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Audit Trail</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  All actions have been logged with immutable audit records including timestamps, user IDs, and content hashes.
                </p>
                <Button variant="outline" className="w-full">
                  View Audit Log
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportPage;
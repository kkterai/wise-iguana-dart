import { useState } from 'react';
import { Upload, FileText, CheckCircle, Info } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { WorkflowStepper } from '@/components/workflow-stepper';
import { SchemaCandidateCard } from '@/components/schema-candidate-card';
import { SchemaDetailsModal } from '@/components/schema-details-modal';
import { mockSchemas, mockUploadedFile } from '@/data/mockData';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const UploadPage = () => {
  const navigate = useNavigate();
  const [fileUploaded, setFileUploaded] = useState(false);
  const [selectedSchema, setSelectedSchema] = useState<number | null>(null);
  const [showSchemaDetails, setShowSchemaDetails] = useState(false);

  const steps = [
    { id: 'upload', name: 'Upload', status: fileUploaded ? 'complete' : 'active' as const },
    { id: 'map', name: 'Map Fields', status: 'pending' as const },
    { id: 'harmonize', name: 'Harmonize', status: 'pending' as const },
    { id: 'validate', name: 'Validate', status: 'pending' as const },
    { id: 'export', name: 'Export', status: 'pending' as const }
  ];

  const handleFileUpload = () => {
    setFileUploaded(true);
    toast.success('File uploaded successfully', {
      description: `${mockUploadedFile.name} - ${mockUploadedFile.rows.toLocaleString()} rows detected`
    });
  };

  const handleContinue = () => {
    if (selectedSchema !== null) {
      toast.success('Schema selected', {
        description: `Proceeding with ${mockSchemas[selectedSchema].name}`
      });
      navigate('/cmmo/mapping');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Multiomic Data Orchestrator
          </h1>
          <p className="text-gray-600">
            Deterministic metadata harmonization for FFPE-based multiomic studies
          </p>
        </div>

        <WorkflowStepper steps={steps} currentStep={0} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          {/* Upload Section */}
          <Card>
            <CardHeader>
              <CardTitle>Upload Metadata File</CardTitle>
              <CardDescription>
                Upload CSV, TSV, or XLSX files (up to 200k rows)
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!fileUploaded ? (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-blue-500 transition-colors cursor-pointer">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-sm text-gray-600 mb-4">
                    Drag and drop your file here, or click to browse
                  </p>
                  <Button onClick={handleFileUpload}>
                    Select File
                  </Button>
                </div>
              ) : (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <FileText className="w-4 h-4 text-gray-600" />
                        <span className="font-medium text-gray-900">
                          {mockUploadedFile.name}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p>Size: {(mockUploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                        <p>Rows: {mockUploadedFile.rows.toLocaleString()}</p>
                        <p>Columns: {mockUploadedFile.columns}</p>
                        <p>Type: {mockUploadedFile.type}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* File Info */}
          <Card>
            <CardHeader>
              <CardTitle>Supported Formats</CardTitle>
              <CardDescription>
                File requirements and edge case handling
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-sm">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">CSV/TSV</h4>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>Auto-detects delimiter and encoding</li>
                    <li>Handles embedded delimiters and newlines</li>
                    <li>Normalizes mixed line endings</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">XLSX</h4>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>Multi-worksheet support</li>
                    <li>Merged cell handling</li>
                    <li>Formula evaluation</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Encoding</h4>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>UTF-8, ISO-8859-1, Windows-1252</li>
                    <li>Unicode normalization (NFC)</li>
                    <li>Confusable character detection</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Schema Detection */}
        {fileUploaded && (
          <div className="mt-8">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Schema Detection</CardTitle>
                    <CardDescription>
                      Top 3 schema candidates detected based on your file structure
                    </CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowSchemaDetails(true)}
                  >
                    <Info className="w-4 h-4 mr-2" />
                    View Schema Details
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {mockSchemas.map((schema, index) => (
                    <SchemaCandidateCard
                      key={index}
                      schema={schema}
                      selected={selectedSchema === index}
                      onSelect={() => setSelectedSchema(index)}
                    />
                  ))}
                </div>

                {selectedSchema !== null && (
                  <div className="mt-6 flex justify-end">
                    <Button size="lg" onClick={handleContinue}>
                      Continue to Field Mapping
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {selectedSchema !== null && (
        <SchemaDetailsModal
          open={showSchemaDetails}
          onOpenChange={setShowSchemaDetails}
          schemaName={mockSchemas[selectedSchema].name}
          schemaVersion={mockSchemas[selectedSchema].version}
        />
      )}
    </div>
  );
};

export default UploadPage;
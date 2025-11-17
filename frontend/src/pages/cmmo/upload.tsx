import { useState } from 'react';
import { Upload, FileText, CheckCircle, Info, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/header';
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
      <Header />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Upload Metadata
          </h1>
          <p className="text-gray-600">
            Upload your metadata file to begin the harmonization process
          </p>
        </div>

        <WorkflowStepper steps={steps} currentStep={0} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          {/* Upload Section */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Upload File</CardTitle>
                <CardDescription>
                  Supported formats: CSV, TSV, XLSX (up to 200,000 rows)
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!fileUploaded ? (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-16 text-center hover:border-primary transition-colors cursor-pointer bg-gray-50">
                    <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2 font-medium">
                      Drag and drop your file here
                    </p>
                    <p className="text-sm text-gray-500 mb-6">
                      or click to browse
                    </p>
                    <Button onClick={handleFileUpload} size="lg">
                      Select File
                    </Button>
                  </div>
                ) : (
                  <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
                    <div className="flex items-start gap-4">
                      <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-3">
                          <FileText className="w-5 h-5 text-gray-600" />
                          <span className="font-semibold text-gray-900">
                            {mockUploadedFile.name}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">Size:</span>
                            <span className="ml-2 font-medium">{(mockUploadedFile.size / 1024 / 1024).toFixed(2)} MB</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Type:</span>
                            <span className="ml-2 font-medium">{mockUploadedFile.type}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Rows:</span>
                            <span className="ml-2 font-medium">{mockUploadedFile.rows.toLocaleString()}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Columns:</span>
                            <span className="ml-2 font-medium">{mockUploadedFile.columns}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Schema Detection */}
            {fileUploaded && (
              <Card className="mt-6">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Schema Detection</CardTitle>
                      <CardDescription>
                        AI-powered schema detection identified these candidates
                      </CardDescription>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowSchemaDetails(true)}
                    >
                      <Info className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
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
                    <div className="mt-6 pt-6 border-t flex justify-end">
                      <Button size="lg" onClick={handleContinue}>
                        Continue to Field Mapping
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">File Requirements</CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Supported Formats</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• CSV (Comma-separated values)</li>
                    <li>• TSV (Tab-separated values)</li>
                    <li>• XLSX (Excel workbook)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Size Limits</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Maximum 200,000 rows</li>
                    <li>• Maximum 100 MB file size</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Encoding</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• UTF-8 (recommended)</li>
                    <li>• ISO-8859-1</li>
                    <li>• Windows-1252</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="border-blue-200 bg-blue-50">
              <CardContent className="p-4">
                <div className="flex gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-semibold text-blue-900 mb-1">Data Privacy</p>
                    <p className="text-blue-800">
                      Your data is processed securely and never stored permanently. 
                      All files are deleted after processing.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
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
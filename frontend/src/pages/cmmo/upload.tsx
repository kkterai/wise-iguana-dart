import { useState } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Header } from '@/components/header';
import { WorkflowStepper } from '@/components/workflow-stepper';
import { predefinedSchemas, mockUploadedFile } from '@/data/mockData';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const UploadPage = () => {
  const navigate = useNavigate();
  const [fileUploaded, setFileUploaded] = useState(false);
  const [selectedSchema, setSelectedSchema] = useState<string>('');

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
    if (selectedSchema) {
      const schema = predefinedSchemas.find(s => s.id === selectedSchema);
      toast.success('Schema selected', {
        description: `Proceeding with ${schema?.name}`
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
            Upload your CSV metadata file and select the appropriate schema template
          </p>
        </div>

        <WorkflowStepper steps={steps} currentStep={0} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          {/* Upload Section */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Step 1: Upload CSV File</CardTitle>
                <CardDescription>
                  Upload a clean, standard CSV file (UTF-8 encoding, up to 200,000 rows)
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!fileUploaded ? (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-16 text-center hover:border-primary transition-colors cursor-pointer bg-gray-50">
                    <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2 font-medium">
                      Drag and drop your CSV file here
                    </p>
                    <p className="text-sm text-gray-500 mb-6">
                      or click to browse
                    </p>
                    <Button onClick={handleFileUpload} size="lg">
                      Select CSV File
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
                            <span className="ml-2 font-medium">CSV</span>
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

            {/* Schema Selection */}
            {fileUploaded && (
              <Card>
                <CardHeader>
                  <CardTitle>Step 2: Select Schema Template</CardTitle>
                  <CardDescription>
                    Choose the schema template that matches your data source
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">
                        Schema Template
                      </label>
                      <Select value={selectedSchema} onValueChange={setSelectedSchema}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a schema template..." />
                        </SelectTrigger>
                        <SelectContent>
                          {predefinedSchemas.map((schema) => (
                            <SelectItem key={schema.id} value={schema.id}>
                              <div className="flex flex-col">
                                <span className="font-medium">{schema.name}</span>
                                <span className="text-xs text-gray-500">{schema.vendor}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {selectedSchema && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <p className="text-sm text-blue-900">
                          <strong>Selected:</strong> {predefinedSchemas.find(s => s.id === selectedSchema)?.name}
                        </p>
                        <p className="text-xs text-blue-700 mt-1">
                          You will map your CSV columns to the required fields in this schema on the next step.
                        </p>
                      </div>
                    )}

                    {selectedSchema && (
                      <div className="pt-4 border-t flex justify-end">
                        <Button size="lg" onClick={handleContinue}>
                          Continue to Field Mapping
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">CSV File Requirements</CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Format</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Standard CSV (comma-separated)</li>
                    <li>• UTF-8 encoding required</li>
                    <li>• First row must be column headers</li>
                    <li>• No merged cells or formulas</li>
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
                  <h4 className="font-semibold text-gray-900 mb-2">Preparing Your File</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Export from Excel as CSV (UTF-8)</li>
                    <li>• Remove any formatting or formulas</li>
                    <li>• Ensure clean, standard structure</li>
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

            <Card className="border-gray-200 bg-gray-50">
              <CardContent className="p-4">
                <div className="text-sm">
                  <p className="font-semibold text-gray-900 mb-2">Need Help?</p>
                  <p className="text-gray-600 mb-3">
                    If you're unsure which schema to select, consult your data source documentation or contact support.
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    View Schema Documentation
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
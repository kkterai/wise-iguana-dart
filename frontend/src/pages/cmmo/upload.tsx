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
      toast.success('Template selected', {
        description: `Proceeding with ${schema?.name}`
      });
      navigate('/cmmo/mapping');
    }
  };

  const groupedSchemas = predefinedSchemas.reduce((acc, schema) => {
    if (!acc[schema.category]) {
      acc[schema.category] = [];
    }
    acc[schema.category].push(schema);
    return acc;
  }, {} as Record<string, typeof predefinedSchemas>);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F3FF] via-[#EDE9FE] to-[#E0E7FF]">
      <Header />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Upload Metadata
          </h1>
          <p className="text-gray-700">
            Upload your CSV metadata file and manually select the appropriate schema template
          </p>
        </div>

        <WorkflowStepper steps={steps} currentStep={0} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          {/* Upload Section */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-gray-900">Step 1: Upload CSV File</CardTitle>
                <CardDescription className="text-gray-600">
                  Upload a clean, standard CSV file (UTF-8 encoding, up to 200,000 rows)
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!fileUploaded ? (
                  <div className="border-2 border-dashed border-[#DDD6FE] rounded-lg p-16 text-center hover:border-[#6366F1] transition-colors cursor-pointer bg-white">
                    <Upload className="w-16 h-16 text-[#6366F1]/40 mx-auto mb-4" />
                    <p className="text-gray-900 mb-2 font-medium">
                      Drag and drop your CSV file here
                    </p>
                    <p className="text-sm text-gray-600 mb-6">
                      or click to browse
                    </p>
                    <Button onClick={handleFileUpload} size="lg" className="gradient-primary text-white">
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
                            <span className="ml-2 font-medium text-gray-900">{(mockUploadedFile.size / 1024 / 1024).toFixed(2)} MB</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Type:</span>
                            <span className="ml-2 font-medium text-gray-900">CSV (UTF-8)</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Rows:</span>
                            <span className="ml-2 font-medium text-gray-900">{mockUploadedFile.rows.toLocaleString()}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Columns:</span>
                            <span className="ml-2 font-medium text-gray-900">{mockUploadedFile.columns}</span>
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
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-gray-900">Step 2: Select Schema Template</CardTitle>
                  <CardDescription className="text-gray-600">
                    Manually choose the schema template that matches your data source
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-900 mb-2 block">
                        Schema Template
                      </label>
                      <Select value={selectedSchema} onValueChange={setSelectedSchema}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a schema template..." />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(groupedSchemas).map(([category, schemas]) => (
                            <div key={category}>
                              <div className="px-2 py-1.5 text-xs font-semibold text-gray-600 uppercase">
                                {category}
                              </div>
                              {schemas.map((schema) => (
                                <SelectItem key={schema.id} value={schema.id}>
                                  <div className="flex flex-col">
                                    <span className="font-medium">{schema.name}</span>
                                    <span className="text-xs text-gray-600">{schema.vendor}</span>
                                  </div>
                                </SelectItem>
                              ))}
                            </div>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {selectedSchema && (
                      <div className="bg-[#EDE9FE] border border-[#DDD6FE] rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-[#6366F1] mt-0.5 flex-shrink-0" />
                          <div className="flex-1">
                            <p className="text-sm text-gray-900 font-medium mb-1">
                              Template Selected: {predefinedSchemas.find(s => s.id === selectedSchema)?.name}
                            </p>
                            <p className="text-xs text-gray-700">
                              You will manually map your CSV columns to the required fields in this template on the next step.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {selectedSchema && (
                      <div className="pt-4 border-t flex justify-end">
                        <Button size="lg" onClick={handleContinue} className="gradient-primary text-white">
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
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-base text-gray-900">CSV File Requirements</CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Format</h4>
                  <ul className="space-y-1 text-gray-700">
                    <li>• Standard CSV (comma-separated)</li>
                    <li>• UTF-8 encoding required</li>
                    <li>• First row must be column headers</li>
                    <li>• No merged cells or formulas</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Size Limits</h4>
                  <ul className="space-y-1 text-gray-700">
                    <li>• Maximum 200,000 rows</li>
                    <li>• Maximum 100 MB file size</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Preparing Your File</h4>
                  <ul className="space-y-1 text-gray-700">
                    <li>• Export from Excel as CSV (UTF-8)</li>
                    <li>• Remove any formatting or formulas</li>
                    <li>• Ensure clean, standard structure</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="border-yellow-200 bg-yellow-50 shadow-lg">
              <CardContent className="p-4">
                <div className="flex gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-semibold text-yellow-900 mb-1">Manual Template Selection</p>
                    <p className="text-yellow-800">
                      You must manually select the correct schema template. No automated detection is performed 
                      to ensure deterministic, reproducible results.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-[#DDD6FE] bg-[#EDE9FE] shadow-lg">
              <CardContent className="p-4">
                <div className="flex gap-3">
                  <AlertCircle className="w-5 h-5 text-[#6366F1] flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-semibold text-gray-900 mb-1">Data Privacy</p>
                    <p className="text-gray-700">
                      Your data is processed securely and never stored permanently. 
                      All files are deleted after processing.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white shadow-lg">
              <CardContent className="p-4">
                <div className="text-sm">
                  <p className="font-semibold text-gray-900 mb-2">Need Help?</p>
                  <p className="text-gray-700 mb-3">
                    Consult your data source documentation to determine the correct schema template, 
                    or contact support for guidance.
                  </p>
                  <Button variant="outline" size="sm" className="w-full border-[#6366F1] text-[#6366F1] hover:bg-[#6366F1]/5">
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
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { Upload, Database, CheckCircle, Download, Shield, Zap } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Database,
      title: 'Canonical Identifiers',
      description: 'Enforces canonical IDs across Specimen, Block, Slide, ROI/Well, Library, and Run entities'
    },
    {
      icon: CheckCircle,
      title: 'Deterministic Validation',
      description: 'Rules-based validation engine with no heuristics - reproducible results every time'
    },
    {
      icon: Shield,
      title: 'Referential Integrity',
      description: 'Validates entity relationships and ensures complete chain of identity'
    },
    {
      icon: Zap,
      title: 'Fast Processing',
      description: 'Handles up to 200k rows with validation in under 5 seconds'
    }
  ];

  const workflow = [
    { step: 1, name: 'Upload', description: 'Upload CSV, TSV, or XLSX metadata files' },
    { step: 2, name: 'Map', description: 'Map source fields to canonical schema' },
    { step: 3, name: 'Harmonize', description: 'Generate canonical identifiers and relationships' },
    { step: 4, name: 'Validate', description: 'Run deterministic validation rules' },
    { step: 5, name: 'Export', description: 'Download harmonized bundle with audit trail' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Cross-Platform Multiomic<br />Metadata Orchestrator
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Deterministic metadata harmonization for FFPE-based multiomic studies across spatial transcriptomics, 
            sequencing, and library-preparation platforms
          </p>
          <Button size="lg" onClick={() => navigate('/cmmo/upload')} className="text-lg px-8 py-6">
            <Upload className="w-5 h-5 mr-2" />
            Start Harmonization
          </Button>
        </div>

        {/* Problem Statement */}
        <Card className="mb-16 border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-900">The Problem</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-red-800">
              <div>
                <h4 className="font-semibold mb-2">Fragmented Metadata</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Misaligned Sample_IDs across modalities</li>
                  <li>Inconsistent Block/Slide identifiers</li>
                  <li>Orphaned Library_IDs and Run_IDs</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Operational Failures</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Manual renaming and restructuring</li>
                  <li>Failed vendor validation steps</li>
                  <li>Reduced reproducibility</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <feature.icon className="w-10 h-10 text-blue-600 mb-4" />
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Workflow */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Workflow</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {workflow.map((item, index) => (
              <Card key={index} className="relative">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-semibold mb-2">{item.name}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Supported Platforms */}
        <Card>
          <CardHeader>
            <CardTitle>Supported Platforms</CardTitle>
            <CardDescription>
              Harmonizes metadata across leading spatial and sequencing platforms
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="font-semibold">CosMx</div>
                <div className="text-xs text-gray-500">Spatial Transcriptomics</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="font-semibold">GeoMx</div>
                <div className="text-xs text-gray-500">Digital Spatial Profiler</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="font-semibold">Visium HD</div>
                <div className="text-xs text-gray-500">10x Genomics</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="font-semibold">Xenium</div>
                <div className="text-xs text-gray-500">10x Genomics</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="font-semibold">MERSCOPE</div>
                <div className="text-xs text-gray-500">Vizgen</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="font-semibold">Illumina</div>
                <div className="text-xs text-gray-500">Sequencing</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="font-semibold">10x Genomics</div>
                <div className="text-xs text-gray-500">Library Prep</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="font-semibold">Bulk RNA-seq</div>
                <div className="text-xs text-gray-500">Sequencing</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center mt-16">
          <h2 className="text-2xl font-bold mb-4">Ready to harmonize your metadata?</h2>
          <Button size="lg" onClick={() => navigate('/cmmo/upload')} className="text-lg px-8 py-6">
            <Upload className="w-5 h-5 mr-2" />
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
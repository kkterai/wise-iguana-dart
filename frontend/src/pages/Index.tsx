import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { Upload, Database, CheckCircle, Shield, Zap, AlertTriangle, Clock, TrendingDown } from 'lucide-react';

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

  const impacts = [
    {
      icon: Clock,
      stat: '40%',
      label: 'Time Lost',
      description: 'Researchers spend nearly half their time on manual data wrangling instead of analysis'
    },
    {
      icon: TrendingDown,
      stat: '30%',
      label: 'Failed Studies',
      description: 'Multiomic studies fail or produce unreliable results due to metadata inconsistencies'
    },
    {
      icon: AlertTriangle,
      stat: '6-12 mo',
      label: 'Delayed Discovery',
      description: 'Critical insights delayed by months due to inability to integrate cross-platform data'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Multiomic Data Orchestrator
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

        {/* Problem Statement - Enhanced */}
        <Card className="mb-8 border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-900 text-2xl">The Problem</CardTitle>
            <CardDescription className="text-red-800 text-base">
              Significant blockers to unifying data across modalities and vendors slow discovery and translation of those discoveries to new treatments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-red-900 mb-3 text-lg flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Fragmented Metadata
                </h4>
                <ul className="space-y-2 text-red-800">
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-1">•</span>
                    <div>
                      <strong>Misaligned Sample_IDs across modalities:</strong> Same specimen tracked with different identifiers in spatial transcriptomics, sequencing, and library prep systems
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-1">•</span>
                    <div>
                      <strong>Inconsistent Block/Slide identifiers:</strong> FFPE blocks and slides lack standardized naming conventions, breaking traceability chains
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-1">•</span>
                    <div>
                      <strong>Orphaned Library_IDs and Run_IDs:</strong> Sequencing data cannot be reliably linked back to source specimens and ROIs
                    </div>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-red-900 mb-3 text-lg flex items-center gap-2">
                  <TrendingDown className="w-5 h-5" />
                  Operational Failures
                </h4>
                <ul className="space-y-2 text-red-800">
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-1">•</span>
                    <div>
                      <strong>Manual renaming and restructuring:</strong> Researchers spend weeks manually reformatting metadata to meet vendor requirements
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-1">•</span>
                    <div>
                      <strong>Failed vendor validation steps:</strong> Submissions rejected due to format mismatches, delaying experiments by months
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-1">•</span>
                    <div>
                      <strong>Reduced reproducibility:</strong> Published studies cannot be replicated because metadata provenance is lost or ambiguous
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Impact Section - New */}
        <Card className="mb-16 border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="text-orange-900 text-2xl">Real-World Impact</CardTitle>
            <CardDescription className="text-orange-800 text-base">
              The cost of metadata fragmentation on translational research and patient outcomes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {impacts.map((impact, index) => (
                <div key={index} className="bg-white rounded-lg p-6 border border-orange-200">
                  <div className="flex items-center gap-3 mb-3">
                    <impact.icon className="w-8 h-8 text-orange-600" />
                    <div className="text-3xl font-bold text-orange-900">{impact.stat}</div>
                  </div>
                  <div className="font-semibold text-orange-900 mb-2">{impact.label}</div>
                  <p className="text-sm text-orange-800">{impact.description}</p>
                </div>
              ))}
            </div>
            
            <div className="bg-white rounded-lg p-6 border border-orange-200">
              <h4 className="font-semibold text-orange-900 mb-3 text-lg">The Translation Gap</h4>
              <p className="text-orange-800 mb-3">
                When researchers cannot reliably integrate data from CosMx spatial transcriptomics, Illumina sequencing, 
                and 10x Genomics library prep, critical biological insights remain hidden. Each failed integration attempt:
              </p>
              <ul className="space-y-2 text-orange-800">
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-1">→</span>
                  <span>Delays identification of therapeutic targets by 6-12 months</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-1">→</span>
                  <span>Wastes expensive multiomic data that cannot be properly analyzed</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-1">→</span>
                  <span>Forces researchers to repeat experiments, consuming limited patient samples</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-1">→</span>
                  <span>Prevents validation of findings across independent cohorts and platforms</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-4">The Solution</h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Multiomic Data Orchestrator provides deterministic, reproducible metadata harmonization that eliminates manual data wrangling 
            and ensures reliable cross-platform integration
          </p>
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
        <Card className="mb-16">
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

        {/* Value Proposition */}
        <Card className="mb-16 border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="text-green-900 text-2xl">Accelerate Discovery</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-green-800">
              <div>
                <div className="text-3xl font-bold text-green-900 mb-2">Weeks → Hours</div>
                <p className="text-sm">Reduce metadata preparation time from weeks of manual work to hours of automated processing</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-900 mb-2">100% Reproducible</div>
                <p className="text-sm">Deterministic validation ensures identical results every time, enabling true reproducibility</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-900 mb-2">Zero Vendor Failures</div>
                <p className="text-sm">Pre-validated metadata passes vendor requirements on first submission, eliminating delays</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to harmonize your metadata?</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Stop wasting time on manual data wrangling. Start integrating your multiomic data reliably and reproducibly.
          </p>
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
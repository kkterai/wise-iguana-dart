import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/header';
import { Upload, Database, CheckCircle, Shield, Zap, ArrowRight } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Database,
      title: 'Canonical Identifiers',
      description: 'Enforces canonical IDs across Specimen, Block, Slide, ROI/FOV, Library, and Run entities for complete traceability'
    },
    {
      icon: CheckCircle,
      title: 'Deterministic Validation',
      description: 'Rules-based validation engine with zero heuristics ensures reproducible results every time'
    },
    {
      icon: Shield,
      title: 'Referential Integrity',
      description: 'Validates entity relationships and ensures complete chain of custody across all modalities'
    },
    {
      icon: Zap,
      title: 'Template-Driven Workflow',
      description: 'Manual template selection and mapping ensures expert control and regulatory compliance'
    }
  ];

  const platforms = [
    { name: 'Illumina NGS', vendor: 'Illumina', category: 'Sequencing', priority: true },
    { name: '10x Single-Cell', vendor: '10x Genomics', category: 'Single-Cell', priority: true },
    { name: '10x Multiome', vendor: '10x Genomics', category: 'Single-Cell', priority: true },
    { name: 'CosMx', vendor: 'Bruker (NanoString)', category: 'Spatial', priority: true },
    { name: 'GeoMx DSP', vendor: 'Bruker (NanoString)', category: 'Spatial', priority: true },
    { name: 'Visium HD', vendor: '10x Genomics', category: 'Spatial', priority: true },
    { name: 'Xenium', vendor: '10x Genomics', category: 'Spatial', priority: true },
    { name: 'NovaSeq', vendor: 'Illumina', category: 'Sequencing', priority: false },
    { name: 'NextSeq', vendor: 'Illumina', category: 'Sequencing', priority: false }
  ];

  const workflow = [
    { step: 1, name: 'Upload', description: 'Upload CSV metadata file' },
    { step: 2, name: 'Select Template', description: 'Choose schema template' },
    { step: 3, name: 'Map Fields', description: 'Map to canonical schema' },
    { step: 4, name: 'Harmonize', description: 'Generate canonical identifiers' },
    { step: 5, name: 'Validate', description: 'Deterministic validation' },
    { step: 6, name: 'Export', description: 'Download harmonized bundle' }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-white to-primary/5">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Multiomic Data Orchestrator
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Deterministic metadata harmonization for Illumina-based NGS, 10x Genomics single-cell, 
              and leading spatial platforms. Unify data across sequencing and spatial modalities 
              with reproducible, validated results.
            </p>
            <div className="flex items-center gap-4">
              <Button 
                size="lg" 
                onClick={() => navigate('/cmmo/upload')}
                className="bg-primary hover:bg-primary/90 text-lg px-8 h-12"
              >
                <Upload className="w-5 h-5 mr-2" />
                Start Harmonization
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="text-lg px-8 h-12"
              >
                View Documentation
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              The Challenge
            </h2>
            <p className="text-lg text-gray-600">
              Fragmented metadata across Illumina sequencing, 10x single-cell, and spatial platforms 
              creates significant blockers to data integration, slowing discovery and delaying translation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6">
                <div className="text-4xl font-bold text-primary mb-2">40%</div>
                <div className="font-semibold text-gray-900 mb-2">Time Lost</div>
                <p className="text-sm text-gray-600">
                  Researchers spend nearly half their time on manual data wrangling instead of analysis
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="text-4xl font-bold text-primary mb-2">30%</div>
                <div className="font-semibold text-gray-900 mb-2">Failed Studies</div>
                <p className="text-sm text-gray-600">
                  Multiomic studies fail or produce unreliable results due to metadata inconsistencies
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="text-4xl font-bold text-primary mb-2">6-12mo</div>
                <div className="font-semibold text-gray-900 mb-2">Delayed Discovery</div>
                <p className="text-sm text-gray-600">
                  Critical insights delayed by months due to inability to integrate cross-platform data
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Enterprise-Grade Harmonization
            </h2>
            <p className="text-lg text-gray-600">
              Deterministic, reproducible metadata harmonization that eliminates manual data wrangling
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-2 hover:border-primary/50 transition-colors">
                <CardContent className="p-8">
                  <feature.icon className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Streamlined Workflow
            </h2>
            <p className="text-lg text-gray-600">
              Six simple steps from raw CSV metadata to validated, harmonized data
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {workflow.map((item, index) => (
              <div key={index} className="relative">
                <Card className="h-full">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                      {item.step}
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{item.name}</h3>
                    <p className="text-xs text-gray-600">{item.description}</p>
                  </CardContent>
                </Card>
                {index < workflow.length - 1 && (
                  <ArrowRight className="hidden lg:block absolute top-1/2 -right-6 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Supported Platforms */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Supported Platforms
            </h2>
            <p className="text-lg text-gray-600">
              Harmonize metadata across Illumina NGS, 10x Genomics, and leading spatial platforms
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {platforms.filter(p => p.priority).map((platform, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow border-2 border-primary/20">
                <CardContent className="p-6 text-center">
                  <div className="font-semibold text-gray-900 mb-1">{platform.name}</div>
                  <div className="text-xs text-gray-500 mb-2">{platform.vendor}</div>
                  <div className="text-xs text-primary font-medium">{platform.category}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 mb-4">Additional platforms supported:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {platforms.filter(p => !p.priority).map((platform, index) => (
                <Card key={index} className="inline-block">
                  <CardContent className="p-3">
                    <span className="text-xs font-medium text-gray-700">{platform.name}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Harmonize Your Metadata?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Stop wasting time on manual data wrangling. Start integrating your Illumina, 10x, 
            and spatial data reliably and reproducibly.
          </p>
          <Button 
            size="lg" 
            onClick={() => navigate('/cmmo/upload')}
            className="bg-white text-primary hover:bg-gray-100 text-lg px-8 h-12"
          >
            <Upload className="w-5 h-5 mr-2" />
            Get Started
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Database className="w-6 h-6" />
                <span className="font-semibold text-lg">MDO</span>
              </div>
              <p className="text-sm text-gray-400">
                Multiomic Data Orchestrator - Enterprise metadata harmonization for Illumina, 10x, and spatial platforms
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">Workflow</a></li>
                <li><a href="#" className="hover:text-white">Platforms</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">Documentation</a></li>
                <li><a href="#" className="hover:text-white">API Reference</a></li>
                <li><a href="#" className="hover:text-white">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
                <li><a href="#" className="hover:text-white">Privacy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            © 2024 Multiomic Data Orchestrator. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/header';
import { Upload, Database, CheckCircle, Shield, Zap, ArrowRight, Sparkles, TrendingUp } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Database,
      title: 'Canonical Identifiers',
      description: 'Enforces canonical IDs across Specimen, Block, Slide, ROI/FOV, Library, and Run entities for complete traceability',
      gradient: 'from-[#3B82F6] to-[#2563EB]'
    },
    {
      icon: CheckCircle,
      title: 'Deterministic Validation',
      description: 'Rules-based validation engine with zero heuristics ensures reproducible results every time',
      gradient: 'from-[#60A5FA] to-[#3B82F6]'
    },
    {
      icon: Shield,
      title: 'Referential Integrity',
      description: 'Validates entity relationships and ensures complete chain of custody across all modalities',
      gradient: 'from-[#2563EB] to-[#1D4ED8]'
    },
    {
      icon: Zap,
      title: 'Template-Driven Workflow',
      description: 'Manual template selection and mapping ensures expert control and regulatory compliance',
      gradient: 'from-[#1E40AF] to-[#2563EB]'
    }
  ];

  const platforms = [
    { name: 'Illumina NGS', vendor: 'Illumina', category: 'Sequencing', priority: true },
    { name: '10x Single-Cell', vendor: '10x Genomics', category: 'Single-Cell', priority: true },
    { name: '10x Multiome', vendor: '10x Genomics', category: 'Single-Cell', priority: true },
    { name: 'CosMx', vendor: 'Bruker (NanoString)', category: 'Spatial', priority: true },
    { name: 'GeoMx DSP', vendor: 'Bruker (NanoString)', category: 'Spatial', priority: true },
    { name: 'Visium HD', vendor: '10x Genomics', category: 'Spatial', priority: true },
    { name: 'Xenium', vendor: '10x Genomics', category: 'Spatial', priority: true }
  ];

  const workflow = [
    { step: 1, name: 'Upload', description: 'Upload CSV metadata file', icon: Upload },
    { step: 2, name: 'Select Template', description: 'Choose schema template', icon: Database },
    { step: 3, name: 'Map Fields', description: 'Map to canonical schema', icon: ArrowRight },
    { step: 4, name: 'Harmonize', description: 'Generate canonical identifiers', icon: Sparkles },
    { step: 5, name: 'Validate', description: 'Deterministic validation', icon: CheckCircle },
    { step: 6, name: 'Export', description: 'Download harmonized bundle', icon: TrendingUp }
  ];

  const stats = [
    { value: '40%', label: 'Time Saved', description: 'Reduction in manual data wrangling' },
    { value: '98%', label: 'First-Try Success', description: 'Exports load without errors' },
    { value: '0', label: 'Heuristics', description: 'Fully deterministic validation' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EFF6FF] via-[#DBEAFE] to-[#BFDBFE]">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMzQjgyRjYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-40" />
        
        <div className="relative max-w-7xl mx-auto px-6 py-24 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm text-[#3B82F6] text-sm font-medium mb-8 border border-[#BFDBFE] shadow-sm">
              <Sparkles className="w-4 h-4" />
              <span>Enterprise Metadata Harmonization</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Multiomic Data
              <span className="block bg-gradient-to-r from-[#3B82F6] via-[#2563EB] to-[#1D4ED8] bg-clip-text text-transparent">
                Orchestrator
              </span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-gray-700 mb-10 leading-relaxed max-w-3xl mx-auto">
              Deterministic metadata harmonization for Illumina-based NGS, 10x Genomics single-cell, 
              and leading spatial platforms. Unify data across sequencing and spatial modalities 
              with reproducible, validated results.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                size="lg" 
                onClick={() => navigate('/cmmo/upload')}
                className="gradient-primary text-white text-lg px-8 h-14 rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105"
              >
                <Upload className="w-5 h-5 mr-2" />
                Start Harmonization
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="text-lg px-8 h-14 rounded-xl border-2 border-[#3B82F6] text-[#3B82F6] hover:bg-[#3B82F6]/5 bg-white/80 backdrop-blur-sm"
              >
                View Documentation
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#3B82F6] to-[#2563EB] bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-lg font-semibold text-gray-900 mb-1">{stat.label}</div>
                  <div className="text-sm text-gray-600">{stat.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              The Challenge
            </h2>
            <p className="text-xl text-gray-700 leading-relaxed">
              Fragmented metadata across Illumina sequencing, 10x single-cell, and spatial platforms 
              creates significant blockers to data integration, slowing discovery and delaying translation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-xl card-hover bg-gradient-to-br from-red-50 to-orange-50">
              <CardContent className="p-8">
                <div className="text-5xl font-bold text-red-600 mb-3">40%</div>
                <div className="text-xl font-semibold text-gray-900 mb-3">Time Lost</div>
                <p className="text-gray-700 leading-relaxed">
                  Researchers spend nearly half their time on manual data wrangling instead of analysis
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl card-hover bg-gradient-to-br from-orange-50 to-yellow-50">
              <CardContent className="p-8">
                <div className="text-5xl font-bold text-orange-600 mb-3">30%</div>
                <div className="text-xl font-semibold text-gray-900 mb-3">Failed Studies</div>
                <p className="text-gray-700 leading-relaxed">
                  Multiomic studies fail or produce unreliable results due to metadata inconsistencies
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl card-hover bg-gradient-to-br from-[#DBEAFE] to-[#BFDBFE]">
              <CardContent className="p-8">
                <div className="text-5xl font-bold text-[#3B82F6] mb-3">6-12mo</div>
                <div className="text-xl font-semibold text-gray-900 mb-3">Delayed Discovery</div>
                <p className="text-gray-700 leading-relaxed">
                  Critical insights delayed by months due to inability to integrate cross-platform data
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-gradient-to-br from-[#EFF6FF] to-[#DBEAFE]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Enterprise-Grade Harmonization
            </h2>
            <p className="text-xl text-gray-700 leading-relaxed">
              Deterministic, reproducible metadata harmonization that eliminates manual data wrangling
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-xl card-hover bg-white overflow-hidden group">
                <CardContent className="p-8">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-700 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Streamlined Workflow
            </h2>
            <p className="text-xl text-gray-700 leading-relaxed">
              Six simple steps from raw CSV metadata to validated, harmonized data
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workflow.map((item, index) => (
              <Card key={index} className="border-0 shadow-lg card-hover bg-white relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#DBEAFE] to-[#BFDBFE] rounded-bl-full transform translate-x-8 -translate-y-8 group-hover:scale-150 transition-transform" />
                <CardContent className="p-8 relative">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 gradient-primary text-white rounded-xl flex items-center justify-center text-xl font-bold shadow-lg">
                      {item.step}
                    </div>
                    <item.icon className="w-6 h-6 text-[#3B82F6]/40" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.name}</h3>
                  <p className="text-gray-700">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Supported Platforms */}
      <section className="py-24 bg-gradient-to-br from-[#EFF6FF] to-[#DBEAFE]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Supported Platforms
            </h2>
            <p className="text-xl text-gray-700 leading-relaxed">
              Harmonize metadata across Illumina NGS, 10x Genomics, and leading spatial platforms
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {platforms.map((platform, index) => (
              <Card key={index} className="border-0 shadow-lg card-hover bg-white group">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-xl gradient-primary flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                    <Database className="w-6 h-6 text-white" />
                  </div>
                  <div className="font-semibold text-gray-900 mb-2">{platform.name}</div>
                  <div className="text-xs text-gray-600 mb-2">{platform.vendor}</div>
                  <div className="inline-block px-3 py-1 rounded-full bg-[#DBEAFE] text-[#3B82F6] text-xs font-medium">
                    {platform.category}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 gradient-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-40" />
        
        <div className="max-w-7xl mx-auto px-6 text-center relative">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Ready to Harmonize Your Metadata?
          </h2>
          <p className="text-xl mb-10 opacity-90 max-w-3xl mx-auto leading-relaxed">
            Stop wasting time on manual data wrangling. Start integrating your Illumina, 10x, 
            and spatial data reliably and reproducibly.
          </p>
          <Button 
            size="lg" 
            onClick={() => navigate('/cmmo/upload')}
            className="bg-white text-[#3B82F6] hover:bg-gray-100 text-lg px-10 h-14 rounded-xl shadow-2xl hover:shadow-3xl transition-all hover:scale-105"
          >
            <Upload className="w-5 h-5 mr-2" />
            Get Started Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-lg">
                  <Database className="w-6 h-6" />
                </div>
                <span className="font-bold text-xl">MDO</span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                Enterprise metadata harmonization for Illumina, 10x, and spatial platforms
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-lg">Product</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Workflow</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Platforms</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-lg">Resources</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API Reference</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-lg">Company</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>© 2024 Multiomic Data Orchestrator. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
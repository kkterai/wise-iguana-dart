import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';
import { Database } from 'lucide-react';

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <header className="bg-white/80 backdrop-blur-lg border-b border-[#BFDBFE] sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-12">
            <button 
              onClick={() => navigate('/')}
              className="flex items-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                <Database className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-[#3B82F6] to-[#2563EB] bg-clip-text text-transparent">MDO</span>
            </button>
            
            <nav className="hidden md:flex items-center gap-8">
              <button
                onClick={() => navigate('/')}
                className={`text-sm font-medium transition-colors ${
                  location.pathname === '/' 
                    ? 'text-[#3B82F6]' 
                    : 'text-gray-600 hover:text-[#3B82F6]'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => navigate('/cmmo/upload')}
                className={`text-sm font-medium transition-colors ${
                  location.pathname.startsWith('/cmmo') 
                    ? 'text-[#3B82F6]' 
                    : 'text-gray-600 hover:text-[#3B82F6]'
                }`}
              >
                Harmonize Data
              </button>
              <a
                href="#"
                className="text-sm font-medium text-gray-600 hover:text-[#3B82F6] transition-colors"
              >
                Documentation
              </a>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <Button 
              onClick={() => navigate('/cmmo/upload')}
              className="gradient-primary text-white shadow-lg hover:shadow-xl transition-all rounded-lg hover:scale-105"
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
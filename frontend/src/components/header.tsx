import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';
import { Database } from 'lucide-react';

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200/50 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-12">
            <button 
              onClick={() => navigate('/')}
              className="flex items-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                <Database className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">MDO</span>
            </button>
            
            <nav className="hidden md:flex items-center gap-8">
              <button
                onClick={() => navigate('/')}
                className={`text-sm font-medium transition-colors ${
                  location.pathname === '/' 
                    ? 'text-blue-600' 
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => navigate('/cmmo/upload')}
                className={`text-sm font-medium transition-colors ${
                  location.pathname.startsWith('/cmmo') 
                    ? 'text-blue-600' 
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                Harmonize Data
              </button>
              <a
                href="#"
                className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
              >
                Documentation
              </a>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <Button 
              onClick={() => navigate('/cmmo/upload')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all rounded-lg"
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
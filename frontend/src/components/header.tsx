import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';
import { Database } from 'lucide-react';

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <button 
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-primary hover:opacity-80 transition-opacity"
            >
              <Database className="w-6 h-6" />
              <span className="font-semibold text-lg">MDO</span>
            </button>
            
            <nav className="hidden md:flex items-center gap-6">
              <button
                onClick={() => navigate('/')}
                className={`text-sm font-medium transition-colors ${
                  location.pathname === '/' 
                    ? 'text-primary' 
                    : 'text-gray-600 hover:text-primary'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => navigate('/cmmo/upload')}
                className={`text-sm font-medium transition-colors ${
                  location.pathname.startsWith('/cmmo') 
                    ? 'text-primary' 
                    : 'text-gray-600 hover:text-primary'
                }`}
              >
                Harmonize Data
              </button>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <Button 
              onClick={() => navigate('/cmmo/upload')}
              className="bg-primary hover:bg-primary/90"
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Home } from 'lucide-react';

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>404 Not Found | Saisneha College of Nursing and Health Sciences</title>
      </Helmet>
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-6xl md:text-8xl font-bold text-[var(--color-medical-blue)] mb-4">404</h1>
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">Page Not Found</h2>
        <p className="text-gray-600 mb-8 max-w-md">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 bg-[var(--color-medical-blue)] text-white px-6 py-3 rounded-full hover:bg-blue-800 transition-colors duration-300 font-medium shadow-md"
        >
          <Home size={20} />
          Back to Homepage
        </Link>
      </div>
    </>
  );
};

export default NotFound;

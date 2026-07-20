import { Link } from 'react-router-dom';

export const NavigationBar = () => {
  return (
    <nav className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <span className="text-2xl">⚡</span>
          <span className="text-xl font-bold text-gray-900">Pokédex</span>
        </Link>
      </div>
    </nav>
  );
};

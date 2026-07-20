import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryProvider } from './providers/QueryProvider';
import { ErrorBoundary } from './boundaries/ErrorBoundary';
import { Home } from './components/pages/Home';
import { PokemonDetail } from './components/pages/PokemonDetail';

function App() {
  return (
    <ErrorBoundary>
      <QueryProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/pokemon/:id' element={<PokemonDetail />} />
          </Routes>
        </BrowserRouter>
      </QueryProvider>
    </ErrorBoundary>
  );
}

export default App;

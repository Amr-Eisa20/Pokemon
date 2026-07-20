import { useState } from 'react';
import { PokemonGrid } from '../organisms/PokemonGrid';
import { PaginationControls } from '../molecules/PaginationControls';
import { ErrorMessage } from '../molecules/ErrorMessage';
import { Spinner } from '../atoms/Spinner';
import { usePokemonList } from '../../hooks/usePokemonList';
import { usePokemonInfinite } from '../../hooks/usePokemonInfinite';
import { ITEMS_PER_PAGE } from '../../utils/constants';
import { NavigationBar } from '../organisms/NavigationBar';
import { PAGE_BACKGROUNDS, LAYOUT } from '../../utils/designSystem';

type ViewMode = 'pagination' | 'infinite';

const ViewModeToggle = ({ 
  currentMode, 
  onModeChange 
}: { 
  currentMode: ViewMode; 
  onModeChange: (mode: ViewMode) => void;
}) => (
  <div className="flex justify-center gap-2">
    <button
      onClick={() => onModeChange('pagination')}
      className={`px-6 py-3 rounded-lg font-medium transition-all ${
        currentMode === 'pagination'
          ? 'bg-gray-900 text-white shadow-lg'
          : 'bg-white text-gray-700 hover:bg-gray-50'
      }`}
    >
      Page Controls
    </button>
    <button
      onClick={() => onModeChange('infinite')}
      className={`px-6 py-3 rounded-lg font-medium transition-all ${
        currentMode === 'infinite'
          ? 'bg-gray-900 text-white shadow-lg'
          : 'bg-white text-gray-700 hover:bg-gray-50'
      }`}
    >
      Infinite Scroll
    </button>
  </div>
);

export const Home = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('pagination');
  const [page, setPage] = useState(1);

  const paginationQuery = usePokemonList(page);
  const infiniteQuery = usePokemonInfinite();

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (viewMode === 'pagination') {
    const { data, isLoading, isError, refetch } = paginationQuery;
    const totalPages = data ? Math.ceil(data.count / ITEMS_PER_PAGE) : 0;

    return (
      <div className={PAGE_BACKGROUNDS.blue}>
        <NavigationBar />
        <main className={LAYOUT.container}>
          <div className={LAYOUT.section}>
            <div className="text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 flex items-center justify-center gap-2">
                ⚡ Pokédex
              </h1>
              <p className="text-gray-600">Discover and explore Pokemon with page controls</p>
              
              <ViewModeToggle currentMode={viewMode} onModeChange={setViewMode} />
            </div>

            {isError && <ErrorMessage onRetry={() => refetch()} />}

            {!isError && (
              <>
                <PokemonGrid 
                  pokemon={data?.results || []} 
                  isLoading={isLoading} 
                />

                {data && (
                  <div className="space-y-4">
                    <PaginationControls
                      currentPage={page}
                      totalItems={data.count}
                      itemsPerPage={ITEMS_PER_PAGE}
                      onPageChange={handlePageChange}
                      isLoading={isLoading}
                    />
                    <p className="text-center text-gray-600 text-sm">
                      Page {page} of {totalPages} ({ITEMS_PER_PAGE} Pokemon shown)
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </main>
      </div>
    );
  }

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, refetch } = infiniteQuery;
  const allPokemon = data?.pages.flatMap((page) => page.results) || [];

  return (
    <div className={PAGE_BACKGROUNDS.green}>
      <NavigationBar />
      <main className={LAYOUT.container}>
        <div className={LAYOUT.section}>
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 flex items-center justify-center gap-2">
              ⚡ Pokédex
            </h1>
            <p className="text-gray-600">Discover and explore Pokemon with infinite scroll</p>
            
            <ViewModeToggle currentMode={viewMode} onModeChange={setViewMode} />
          </div>

          {isError && <ErrorMessage onRetry={() => refetch()} />}

          {!isError && (
            <>
              <PokemonGrid pokemon={allPokemon} isLoading={isLoading} />

              {isFetchingNextPage && (
                <div className="flex flex-col items-center gap-2 py-6">
                  <Spinner />
                  <p className="text-gray-600 font-medium">Loading more Pokemon...</p>
                </div>
              )}

              {hasNextPage && !isFetchingNextPage && (
                <div className="flex justify-center pt-4">
                  <button
                    onClick={() => fetchNextPage()}
                    className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-lg"
                  >
                    Load More
                  </button>
                </div>
              )}

              {!isLoading && (
                <p className="text-center text-gray-600 font-medium">
                  Showing {allPokemon.length} Pokemon
                </p>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

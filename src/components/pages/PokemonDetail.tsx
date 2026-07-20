import { useParams, useNavigate } from 'react-router-dom';
import { PokemonDetailCard } from '../organisms/PokemonDetailCard';
import { ErrorMessage } from '../molecules/ErrorMessage';
import { Spinner } from '../atoms/Spinner';
import { usePokemonDetail } from '../../hooks/usePokemonDetail';
import { NavigationBar } from '../organisms/NavigationBar';
import { PAGE_BACKGROUNDS, LAYOUT } from '../../utils/designSystem';

export const PokemonDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isLoading, isError, refetch } = usePokemonDetail(id!);

  if (isLoading) {
    return (
      <div className={PAGE_BACKGROUNDS.pink}>
        <NavigationBar />
        <main className={LAYOUT.container}>
          <div className="flex justify-center items-center min-h-[60vh]">
            <Spinner />
          </div>
        </main>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className={PAGE_BACKGROUNDS.pink}>
        <NavigationBar />
        <main className={LAYOUT.container}>
          <ErrorMessage onRetry={() => refetch()} />
        </main>
      </div>
    );
  }

  return (
    <div className={PAGE_BACKGROUNDS.pink}>
      <NavigationBar />
      <main className={LAYOUT.container}>
        <div className="space-y-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 font-medium transition-colors"
          >
            ← Back to List
          </button>
          <PokemonDetailCard pokemon={data} />
        </div>
      </main>
    </div>
  );
};
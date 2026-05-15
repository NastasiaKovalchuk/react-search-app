import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router';
import SearchSection from './Search/SearchSection';
import ResultsSection from './Results/ResultsSection';
import BuggyButton from './UI/BuggyButton';
import ErrorBoundary from './UI/ErrorBoundary';
import Pagination from './Pagination/Pagination';

export interface Character {
  id: number;
  name: string;
  species: string;
  status: string;
  image: string;
}

const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState<string>(
    () => searchParams.get('q') || localStorage.getItem('search_value') || ''
  );
  const [lastExecutedTerm, setLastExecutedTerm] = useState<string>('');
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [lastExecutedPage, setLastExecutedPage] = useState<number>(1);

  const currentPage = Number(searchParams.get('page')) || 1;

  const handleSearchChange = (value: string): void => {
    setSearchValue(value);
  };

  const searchCharacters = useCallback(
    async (page: number = 1): Promise<void> => {
      const trimmedTerm = searchValue.trim();

      if (
        trimmedTerm === lastExecutedTerm &&
        page === lastExecutedPage &&
        lastExecutedTerm !== ''
      ) {
        return;
      }

      setIsLoading(true);
      setErrorMessage(null);
      localStorage.setItem('search_value', trimmedTerm);

      try {
        const response = await fetch(
          `https://rickandmortyapi.com/api/character/?name=${trimmedTerm}&page=${page}`
        );

        if (response.status === 404) {
          setCharacters([]);
          setLastExecutedTerm(trimmedTerm);

          return;
        }

        if (!response.ok) {
          throw new Error('Something went wrong with the server');
        }

        const data = await response.json();
        setCharacters(data.results || []);
        setTotalPages(data.info?.pages || 1);
        setLastExecutedTerm(trimmedTerm);
        setLastExecutedPage(page);
      } catch {
        setCharacters([]);
        setLastExecutedTerm(trimmedTerm);
        setErrorMessage(
          'Ouch! The interdimensional portal is unstable. (API Error)'
        );
      } finally {
        setIsLoading(false);
      }
    },
    [searchValue, lastExecutedTerm, lastExecutedPage]
  );

  const handleSearchClick = (): void => {
    setSearchParams({
      q: searchValue,
      page: '1',
    });
  };

  const handlePageChange = (newPage: number): void => {
    setSearchParams({
      q: searchValue,
      page: String(newPage),
    });
  };

  useEffect(() => {
    const fetchCharacters = async () => {
      const page = Number(searchParams.get('page')) || 1;
      const query = searchParams.get('q') || '';

      setIsLoading(true);

      try {
        const response = await fetch(
          `https://rickandmortyapi.com/api/character/?name=${query}&page=${page}`
        );

        const data = await response.json();

        setCharacters(data.results || []);
        setTotalPages(data.info?.pages || 1);
      } catch {
        setCharacters([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCharacters();
  }, [searchParams]);

  return (
    <div className='min-h-screen bg-slate-950 text-slate-200 font-mono'>
      <header className='border-b-4 border-lime-500 bg-slate-900 shadow-[0_0_20px_rgba(132,204,22,0.3)]'>
        <div className='max-w-5xl mx-auto px-6 py-6'>
          <SearchSection
            value={searchValue}
            onSearchChange={handleSearchChange}
            onSearchClick={handleSearchClick}
          />
        </div>
      </header>

      <main className='max-w-5xl mx-auto px-6 py-8'>
        <ErrorBoundary>
          <BuggyButton />
          {!isLoading && characters.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
          <ResultsSection
            characters={characters}
            isLoading={isLoading}
            errorMessage={errorMessage}
          />
        </ErrorBoundary>
      </main>
    </div>
  );
};

export default HomePage;

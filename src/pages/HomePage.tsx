import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router';
import SearchSection from '../components/Search/SearchSection';
import ResultsSection from '../components/Results/ResultsSection';
import BuggyButton from '../components/UI/BuggyButton';
import ErrorBoundary from '../components/UI/ErrorBoundary';
import Pagination from '../components/Pagination/Pagination';
import { useLocalStorage } from '../hook/useLocalStorage.ts';

export interface Character {
  id: number;
  name: string;
  species: string;
  status: string;
  image: string;
}

const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [savedSearch, saveSearch] = useLocalStorage('search_value', '');

  const [searchValue, setSearchValue] = useState<string>(
    () => searchParams.get('q') || savedSearch
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

  const searchCharacters = async (page: number = 1): Promise<void> => {
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
  };

  const handleSearchClick = (): void => {
    const trimmed = searchValue.trim();

    saveSearch(trimmed);

    setSearchParams({
      q: trimmed,
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
    const page = Number(searchParams.get('page')) || 1;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    searchCharacters(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return (
    <div className='min-h-screen bg-slate-950 text-slate-200 font-mono'>
      <div className='max-w-5xl mx-auto px-6 py-1'>
        <SearchSection
          value={searchValue}
          onSearchChange={handleSearchChange}
          onSearchClick={handleSearchClick}
        />
      </div>

      <main className='max-w-5xl mx-auto px-6 py-1'>
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

import { useState, useEffect, useRef } from 'react';
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

export interface CharactersResponse {
  results: Character[];
  totalPages: number;
}

const fetchCharacters = async (
  name: string,
  page: number,
  signal?: AbortSignal
): Promise<CharactersResponse> => {
  const response = await fetch(
    `https://rickandmortyapi.com/api/character/?name=${name}&page=${page}`,
    { signal }
  );

  if (response.status === 404) {
    return {
      results: [],
      totalPages: 1,
    };
  }

  if (response.status === 429) {
    throw new Error('Too many requests');
  }

  if (!response.ok) {
    throw new Error('API Error');
  }

  const data = await response.json();

  return {
    results: data.results || [],
    totalPages: data.info?.pages || 1,
  };
};

const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [savedSearch, saveSearch] = useLocalStorage('search_value', '');

  const queryParam = searchParams.get('q');
  const pageParam = searchParams.get('page');

  const currentPage = Number(pageParam) || 1;
  const currentSearchTerm = queryParam !== null ? queryParam : savedSearch;

  const [searchValue, setSearchValue] = useState<string>(currentSearchTerm);

  const [characters, setCharacters] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number>(1);

  const abortControllerRef = useRef<AbortController | null>(null);

  const handleSearchChange = (value: string): void => {
    setSearchValue(value);
  };

  const handleSearchClick = (): void => {
    setSearchParams({
      q: searchValue.trim(),
      page: '1',
    });
  };

  const handlePageChange = (newPage: number): void => {
    setSearchParams({
      q: currentSearchTerm,
      page: String(newPage),
    });
  };

  useEffect((): void => {
    if (queryParam === null && savedSearch) {
      setSearchParams({
        q: savedSearch,
        page: '1',
      });
    }
  }, [queryParam, savedSearch, setSearchParams]);

  useEffect((): (() => void) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;

    const loadCharacters = async () => {
      setIsLoading(true);
      setErrorMessage(null);

      try {
        const data = await fetchCharacters(
          currentSearchTerm,
          currentPage,
          controller.signal
        );

        setCharacters(data.results);
        setTotalPages(data.totalPages);

        saveSearch(currentSearchTerm);
      } catch (error) {
        if (error.name === 'AbortError') return;
        setCharacters([]);
        setErrorMessage('Ouch! The interdimensional portal is unstable.');
      } finally {
        setIsLoading(false);
      }
    };

    loadCharacters();

    return (): void => {
      controller.abort();
    };
  }, [currentSearchTerm, currentPage, saveSearch]);

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

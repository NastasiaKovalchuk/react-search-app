import { useState, useEffect } from 'react';
import SearchSection from './components/Search/SearchSection';
import ResultsSection from './components/Results/ResultsSection';
import BuggyButton from './components/UI/BuggyButton';
import ErrorBoundary from './components/UI/ErrorBoundary';

export interface Character {
  id: number;
  name: string;
  species: string;
  status: string;
  image: string;
}

// interface AppState {
//   searchValue: string;
//   lastExecutedTerm: string;
//   characters: Character[];
//   isLoading: boolean;
//   errorMessage: string | null;
// }

const App = () => {
  const [searchValue, setSearchValue] = useState<string>(
    () => localStorage.getItem('search_value') || ''
  );
  const [lastExecutedTerm, setLastExecutedTerm] = useState<string>('');
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSearchChange = (value: string): void => {
    setSearchValue(value);
  };

  const searchCharacters = async (): Promise<void> => {
    const trimmedTerm = searchValue.trim();

    if (trimmedTerm === lastExecutedTerm && lastExecutedTerm !== '') {
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);
    localStorage.setItem('search_value', trimmedTerm);

    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character/?name=${trimmedTerm}&page=1`
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
      setLastExecutedTerm(trimmedTerm);
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
    searchCharacters();
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    searchCharacters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

export default App;

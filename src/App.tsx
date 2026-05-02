import { Component } from 'react';
import SearchSection from './components/SearchSection';
import ResultsSection from './components/ResultsSection';
import BuggyButton from './components/BuggyButton';
import ErrorBoundary from './components/ErrorBoundary';

export interface Character {
  id: number;
  name: string;
  species: string;
  status: string;
  image: string;
}

interface AppState {
  searchValue: string;
  lastExecutedTerm: string;
  characters: Character[];
  isLoading: boolean;
  errorMessage: string | null;
}

class App extends Component<object, AppState> {
  state: AppState = {
    searchValue: localStorage.getItem('search_value') || '',
    lastExecutedTerm: '',
    characters: [],
    isLoading: false,
    errorMessage: null,
  };

  handleSearchChange = (value: string): void => {
    this.setState({ searchValue: value });
  };

  searchCharacters = async (): Promise<void> => {
    const { searchValue, lastExecutedTerm } = this.state;
    const trimmedTerm = searchValue.trim();

    if (trimmedTerm === lastExecutedTerm && lastExecutedTerm !== '') {
      return;
    }

    this.setState({ isLoading: true, errorMessage: null });
    localStorage.setItem('search_value', trimmedTerm);

    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character/?name=${trimmedTerm}&page=1`
      );

      if (response.status === 404) {
        this.setState({
          characters: [],
          lastExecutedTerm: trimmedTerm,
          isLoading: false,
        });
        return;
      }

      if (!response.ok) {
        throw new Error('Something went wrong with the server');
      }

      const data = await response.json();

      this.setState({
        characters: data.results || [],
        lastExecutedTerm: trimmedTerm,
      });
    } catch {
      this.setState({
        characters: [],
        lastExecutedTerm: trimmedTerm,
        errorMessage:
          'Ouch! The interdimensional portal is unstable. (API Error)',
      });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleSearchClick = (): void => {
    this.searchCharacters();
  };

  componentDidMount(): void {
    this.searchCharacters();
  }

  render() {
    return (
      <div className='min-h-screen bg-slate-950 text-slate-200 font-mono'>
        <header className='border-b-4 border-lime-500 bg-slate-900 shadow-[0_0_20px_rgba(132,204,22,0.3)]'>
          <div className='max-w-5xl mx-auto px-6 py-6'>
            <SearchSection
              value={this.state.searchValue}
              onSearchChange={this.handleSearchChange}
              onSearchClick={this.handleSearchClick}
            />
          </div>
        </header>

        <main className='max-w-5xl mx-auto px-6 py-8'>
          <ErrorBoundary>
            <ResultsSection
              characters={this.state.characters}
              isLoading={this.state.isLoading}
              errorMessage={this.state.errorMessage}
            />
          </ErrorBoundary>
          <footer className='max-w-5xl mx-auto px-6 py-10 flex justify-center border-t border-slate-800/50 mt-10'>
            <BuggyButton />
          </footer>
        </main>
      </div>
    );
  }
}

export default App;

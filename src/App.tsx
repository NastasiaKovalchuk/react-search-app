import { Component } from 'react';
import SearchSection from './components/SearchSection';
import ResultsSection from './components/ResultsSection';

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
}

class App extends Component<object, AppState> {
  state = {
    searchValue: localStorage.getItem('search_value') || '',
    lastExecutedTerm: '',
    characters: [],
  };

  handleSearchChange = (value: string): void => {
    this.setState({ searchValue: value });
    localStorage.setItem('search_value', value);
  };

  searchCharacters = async (): Promise<void> => {
    const { searchValue, lastExecutedTerm } = this.state;
    const trimmedTerm = searchValue.trim();

    if (trimmedTerm === lastExecutedTerm && lastExecutedTerm !== '') {
      return;
    }

    try {
      console.log('запрос ушел');
      const response = await fetch(
        `https://rickandmortyapi.com/api/character/?name=${trimmedTerm}&page=1`
      );
      const data = await response.json();

      this.setState({
        characters: data.results || [],
        lastExecutedTerm: trimmedTerm,
      });
    } catch (error) {
      console.error('Fetch error:', error);
      this.setState({ characters: [], lastExecutedTerm: trimmedTerm });
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
          <ResultsSection characters={this.state.characters} />
        </main>
      </div>
    );
  }
}

export default App;

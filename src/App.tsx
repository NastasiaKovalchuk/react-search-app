import { Component } from 'react';
import SearchSection from './components/SearchSection';
import ResultsSection from './components/ResultsSection';

interface AppState {
  searchValue: string;
}

class App extends Component<object, AppState> {
  state = {
    searchValue: localStorage.getItem('search_value') || '',
  };

  handleSearchChange = (value: string): void => {
    this.setState({ searchValue: value });
    localStorage.setItem('search_value', value);
  };

  render() {
    return (
      <div className='min-h-screen bg-slate-950 text-slate-200 font-mono'>
        <header className='border-b-4 border-lime-500 bg-slate-900 shadow-[0_0_20px_rgba(132,204,22,0.3)]'>
          <div className='max-w-5xl mx-auto px-6 py-6'>
            <SearchSection
              value={this.state.searchValue}
              onSearchChange={this.handleSearchChange}
            />
          </div>
        </header>

        <main className='max-w-5xl mx-auto px-6 py-8'>
          <ResultsSection />
        </main>
      </div>
    );
  }
}

export default App;

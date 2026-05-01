import { Component } from 'react';
import SearchSection from './components/SearchSection';
import ResultsSection from './components/ResultsSection';

class App extends Component {
  render() {
    return (
      <div className='min-h-screen bg-slate-950 text-slate-200 font-mono'>
        <header className='border-b-4 border-lime-500 bg-slate-900 shadow-[0_0_20px_rgba(132,204,22,0.3)]'>
          <div className='max-w-5xl mx-auto px-6 py-6'>
            <SearchSection />
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

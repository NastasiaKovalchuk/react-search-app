import { Component } from 'react';
import SearchSection from './components/SearchSection';
import ResultsSection from './components/ResultsSection';

class App extends Component {
  render() {
    return (
      <div>
        <header>
          <SearchSection />
        </header>
        <main>
          <ResultsSection />
        </main>
      </div>
    );
  }
}

export default App;

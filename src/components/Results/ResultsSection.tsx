import { Component } from 'react';
import type { Character } from '../../App';
import { CharacterCard } from './CharacterCard';
import { Loader, ErrorState, EmptyState } from './ResultsStates';

interface ResultsProps {
  characters: Character[];
  isLoading: boolean;
  errorMessage: string | null;
}

class ResultsSection extends Component<ResultsProps> {
  renderStatusText() {
    const { isLoading, errorMessage, characters } = this.props;
    if (isLoading) return 'Status: Syncing...';
    if (errorMessage) return 'Status: Critical Error';
    return `Results: ${characters.length} units found`;
  }

  renderContent() {
    const { characters, isLoading, errorMessage } = this.props;

    if (errorMessage) return <ErrorState message={errorMessage} />;
    if (isLoading) return <Loader />;
    if (characters.length === 0) return <EmptyState />;

    return (
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {characters.map((char) => (
          <CharacterCard key={char.id} char={char} />
        ))}
      </div>
    );
  }

  render() {
    return (
      <section className='bg-slate-900 border-4 border-slate-800 rounded-3xl overflow-hidden shadow-2xl transition-all'>
        <div className='px-6 py-3 bg-slate-800 flex items-center gap-2 border-b-2 border-slate-700/50'>
          <div className='flex gap-1.5'>
            <div className='w-3 h-3 rounded-full bg-red-500'></div>
            <div className='w-3 h-3 rounded-full bg-yellow-500'></div>
            <div className='w-3 h-3 rounded-full bg-green-500'></div>
          </div>
          <span className='ml-4 text-[10px] text-slate-500 uppercase tracking-widest font-bold'>
            Terminal — {this.renderStatusText()}
          </span>
        </div>

        <div className='p-6 min-h-[400px] flex flex-col'>
          {this.renderContent()}
        </div>
      </section>
    );
  }
}

export default ResultsSection;

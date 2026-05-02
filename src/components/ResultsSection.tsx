import { Component } from 'react';
import type { Character } from '../App';

interface ResultsProps {
  characters: Character[];
  isLoading: boolean;
  errorMessage: string | null;
}

class ResultsSection extends Component<ResultsProps> {
  render() {
    const { characters, isLoading, errorMessage } = this.props;

    return (
      <section className='bg-slate-900 border-4 border-slate-800 rounded-3xl overflow-hidden shadow-2xl transition-all'>
        <div className='px-6 py-3 bg-slate-800 flex gap-2 border-b-2 border-slate-700/50'>
          <div className='w-3 h-3 rounded-full bg-red-500'></div>
          <div className='w-3 h-3 rounded-full bg-yellow-500'></div>
          <div className='w-3 h-3 rounded-full bg-green-500'></div>
          <span className='ml-4 text-[10px] text-slate-500 uppercase tracking-widest font-bold'>
            Terminal —{' '}
            {isLoading
              ? 'Status: Syncing...'
              : errorMessage
                ? 'Status: Critical Error'
                : `Results: ${characters.length} units found`}
          </span>
        </div>

        <div className='p-6 min-h-[400px]'>
          {errorMessage ? (
            <div className='z-10 text-center animate-in fade-in zoom-in duration-300'>
              <div className='text-6xl mb-4'>⚡</div>
              <h3 className='text-red-500 text-xl font-bold uppercase tracking-tighter'>
                Dimension Error Detected
              </h3>
              <p className='text-slate-400 text-sm mt-2 max-w-xs mx-auto'>
                {errorMessage}
              </p>
            </div>
          ) : isLoading ? (
            <div className='flex-1 flex flex-col items-center justify-center space-y-4'>
              <div className='w-12 h-12 border-4 border-lime-500/20 border-t-lime-500 rounded-full animate-spin'></div>
              <p className='text-lime-500 animate-pulse font-bold uppercase text-xs tracking-[0.2em]'>
                Accessing Central Finite Curve...
              </p>
            </div>
          ) : characters.length > 0 ? (
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
              {characters.map((char) => (
                <div
                  key={char.id}
                  className='bg-slate-950 border-2 border-lime-500/20 rounded-2xl overflow-hidden hover:border-lime-500/50 transition-all hover:translate-y-[-4px] group shadow-lg'
                >
                  <img
                    src={char.image}
                    alt={char.name}
                    className='w-full h-48 object-cover border-b-2 border-lime-500/20'
                  />

                  <div className='p-4'>
                    <h2 className='text-lg font-black text-lime-400 group-hover:text-lime-300 transition-colors uppercase tracking-tight'>
                      {char.name}
                    </h2>
                    <div className='mt-2 space-y-1'>
                      <p className='text-[11px] text-slate-500 uppercase font-bold tracking-widest'>
                        Species:{' '}
                        <span className='text-slate-200'>{char.species}</span>
                      </p>
                      <p className='text-[11px] text-slate-500 uppercase font-bold tracking-widest'>
                        Status:{' '}
                        <span className='text-slate-200'>{char.status}</span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className='flex flex-col items-center justify-center py-20 relative'>
              <div className='absolute w-64 h-64 bg-lime-500/10 blur-[100px] pointer-events-none'></div>

              <div className='z-10 text-center'>
                <div className='text-6xl mb-4 animate-spin-slow'>🛸</div>
                <h3 className='text-lime-500 text-xl font-bold uppercase tracking-tighter'>
                  Scanning Multiverse...
                </h3>
                <p className='text-slate-500 text-sm mt-2 max-w-xs'>
                  If no results appear, try a different dimension or check your
                  subspace connection.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    );
  }
}

export default ResultsSection;

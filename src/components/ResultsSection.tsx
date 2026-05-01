import { Component } from 'react';

class ResultsSection extends Component {
  render() {
    return (
      <section className='bg-slate-900 border-4 border-slate-800 rounded-3xl overflow-hidden shadow-2xl'>
        <div className='px-6 py-3 bg-slate-800 flex gap-2'>
          <div className='w-3 h-3 rounded-full bg-red-500'></div>
          <div className='w-3 h-3 rounded-full bg-yellow-500'></div>
          <div className='w-3 h-3 rounded-full bg-green-500'></div>
        </div>

        <div className='p-8 min-h-[400px] flex flex-col items-center justify-center relative'>
          <div className='absolute w-64 h-64 bg-lime-500/10 blur-[100px] pointer-events-none'></div>

          <div className='z-10 text-center'>
            <div className='text-6xl mb-4 animate-pulse'>🌀</div>
            <h3 className='text-lime-500 text-xl font-bold uppercase tracking-tighter'>
              Waiting for Input...
            </h3>
            <p className='text-slate-500 text-sm mt-2 max-w-xs'>
              Enter a name to fetch data from across the Multiverse.{' '}
              {"Don't be a Jerry."}
            </p>
          </div>
        </div>
      </section>
    );
  }
}

export default ResultsSection;

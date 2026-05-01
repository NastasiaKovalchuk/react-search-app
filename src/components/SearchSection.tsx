import { Component } from 'react';

class SearchSection extends Component {
  render() {
    return (
      <div className='flex flex-col md:flex-row items-center justify-between gap-6'>
        <div className='flex flex-col items-center md:items-start'>
          <h1 className='text-3xl font-black tracking-tighter text-lime-400 uppercase italic'>
            Rick & Morty <span className='text-white'>Finder</span>
          </h1>
          <p className='text-xs text-lime-600 font-bold uppercase tracking-widest'>
            Dimension C-137 Database
          </p>
        </div>

        <div className='flex w-full max-w-sm items-center gap-0'>
          <input
            type='text'
            placeholder='Search character...'
            className='w-full px-4 py-3 bg-slate-800 border-2 border-lime-500 rounded-l-xl focus:bg-slate-700 outline-none text-lime-400 placeholder:text-lime-900 font-bold'
          />
          <button className='bg-lime-500 hover:bg-lime-400 text-slate-900 font-black px-6 py-3 rounded-r-xl transition-all hover:shadow-[0_0_15px_#bef264] uppercase text-sm border-2 border-lime-500'>
            Go!
          </button>
        </div>
      </div>
    );
  }
}

export default SearchSection;

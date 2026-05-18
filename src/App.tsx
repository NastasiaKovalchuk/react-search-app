import { Outlet, Link, useLocation } from 'react-router';
import ErrorBoundary from './components/UI/ErrorBoundary';

const App = () => {
  const location = useLocation();

  const getTabClass = (path: string): string => {
    const isActive = location.pathname === path;
    return `px-4 py-2 text-xs font-black uppercase tracking-wider transition-all duration-200 rounded-xl border-2
      ${
        isActive
          ? 'bg-lime-500 text-slate-950 border-lime-500 shadow-[0_0_15px_rgba(132,204,22,0.4)]'
          : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200 hover:border-slate-600'
      }`;
  };

  return (
    <div className='min-h-screen bg-slate-950 text-slate-200 font-mono flex flex-col'>
      <header className='w-full max-w-6xl mx-auto px-6 pt-6 select-none'>
        <div className='p-6 bg-slate-900 border-4 border-slate-800 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden'>
          <div className='absolute top-3 left-4 flex gap-1.5'>
            <div className='w-2 h-2 rounded-full bg-red-500/60'></div>
            <div className='w-2 h-2 rounded-full bg-yellow-500/60'></div>
            <div className='w-2 h-2 rounded-full bg-green-500/60'></div>
          </div>

          <Link
            to='/'
            className='flex flex-col items-center md:items-start group mt-1'
          >
            <h1 className='text-3xl font-black tracking-tighter text-lime-400 uppercase italic transition-all group-hover:drop-shadow-[0_0_10px_#84cc16]'>
              Rick & Morty <span className='text-white'>Finder</span>
            </h1>
            <p className='text-[10px] text-lime-600 font-bold uppercase tracking-widest mt-0.5'>
              Dimension C-137 Database
            </p>
          </Link>

          <nav className='flex gap-3 w-full md:w-auto justify-center md:justify-end'>
            <Link to='/' className={getTabClass('/')}>
              Database
            </Link>
            <Link to='/about' className={getTabClass('/about')}>
              About
            </Link>
          </nav>
        </div>
      </header>

      <main className='max-w-6xl w-full mx-auto px-6 py-6 flex-1 flex flex-col'>
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </main>
    </div>
  );
};

export default App;

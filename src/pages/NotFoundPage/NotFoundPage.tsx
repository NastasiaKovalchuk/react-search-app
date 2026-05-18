import { Link } from 'react-router';

const NotFoundPage = () => {
  return (
    <div className='min-h-screen bg-slate-950 text-slate-200 font-mono flex items-center justify-center p-6'>
      <div className='w-full max-w-xl bg-slate-900 border-4 border-slate-800 rounded-3xl overflow-hidden shadow-2xl'>
        <div className='px-6 py-3 bg-slate-800 flex items-center gap-2 border-b-2 border-slate-700/50'>
          <div className='flex gap-1.5'>
            <div className='w-3 h-3 rounded-full bg-red-500 animate-pulse'></div>
            <div className='w-3 h-3 rounded-full bg-yellow-500'></div>
            <div className='w-3 h-3 rounded-full bg-green-500'></div>
          </div>
          <span className='ml-4 text-[10px] text-red-400 uppercase tracking-widest font-bold animate-pulse'>
            Terminal — Status: Dimension Collapse
          </span>
        </div>

        <div className='p-8 flex flex-col items-center text-center min-h-[350px] justify-center'>
          <h1 className='text-8xl font-black text-lime-400 uppercase italic tracking-tighter drop-shadow-[0_0_15px_#84cc16] mb-2'>
            404
          </h1>

          <p className='text-xs text-lime-600 font-bold uppercase tracking-widest mb-6 border-b border-lime-500/20 pb-2 w-full max-w-xs'>
            Error: Location Unknown
          </p>

          <h2 className='text-xl font-black text-white uppercase tracking-tight mb-4'>
            Dimension Not Found
          </h2>

          <p className='text-slate-400 text-sm max-w-sm mb-8 leading-relaxed'>
            The portal fluids are depleted or you entered incorrect coordinates.
            This reality does not exist in the Citadel index.
          </p>

          <Link
            to='/'
            className='px-6 py-3 bg-slate-950 border-2 border-lime-500 text-lime-400 font-black rounded-xl
                       text-sm uppercase tracking-wider transition-all duration-200 inline-block
                       hover:bg-lime-500 hover:text-slate-950 hover:shadow-[0_0_15px_#bef264]'
          >
            &lt; Return to Safety
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;

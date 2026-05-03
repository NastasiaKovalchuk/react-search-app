export const Loader = () => (
  <div className='my-auto flex flex-col items-center justify-center space-y-4'>
    <div className='w-12 h-12 border-4 border-lime-500/20 border-t-lime-500 rounded-full animate-spin'></div>
    <p className='text-lime-500 animate-pulse font-bold uppercase text-xs tracking-[0.2em]'>
      Accessing Central Finite Curve...
    </p>
  </div>
);

export const ErrorState = ({ message }: { message: string }) => (
  <div className='my-auto text-center animate-in fade-in zoom-in duration-300'>
    <div className='text-6xl mb-4'>⚡</div>
    <h3 className='text-red-500 text-xl font-bold uppercase tracking-tighter'>
      Dimension Error Detected
    </h3>
    <p className='text-slate-400 text-sm mt-2 max-w-xs mx-auto'>{message}</p>
  </div>
);

export const EmptyState = () => (
  <div className='my-auto flex flex-col items-center justify-center py-10 relative'>
    <div className='absolute w-64 h-64 bg-lime-500/10 blur-[100px] pointer-events-none'></div>
    <div className='z-10 text-center animate-in fade-in slide-in-from-bottom-4 duration-500'>
      <div className='text-6xl mb-4 animate-bounce'>🛸</div>
      <h3 className='text-lime-500 text-xl font-black uppercase tracking-tighter'>
        No Life Forms Found
      </h3>
      <p className='text-slate-400 text-sm mt-4 max-w-xs mx-auto leading-relaxed'>
        {"The sensors couldn't find anyone with that name in this dimension."}
        <br />
        <span className='text-lime-400/80 font-bold italic'>
          Try searching for a different name!
        </span>
      </p>
    </div>
  </div>
);

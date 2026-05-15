import { useState } from 'react';

const BuggyButton = () => {
  const [shouldThrow, setShouldThrow] = useState<boolean>(false);

  const handleThrow = () => {
    setShouldThrow(true);
  };

  if (shouldThrow) {
    throw new Error('Test Error: Application crashed as requested!');
  }

  return (
    <button
      onClick={handleThrow}
      className='group relative px-6 py-2 bg-red-900/20 border-2 border-red-500/50 text-red-500 rounded-lg font-black uppercase text-[10px] tracking-widest transition-all hover:bg-red-500 hover:text-white hover:border-red-500 hover:shadow-[0_0_20px_rgba(239,68,68,0.5)] active:scale-95 mb-6'
    >
      <span className='relative z-10 flex items-center gap-2'>
        <span className='w-2 h-2 bg-red-500 rounded-full animate-pulse group-hover:bg-white'></span>
        Trigger Crash
      </span>
      <div className='absolute inset-0 bg-red-500 opacity-0 group-hover:opacity-10 blur-xl transition-opacity'></div>
    </button>
  );
};

export default BuggyButton;

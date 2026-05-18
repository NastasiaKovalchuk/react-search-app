const AboutPage = () => {
  return (
    <div className='bg-slate-900 border-4 border-slate-800 rounded-3xl overflow-hidden shadow-2xl transition-all flex-1 flex flex-col'>
      <div className='px-6 py-3 bg-slate-800 flex items-center gap-2 border-b-2 border-slate-700/50 select-none'>
        <div className='flex gap-1.5'>
          <div className='w-3 h-3 rounded-full bg-red-500'></div>
          <div className='w-3 h-3 rounded-full bg-yellow-500'></div>
          <div className='w-3 h-3 rounded-full bg-green-500'></div>
        </div>
        <span className='ml-4 text-[10px] text-lime-400 uppercase tracking-widest font-bold animate-pulse'>
          Terminal — Status: Indexing Creator_
        </span>
      </div>

      <div className='p-8 flex flex-col md:flex-row gap-8 items-center md:items-stretch flex-1 justify-center'>
        <div className='flex-1 w-full bg-slate-950 border-2 border-slate-800 p-6 rounded-2xl flex flex-col justify-between shadow-inner'>
          <div>
            <div className='text-xs text-slate-500 font-bold uppercase tracking-widest mb-4 border-b border-slate-800 pb-2'>
              [Developer_Profile.log]
            </div>
            <h2 className='text-2xl font-black text-white uppercase tracking-tight mb-4'>
              Author Information
            </h2>
            <div className='space-y-3 text-sm text-slate-300'>
              <p>
                <span className='text-lime-500 font-bold'>&gt; NAME:</span>{' '}
                Anastasia
              </p>
              <div className='flex items-center gap-2 group/link'>
                <span className='text-lime-500 font-bold'>&gt; GITHUB:</span>{' '}
                <a
                  href='https://github.com/NastasiaKovalchuk'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-slate-300 hover:text-lime-400 font-bold underline decoration-slate-700 hover:decoration-lime-500 transition-all duration-200 break-all'
                >
                  NastasiaKovalchuk
                </a>
                <span className='text-[10px] text-slate-600 group-hover/link:text-lime-500 transition-colors duration-200'>
                  [LINK↗]
                </span>
              </div>
              <p className='leading-relaxed text-slate-400 mt-4'>
                This application was engineered using raw portal fluid, React
                components, and pure determination to index multiverse entities.
              </p>
            </div>
          </div>

          <div className='mt-6 text-[11px] text-lime-600/70 uppercase font-bold tracking-wider'>
            Access granted: Level 4 Clearance
          </div>
        </div>

        <div className='flex-1 w-full bg-slate-950 border-2 border-slate-800 p-6 rounded-2xl flex flex-col justify-between shadow-inner'>
          <div>
            <div className='text-xs text-slate-500 font-bold uppercase tracking-widest mb-4 border-b border-slate-800 pb-2'>
              [Application_Source.cfg]
            </div>
            <h3 className='text-xl font-black text-white uppercase tracking-tight mb-2'>
              The Portal Source
            </h3>
            <p className='text-sm text-slate-400 mb-6 leading-relaxed'>
              Developed as a validation assignment within the rigorous training
              grounds of the RS School ecosystem.
            </p>
          </div>

          <div className='flex flex-col gap-4'>
            <div className='text-xs text-slate-400 uppercase font-bold tracking-tight'>
              Educational Portal:
            </div>
            <a
              href='https://rs.school/courses/reactjs'
              target='_blank'
              rel='noopener noreferrer'
              className='w-full text-center px-6 py-4 bg-slate-900 border-2 border-lime-500 text-lime-400 font-black rounded-xl
                         text-xs uppercase tracking-widest transition-all duration-200 block
                         hover:bg-lime-500 hover:text-slate-950 hover:shadow-[0_0_15px_#bef264]'
            >
              RS School React Course
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;

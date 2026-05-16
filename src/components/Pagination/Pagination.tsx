interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  return (
    <div className='flex items-center justify-center gap-3 mt-0 font-mono'>
      <button
        onClick={(): void => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className='px-5 py-2.5 bg-slate-950 border-2 border-lime-500 text-lime-400 font-black rounded-xl
                   text-sm uppercase tracking-wider transition-all duration-200
                   hover:bg-lime-500 hover:text-slate-950 hover:shadow-[0_0_15px_#bef264]
                   disabled:opacity-20 disabled:border-slate-800 disabled:text-slate-600 
                   disabled:hover:bg-transparent disabled:hover:text-slate-600 disabled:hover:shadow-none'
      >
        &lt; Prev
      </button>

      <div className='flex items-center bg-slate-900 border-2 border-slate-800 px-4 py-2.5 rounded-xl min-w-[140px] justify-center'>
        <span className='text-[11px] text-slate-500 uppercase font-black tracking-widest'>
          Page{' '}
          <span className='text-lime-400 text-sm bg-slate-950 px-2 py-0.5 rounded border border-lime-500/20 mx-1'>
            {currentPage}
          </span>{' '}
          of <span className='text-slate-300'>{totalPages}</span>
        </span>
      </div>

      <button
        onClick={(): void => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className='px-5 py-2.5 bg-slate-950 border-2 border-lime-500 text-lime-400 font-black rounded-xl
                   text-sm uppercase tracking-wider transition-all duration-200
                   hover:bg-lime-500 hover:text-slate-950 hover:shadow-[0_0_15px_#bef264]
                   disabled:opacity-20 disabled:border-slate-800 disabled:text-slate-600 
                   disabled:hover:bg-transparent disabled:hover:text-slate-600 disabled:hover:shadow-none'
      >
        Next &gt;
      </button>
    </div>
  );
};

export default Pagination;

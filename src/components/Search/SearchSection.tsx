interface SearchSectionProps {
  value: string;
  onSearchChange: (value: string) => void;
  onSearchClick: () => void;
}

const SearchSection = ({
  value,
  onSearchChange,
  onSearchClick,
}: SearchSectionProps) => {
  return (
    <div className='flex w-full justify-end select-none '>
      <div className='flex w-full max-w-sm items-center gap-0  border-4 border-slate-800 p-2 rounded-2xl shadow-[0_0_20px_rgba(132,204,22,0.3)] '>
        <input
          type='text'
          placeholder='Search character...'
          value={value}
          onChange={(e): void => onSearchChange(e.target.value)}
          onKeyDown={(e): void => {
            if (e.key === 'Enter') onSearchClick();
          }}
          // Вернули w-full, чтобы инпут занимал все доступное пространство ВНУТРИ короткого контейнера
          className='w-full px-4 py-3 bg-slate-950 border-2 border-slate-800 rounded-l-xl focus:border-lime-500/50 outline-none text-lime-400 placeholder:text-slate-700 font-bold transition-all text-sm'
        />
        <button
          className='bg-lime-500 hover:bg-lime-400 text-slate-900 font-black px-6 py-3 rounded-r-xl transition-all hover:shadow-[0_0_15px_#bef264] uppercase text-sm border-2 border-lime-500 h-full'
          onClick={onSearchClick}
        >
          Search!
        </button>
      </div>
    </div>
  );
};

export default SearchSection;

import type { Character } from '../App';

export const CharacterCard = ({ char }: { char: Character }) => (
  <div className='bg-slate-950 border-2 border-lime-500/20 rounded-2xl overflow-hidden hover:border-lime-500/50 transition-all hover:translate-y-[-4px] group shadow-lg'>
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
          Species: <span className='text-slate-200'>{char.species}</span>
        </p>
        <p className='text-[11px] text-slate-500 uppercase font-bold tracking-widest'>
          Status: <span className='text-slate-200'>{char.status}</span>
        </p>
      </div>
    </div>
  </div>
);

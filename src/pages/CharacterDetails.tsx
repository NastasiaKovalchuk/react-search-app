import { useEffect, useState } from 'react';
import { useParams, useOutletContext } from 'react-router';

interface CharacterDetailed {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  image: string;
  origin: { name: string };
  location: { name: string };
}

export const CharacterDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { onClose } = useOutletContext<{ onClose: () => void }>();

  const [character, setCharacter] = useState<CharacterDetailed | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect((): void => {
    if (!id) return;

    const getDetails = async (): Promise<void> => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `https://rickandmortyapi.com/api/character/${id}`
        );
        if (!res.ok) {
          throw new Error('Database link severed or entity dropped offline.');
        }
        const data = await res.json();
        setCharacter(data);
      } catch (err) {
        setError(err.message || 'Unknown network anomaly.');
      } finally {
        setLoading(false);
      }
    };

    getDetails();
  }, [id]);

  useEffect((): (() => void) => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return (): void => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div className='h-fit flex flex-col font-mono select-none text-slate-200'>
      <div className='pb-1 flex items-center justify-between border-b border-slate-800/80'>
        <div className='flex items-center gap-2'>
          <span
            className={`w-2 h-2 rounded-full ${loading ? 'bg-yellow-500 animate-pulse' : error ? 'bg-red-500 animate-pulse' : 'bg-lime-500'}`}
          ></span>
          <span className='text-[10px] text-lime-400 uppercase tracking-widest font-bold'>
            Inspector // Unit_#{id || 'NULL'}
          </span>
        </div>

        <button
          onClick={onClose}
          className='text-[10px] font-bold uppercase tracking-wider text-slate-500 hover:text-red-400 transition-colors duration-150'
        >
          ✕ Close
        </button>
      </div>

      <div className='pt-4 flex flex-col  min-h-[300px]'>
        {loading && (
          <div className='flex-1 flex flex-col items-center justify-center gap-3 py-12'>
            <div className='w-8 h-8 border-2 border-slate-800 border-t-lime-500 rounded-full animate-spin'></div>
            <p className='text-[11px] text-slate-600 font-bold uppercase tracking-widest animate-pulse'>
              Syncing quantum records...
            </p>
          </div>
        )}

        {error && !loading && (
          <div className='flex-1 flex flex-col items-center justify-center text-center py-12'>
            <p className='text-xs text-red-500 font-bold uppercase tracking-widest mb-1'>
              [Core_Error]
            </p>
            <p className='text-xs text-slate-500 max-w-xs'>{error}</p>
          </div>
        )}

        {character && !loading && !error && (
          <div className='flex-1 flex flex-col justify-between h-full animate-in fade-in duration-200'>
            <div className='space-y-4'>
              <div className='relative w-full overflow-hidden rounded-xl border border-slate-800 bg-slate-950'>
                <img
                  src={character.image}
                  alt={character.name}
                  className='w-full h-48 object-cover object-top contrast-105'
                />
                <div className='absolute bottom-2 left-3 bg-slate-950/80 backdrop-blur-sm px-2 py-0.5 rounded border border-slate-800 text-[9px] text-slate-400 tracking-wider uppercase font-bold'>
                  [Live_Feed.raw]
                </div>
              </div>

              <div>
                <h2 className='text-xl font-black text-white uppercase tracking-tight'>
                  {character.name}
                </h2>
                <span className='text-[9px] text-slate-600 uppercase font-bold tracking-widest'>
                  Citadel_Index // Verified_Entity
                </span>
              </div>

              <div className='text-xs text-slate-300 divide-y divide-slate-800/40 border-y border-slate-800/40 py-1'>
                <div className='flex justify-between py-2 items-center'>
                  <span className='text-slate-500 font-bold text-[11px] tracking-wider'>
                    &gt; STATUS
                  </span>
                  <span
                    className={`font-black ${character.status === 'Alive' ? 'text-emerald-400' : character.status === 'Dead' ? 'text-red-500' : 'text-slate-400'}`}
                  >
                    {character.status.toUpperCase()}
                  </span>
                </div>

                <div className='flex justify-between py-2 items-center'>
                  <span className='text-slate-500 font-bold text-[11px] tracking-wider'>
                    &gt; SPECIES
                  </span>
                  <span className='font-medium text-slate-200'>
                    {character.species.toUpperCase()}
                  </span>
                </div>

                <div className='flex justify-between py-2 items-center'>
                  <span className='text-slate-500 font-bold text-[11px] tracking-wider'>
                    &gt; GENDER
                  </span>
                  <span className='font-medium text-slate-200'>
                    {character.gender.toUpperCase()}
                  </span>
                </div>

                <div className='flex flex-col py-2 gap-0.5'>
                  <span className='text-slate-500 font-bold text-[11px] tracking-wider'>
                    &gt; ORIGIN_WORLD
                  </span>
                  <span className='text-slate-300 font-medium truncate text-right md:text-left'>
                    {character.origin?.name}
                  </span>
                </div>

                <div className='flex flex-col py-2 gap-0.5'>
                  <span className='text-slate-500 font-bold text-[11px] tracking-wider'>
                    &gt; LAST_LOC_COORDINATES
                  </span>
                  <span className='text-slate-300 font-medium truncate text-right md:text-left'>
                    {character.location?.name}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

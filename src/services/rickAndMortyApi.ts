import { type CharactersResponse } from '../types/character';

export const fetchCharacters = async (
  name: string,
  page: number,
  signal?: AbortSignal
): Promise<CharactersResponse> => {
  const response = await fetch(
    `https://rickandmortyapi.com/api/character/?name=${name}&page=${page}`,
    { signal }
  );

  if (response.status === 404) {
    return {
      results: [],
      totalPages: 1,
    };
  }

  if (response.status === 429) {
    throw new Error('Too many requests');
  }

  if (!response.ok) {
    throw new Error('API Error');
  }

  const data = await response.json();

  return {
    results: data.results || [],
    totalPages: data.info?.pages || 1,
  };
};

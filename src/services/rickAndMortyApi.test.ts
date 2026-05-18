import { describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import { handlers } from '../test-utils/handlers';
import { fetchCharacters } from './rickAndMortyApi';

const server = setupServer(...handlers);

describe('fetchCharacters API service with MSW', (): void => {
  beforeAll((): void => server.listen());

  afterEach((): void => server.resetHandlers());

  afterAll((): void => server.close());

  it('returns formatted character data on a successful response (200)', async (): Promise<void> => {
    const data = await fetchCharacters('Rick', 1);

    expect(data).toEqual({
      results: [{ id: 1, name: 'Rick Sanchez' }],
      totalPages: 1,
    });
  });

  it('returns an empty array and 1 total page when API returns 404', async (): Promise<void> => {
    const data = await fetchCharacters('UnknownPerson', 1);

    expect(data).toEqual({
      results: [],
      totalPages: 1,
    });
  });

  it('throws a specific rate limit error when API returns 429', async (): Promise<void> => {
    server.use(
      http.get('https://rickandmortyapi.com/api/character/', () => {
        return new HttpResponse(null, { status: 429 });
      })
    );

    await expect(fetchCharacters('Morty', 1)).rejects.toThrow(
      'Too many requests'
    );
  });

  it('throws a general API error when response is not ok', async (): Promise<void> => {
    server.use(
      http.get('https://rickandmortyapi.com/api/character/', () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    await expect(fetchCharacters('Morty', 1)).rejects.toThrow('API Error');
  });
});

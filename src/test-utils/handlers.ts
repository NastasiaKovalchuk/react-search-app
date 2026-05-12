import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('https://rickandmortyapi.com/api/character/', ({ request }) => {
    const url = new URL(request.url);
    const name = url.searchParams.get('name');

    if (name === 'UnknownPerson') {
      return new HttpResponse(JSON.stringify({ error: 'Not Found' }), {
        status: 404,
      });
    }

    if (name === 'Rick') {
      return HttpResponse.json({
        results: [{ id: 1, name: 'Rick Sanchez' }],
      });
    }

    return HttpResponse.json({ results: [] });
  }),
];

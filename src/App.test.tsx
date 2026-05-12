import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import App from './App';
import { handlers } from './test-utils/handlers.ts';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';

const server = setupServer(...handlers);

beforeAll((): void => server.listen());
afterEach((): void => {
  server.resetHandlers();
  localStorage.clear();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});
afterAll((): void => server.close());

describe('App Search Persistence', (): void => {
  test('displays previously saved search term from localStorage on mount', (): void => {
    const testSearchTerm = 'Rick';
    localStorage.setItem('search_value', testSearchTerm);

    render(<App />);
    const searchInput = screen.getByPlaceholderText(/Search character.../i);
    expect(searchInput).toHaveValue(testSearchTerm);
  });

  test('shows empty input when no saved term exists', (): void => {
    render(<App />);
    const searchInput = screen.getByPlaceholderText(/Search character.../i);
    expect(searchInput).toHaveValue('');
  });
});

describe('App User Interaction', (): void => {
  test('updates input value when user types', async (): Promise<void> => {
    const user = userEvent.setup();

    render(<App />);
    const searchInput = screen.getByPlaceholderText(/Search character.../i);
    const testValue = 'Rick';
    await user.type(searchInput, testValue);

    expect(searchInput).toHaveValue(testValue);
  });

  test('saves search term to localStorage when search button is clicked', async (): Promise<void> => {
    const user = userEvent.setup();

    const spySetItem = vi.spyOn(Storage.prototype, 'setItem');

    render(<App />);

    const button = screen.getByRole('button', { name: /search!/i });
    const searchInput = screen.getByPlaceholderText(/Search character.../i);

    await user.type(searchInput, 'Morty');
    await user.click(button);

    expect(localStorage.getItem('search_value')).toBe('Morty');
    expect(spySetItem).toHaveBeenCalledWith('search_value', 'Morty');
  });

  test('trims whitespace from search input before saving', async (): Promise<void> => {
    const user = userEvent.setup();

    render(<App />);

    const searchInput = screen.getByPlaceholderText(/Search character.../i);
    const button = screen.getByRole('button', { name: /search!/i });

    await user.type(searchInput, '   Morty   ');
    await user.click(button);

    expect(localStorage.getItem('search_value')).toBe('Morty');
  });
});

describe('App Local Storage Integration', (): void => {
  test('retrieves saved search term on component mount', async (): Promise<void> => {
    const savedTerm = 'Rick';
    localStorage.setItem('search_value', savedTerm);

    render(<App />);

    expect(await screen.findByText('Rick Sanchez')).toBeInTheDocument();
  });

  test('does not execute duplicate search requests', async (): Promise<void> => {
    const user = userEvent.setup();

    render(<App />);

    const input = screen.getByPlaceholderText(/Search character/i);
    const button = screen.getByRole('button', { name: /search!/i });

    await user.type(input, 'Rick');
    await user.click(button);

    const firstResult = await screen.findByText('Rick Sanchez');
    expect(firstResult).toBeInTheDocument();

    const resultsBefore = screen.getAllByText(/Rick Sanchez/i).length;

    await user.click(button);

    const resultsAfter = screen.getAllByText(/Rick Sanchez/i).length;

    expect(resultsAfter).toBe(resultsBefore);
  });
});

describe('App Error Handling', (): void => {
  test('handles 404 status by clearing characters list', async (): Promise<void> => {
    const user = userEvent.setup();

    server.use(
      http.get('https://rickandmortyapi.com/api/character/', () => {
        return HttpResponse.json({ error: 'Not Found' }, { status: 404 });
      })
    );

    render(<App />);

    const searchInput = screen.getByPlaceholderText(/Search character.../i);
    const button = screen.getByRole('button', { name: /search!/i });

    await user.type(searchInput, 'UnknownPerson');
    await user.click(button);

    const apiError = screen.queryByText(
      /Ouch! The interdimensional portal is unstable/i
    );
    expect(apiError).not.toBeInTheDocument();
  });

  test('displays error message and renders ErrorState when fetch fails', async (): Promise<void> => {
    const user = userEvent.setup();

    server.use(
      http.get('https://rickandmortyapi.com/api/character/', () => {
        return HttpResponse.error();
      })
    );

    render(<App />);

    const input = screen.getByPlaceholderText(/Search character.../i);
    const button = screen.getByRole('button', { name: /search!/i });

    await user.type(input, 'Rick');
    await user.click(button);

    expect(
      await screen.findByText(/Ouch! The interdimensional portal is unstable/i)
    ).toBeInTheDocument();

    expect(screen.getByText(/Dimension Error Detected/i)).toBeInTheDocument();
  });
});

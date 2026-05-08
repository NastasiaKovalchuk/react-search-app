import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import App from './App';
import { type Character } from './App';

interface ApiResponse {
  results: Partial<Character>[]; // Partial делает все поля необязательными
}

describe('App Search Persistence', (): void => {
  let fetchSpy: ReturnType<typeof vi.fn>;

  beforeEach((): void => {
    localStorage.clear();

    fetchSpy = vi.fn().mockResolvedValue({
      ok: true,
      json: async (): Promise<ApiResponse> => ({
        results: [{ id: 1, name: 'Rick Sanchez' }],
      }),
    } as Response);

    vi.stubGlobal('fetch', fetchSpy);
  });

  afterEach((): void => {
    vi.unstubAllGlobals();
  });

  test('displays previously saved search term from localStorage on mount', (): void => {
    const testSearchTerm = 'Rick';
    localStorage.setItem('search_value', testSearchTerm);

    render(<App />);
    const searchInput = screen.getByPlaceholderText(/Search character.../i);
    expect(searchInput).toHaveValue(testSearchTerm);
  });

  test('shows empty input when no saved term exists', (): void => {
    localStorage.removeItem('search_value');
    render(<App />);
    const searchInput = screen.getByPlaceholderText(/Search character.../i);
    expect(searchInput).toHaveValue('');
  });
});

describe('App User Interaction', (): void => {
  let fetchSpy: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    localStorage.clear();

    fetchSpy = vi.fn().mockResolvedValue({
      ok: true,
      json: async (): Promise<ApiResponse> => ({ results: [] }),
    } as Response);

    vi.stubGlobal('fetch', fetchSpy);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks(); // Очищает spyOn (например, для setItem)
  });

  test('updates input value when user types', async () => {
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
    const testValue = 'Morty';

    await user.type(searchInput, testValue);
    await user.click(button);

    expect(localStorage.getItem('search_value')).toBe(testValue);
    expect(spySetItem).toHaveBeenCalledWith('search_value', testValue);
    spySetItem.mockRestore();
  });

  test('trims whitespace from search input before saving', async () => {
    const user = userEvent.setup();

    const spySetItem = vi.spyOn(Storage.prototype, 'setItem');

    render(<App />);

    const button = screen.getByRole('button', { name: /search!/i });
    const searchInput = screen.getByPlaceholderText(/Search character.../i);
    const valueWithSpaces = '   Morty   ';
    const trimmedValue = 'Morty';

    await user.type(searchInput, valueWithSpaces);
    await user.click(button);

    expect(localStorage.getItem('search_value')).toBe(trimmedValue);
    expect(spySetItem).toHaveBeenCalledWith('search_value', trimmedValue);
    spySetItem.mockRestore();
  });

  test('triggers search callback with correct parameters', async () => {
    const user = userEvent.setup();

    render(<App />);

    const searchInput = screen.getByPlaceholderText(/Search character.../i);
    const button = screen.getByRole('button', { name: /search!/i });
    const testValue = 'Morty';

    await user.type(searchInput, testValue);
    await user.click(button);

    expect(fetchSpy).toHaveBeenCalledWith(
      `https://rickandmortyapi.com/api/character/?name=${testValue}&page=1`
    );
  });
});

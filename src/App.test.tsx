import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import App from './App';

describe('App Search Persistence', () => {
  beforeEach((): void => {
    localStorage.clear();

    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ results: [] }),
      })
    );
  });

  afterEach((): void => {
    vi.unstubAllGlobals();
  });

  test('displays previously saved search term from localStorage on mount', () => {
    const testSearchTerm = 'Rick';
    localStorage.setItem('search_value', testSearchTerm);

    render(<App />);
    const searchInput = screen.getByPlaceholderText(/Search character.../i);
    expect(searchInput).toHaveValue(testSearchTerm);
  });

  test('shows empty input when no saved term exists', () => {
    localStorage.removeItem('search_value');
    render(<App />);
    const searchInput = screen.getByPlaceholderText(/Search character.../i);
    expect(searchInput).toHaveValue('');
  });
});

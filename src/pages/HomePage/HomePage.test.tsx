import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { MemoryRouter, Routes, Route, useOutletContext } from 'react-router';
import HomePage from './HomePage.tsx';
import { handlers } from '../../test-utils/handlers.ts';
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

const renderWithRouter = (initialEntries = ['/']) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <Routes>
        <Route path='/' element={<HomePage />}>
          <Route path='details/:id' element={<div>Details Outlet</div>} />
        </Route>
      </Routes>
    </MemoryRouter>
  );
};

describe('HomePage Search Persistence', (): void => {
  test('displays previously saved search term from localStorage on mount', (): void => {
    const testSearchTerm = 'Rick';
    localStorage.setItem('search_value', testSearchTerm);

    renderWithRouter();

    const searchInput = screen.getByPlaceholderText(/Search character.../i);
    expect(searchInput).toHaveValue(testSearchTerm);
  });

  test('shows empty input when no saved term exists', (): void => {
    localStorage.clear();
    renderWithRouter();

    const searchInput = screen.getByPlaceholderText(/Search character.../i);
    expect(searchInput).toHaveValue('');
  });
});

describe('HomePage User Interaction', (): void => {
  test('updates input value when user types', async (): Promise<void> => {
    const user = userEvent.setup();

    renderWithRouter();

    const searchInput = screen.getByPlaceholderText(/Search character.../i);
    const testValue = 'Rick';
    await user.type(searchInput, testValue);

    expect(searchInput).toHaveValue(testValue);
  });

  test('saves search term to localStorage when search button is clicked', async (): Promise<void> => {
    const user = userEvent.setup();

    const spySetItem = vi.spyOn(Storage.prototype, 'setItem');

    renderWithRouter();

    const button = screen.getByRole('button', { name: /search!/i });
    const searchInput = screen.getByPlaceholderText(/Search character.../i);

    await user.type(searchInput, 'Morty');
    await user.click(button);

    expect(localStorage.getItem('search_value')).toBe('Morty');
    expect(spySetItem).toHaveBeenCalledWith('search_value', 'Morty');
  });

  test('trims whitespace from search input before saving', async (): Promise<void> => {
    const user = userEvent.setup();

    renderWithRouter();

    const searchInput = screen.getByPlaceholderText(/Search character.../i);
    const button = screen.getByRole('button', { name: /search!/i });

    await user.type(searchInput, '   Morty   ');
    await user.click(button);

    expect(localStorage.getItem('search_value')).toBe('Morty');
  });
});

describe('HomePage Local Storage Integration', (): void => {
  test('retrieves saved search term on component mount', async (): Promise<void> => {
    const savedTerm = 'Rick';
    localStorage.setItem('search_value', savedTerm);

    renderWithRouter();

    expect(await screen.findByText('Rick Sanchez')).toBeInTheDocument();
  });

  test('does not execute duplicate search requests', async (): Promise<void> => {
    const user = userEvent.setup();

    renderWithRouter();

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

describe('HomePage Error Handling', (): void => {
  test('handles 404 status by clearing characters list', async (): Promise<void> => {
    const user = userEvent.setup();

    server.use(
      http.get('https://rickandmortyapi.com/api/character/', () => {
        return HttpResponse.json({ error: 'Not Found' }, { status: 404 });
      })
    );

    renderWithRouter();

    const searchInput = screen.getByPlaceholderText(/Search character.../i);
    const button = screen.getByRole('button', { name: /search!/i });

    await user.type(searchInput, 'UnknownPerson');
    await user.click(button);

    const apiError = screen.queryByText(
      /Ouch! The interdimensional portal is unstable/i
    );
    expect(apiError).not.toBeInTheDocument();
    expect(await screen.findByText(/No Life Forms Found/i)).toBeInTheDocument();
    expect(screen.getByText(/Results: 0 units found/i)).toBeInTheDocument();
  });

  test('displays error message and renders ErrorState when fetch fails', async (): Promise<void> => {
    const user = userEvent.setup();

    server.use(
      http.get('https://rickandmortyapi.com/api/character/', () => {
        return HttpResponse.error();
      })
    );

    renderWithRouter();

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

describe('HomePage Navigation and Side Panel Dynamics', (): void => {
  test('navigates to details view route and expands panel on character card click (Line 28)', async (): Promise<void> => {
    const user = userEvent.setup();

    renderWithRouter();

    const searchInput = screen.getByPlaceholderText(/Search character.../i);
    const button = screen.getByRole('button', { name: /search!/i });

    await user.type(searchInput, 'Rick');
    await user.click(button);

    const characterCard = await screen.findByText(
      'Rick Sanchez',
      {},
      { timeout: 3000 }
    );
    expect(characterCard).toBeInTheDocument();

    await user.click(characterCard);

    expect(screen.getByText('Details Outlet')).toBeInTheDocument();
  });

  test('collapses details view and returns to base route path on closure action (Line 35)', async (): Promise<void> => {
    const user = userEvent.setup();

    const MockDetailInterior = () => {
      const { onClose } = useOutletContext() as { onClose: () => void };
      return <button onClick={onClose}>Close Portal View</button>;
    };

    render(
      <MemoryRouter initialEntries={['/details/1']}>
        <Routes>
          <Route path='/' element={<HomePage />}>
            <Route path='details/:id' element={<MockDetailInterior />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    const closeBtn = await screen.findByRole('button', {
      name: /Close Portal View/i,
    });
    expect(closeBtn).toBeInTheDocument();

    await user.click(closeBtn);

    expect(screen.queryByText('Close Portal View')).not.toBeInTheDocument();
  });
});

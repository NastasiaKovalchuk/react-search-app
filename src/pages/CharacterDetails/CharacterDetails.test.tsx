import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import { CharacterDetails } from './CharacterDetails';

const mockOnClose = vi.fn();
let mockId: string | undefined = '1';

vi.mock('react-router', () => ({
  useParams: () => ({ id: mockId }),
  useOutletContext: () => ({ onClose: mockOnClose }),
}));

const mockCharacterData = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  gender: 'Male',
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  origin: { name: 'Earth' },
  location: { name: 'Citadel of Ricks' },
};

const server = setupServer(
  http.get('https://rickandmortyapi.com/api/character/:id', ({ params }) => {
    if (params.id === '1') {
      return HttpResponse.json(mockCharacterData);
    }
    return HttpResponse.json({ error: 'Not Found' }, { status: 404 });
  })
);

beforeAll((): void => server.listen());
afterEach((): void => {
  server.resetHandlers();
  vi.restoreAllMocks();
  mockId = '1';
});
afterAll((): void => server.close());

describe('CharacterDetails Initialization & Loading', (): void => {
  test('renders spinner and correct indicator on initial mount', (): void => {
    render(<CharacterDetails />);

    expect(screen.getByText(/Syncing quantum records.../i)).toBeInTheDocument();
    expect(screen.getByText(/Inspector \/\/ Unit_#1/i)).toBeInTheDocument();
  });

  test('displays NULL indicator if id parameter is missing', (): void => {
    mockId = undefined;
    render(<CharacterDetails />);

    expect(screen.getByText(/Inspector \/\/ Unit_#NULL/i)).toBeInTheDocument();
  });
});

describe('CharacterDetails Data Rendering', (): void => {
  test('successfully fetches and displays detailed entity data', async (): Promise<void> => {
    render(<CharacterDetails />);

    const nameHeading = await screen.findByRole('heading', {
      name: 'Rick Sanchez',
      level: 2,
    });
    expect(nameHeading).toBeInTheDocument();

    expect(screen.getByText('ALIVE')).toBeInTheDocument();
    expect(screen.getByText('HUMAN')).toBeInTheDocument();
    expect(screen.getByText('MALE')).toBeInTheDocument();

    expect(screen.getByText('Earth')).toBeInTheDocument();
    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();

    const characterImage = screen.getByRole('img', { name: 'Rick Sanchez' });
    expect(characterImage).toHaveAttribute('src', mockCharacterData.image);
  });
});

describe('CharacterDetails Actions', (): void => {
  test('calls onClose callback when close button is clicked', (): void => {
    render(<CharacterDetails />);

    const closeButton = screen.getByRole('button', { name: /✕ Close/i });
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});

describe('CharacterDetails Error Handling', (): void => {
  test('displays custom message when API returns 404', async (): Promise<void> => {
    mockId = '999';
    render(<CharacterDetails />);

    expect(
      await screen.findByText(
        'Database link severed or entity dropped offline.'
      )
    ).toBeInTheDocument();

    expect(screen.getByText('[Core_Error]')).toBeInTheDocument();
    expect(screen.queryByRole('heading', { level: 2 })).not.toBeInTheDocument();
  });

  test('handles network crash and shows fallback error message', async (): Promise<void> => {
    server.use(
      http.get('https://rickandmortyapi.com/api/character/*', () => {
        return HttpResponse.error();
      })
    );

    render(<CharacterDetails />);

    expect(
      await screen.findByText(/Failed to fetch|Unknown network anomaly/i)
    ).toBeInTheDocument();

    expect(screen.getByText('[Core_Error]')).toBeInTheDocument();
  });
});

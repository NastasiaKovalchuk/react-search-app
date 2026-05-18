import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import ResultsSection from './ResultsSection';
import { mockCharacters } from '../../test-utils/characters.mock.ts';

describe('Results Section Component', (): void => {
  const mockOnCharacterClick = vi.fn();
  const defaultProps = {
    characters: [],
    isLoading: false,
    errorMessage: null,
    onCharacterClick: mockOnCharacterClick,
  };

  beforeEach((): void => {
    vi.clearAllMocks();
  });

  test('renders correct number of items when data is provided', (): void => {
    render(<ResultsSection {...defaultProps} characters={mockCharacters} />);

    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Morty Smith')).toBeInTheDocument();
    expect(screen.getByText(/Results: 2 units found/i)).toBeInTheDocument();
  });

  test('displays "no results" message when data array is empty', (): void => {
    render(<ResultsSection {...defaultProps} characters={[]} />);

    expect(screen.getByText(/No Life Forms Found/i)).toBeInTheDocument();
    expect(screen.getByText(/Results: 0 units found/i)).toBeInTheDocument();
  });

  test('shows loading state while fetching data', (): void => {
    render(<ResultsSection {...defaultProps} isLoading={true} />);

    expect(
      screen.getByText(/Accessing Central Finite Curve/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Status: Syncing.../i)).toBeInTheDocument();
  });
});

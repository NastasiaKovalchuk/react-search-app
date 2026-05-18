import { render, screen } from '@testing-library/react';
import { CharacterCard } from './CharacterCard';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { mockCharacters } from '../../test-utils/characters.mock.ts';

describe('Results Section Component', (): void => {
  const mockOnClick = vi.fn();

  const defaultProps = {
    char: mockCharacters[0],
    onClick: mockOnClick,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('correctly displays item names and species', (): void => {
    render(<CharacterCard {...defaultProps} />);

    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Human')).toBeInTheDocument();
    expect(screen.getByAltText('Rick Sanchez')).toHaveAttribute(
      'src',
      'rick.jpg'
    );
  });

  test('calls onClick handler when clicked', async (): Promise<void> => {
    render(<CharacterCard {...defaultProps} />);
    const cardElement = screen
      .getByRole('heading', { name: 'Rick Sanchez' })
      .closest('div');
    await userEvent.click(cardElement!);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});

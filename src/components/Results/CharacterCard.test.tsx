import { render, screen } from '@testing-library/react';
import { CharacterCard } from './CharacterCard';
import { mockCharacters } from '../../test-utils/characters.mock.ts';

describe('Results Section Component', (): void => {
  test('correctly displays item names and species', (): void => {
    render(<CharacterCard char={mockCharacters[0]} />);

    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Human')).toBeInTheDocument();
    expect(screen.getByAltText('Rick Sanchez')).toHaveAttribute(
      'src',
      'rick.jpg'
    );
  });
});

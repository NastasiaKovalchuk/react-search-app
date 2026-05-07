import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import SearchSection from './SearchSection';

describe('SearchSection', (): void => {
  test('Button renders successfully', (): void => {
    const mockOnSearchChange = vi.fn();
    const mockOnSearchClick = vi.fn();

    render(
      <SearchSection
        value=''
        onSearchChange={mockOnSearchChange}
        onSearchClick={mockOnSearchClick}
      />
    );

    const button = screen.getByRole('button', { name: /search!/i });

    expect(button).toBeInTheDocument();
  });
});

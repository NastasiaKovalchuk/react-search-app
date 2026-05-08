import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import SearchSection from './SearchSection';

describe('SearchSection', (): void => {
  const mockOnSearchChange = vi.fn();
  const mockOnSearchClick = vi.fn();

  const defaultProps = {
    value: '',
    onSearchChange: mockOnSearchChange,
    onSearchClick: mockOnSearchClick,
  };

  beforeEach((): void => {
    vi.clearAllMocks();
  });

  test('Input renders successfully', (): void => {
    render(<SearchSection {...defaultProps} />);
    const input = screen.getByPlaceholderText(/Search character/i);
    expect(input).toBeInTheDocument();
  });

  test('Button renders successfully', (): void => {
    render(<SearchSection {...defaultProps} />);
    const button = screen.getByRole('button', { name: /search!/i });
    expect(button).toBeInTheDocument();
  });
});

import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
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

  test('renders input with correct value', (): void => {
    render(<SearchSection {...defaultProps} value='Rick' />);
    const input = screen.getByPlaceholderText(/Search character/i);

    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('Rick');
  });

  test('renders search button', (): void => {
    render(<SearchSection {...defaultProps} />);
    const button = screen.getByRole('button', { name: /search!/i });
    expect(button).toBeInTheDocument();
  });

  test('calls onSearchChange when typing', async (): Promise<void> => {
    const user = userEvent.setup();
    render(<SearchSection {...defaultProps} />);

    const input = screen.getByPlaceholderText(/Search character/i);
    await user.type(input, 'Morty');

    expect(mockOnSearchChange).toHaveBeenCalled();
  });

  test('calls onSearchClick when button is clicked', async (): Promise<void> => {
    const user = userEvent.setup();
    render(<SearchSection {...defaultProps} />);

    const button = screen.getByRole('button', { name: /search!/i });
    await user.click(button);

    expect(mockOnSearchClick).toHaveBeenCalledTimes(1);
  });

  test('calls onSearchClick when Enter is pressed', async (): Promise<void> => {
    const user = userEvent.setup();
    render(<SearchSection {...defaultProps} />);

    const input = screen.getByPlaceholderText(/Search character/i);
    await user.type(input, '{enter}');

    expect(mockOnSearchClick).toHaveBeenCalledTimes(1);
  });

  test('does not call onSearchClick when a random key is pressed', async (): Promise<void> => {
    const user = userEvent.setup();
    render(<SearchSection {...defaultProps} />);

    const input = screen.getByPlaceholderText(/Search character/i);
    await user.type(input, 'z');

    expect(mockOnSearchClick).not.toHaveBeenCalled();
  });
});

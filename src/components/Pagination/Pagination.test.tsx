import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import Pagination from './Pagination';

describe('Pagination Component', (): void => {
  const defaultProps = {
    currentPage: 2,
    totalPages: 5,
    onPageChange: vi.fn(),
  };

  it('renders correctly with current page and total pages info', (): void => {
    render(<Pagination {...defaultProps} />);

    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText(/Page/i)).toBeInTheDocument();
    expect(screen.getByText(/of/i)).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /< Prev/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Next >/i })).toBeInTheDocument();
  });

  it('disables the "Prev" button when on the first page', (): void => {
    render(<Pagination {...defaultProps} currentPage={1} />);

    const prevButton = screen.getByRole('button', { name: /< Prev/i });
    const nextButton = screen.getByRole('button', { name: /Next >/i });

    expect(prevButton).toBeDisabled();
    expect(nextButton).not.toBeDisabled();
  });

  it('disables the "Next" button when on the last page', (): void => {
    render(<Pagination {...defaultProps} currentPage={5} totalPages={5} />);

    const prevButton = screen.getByRole('button', { name: /< Prev/i });
    const nextButton = screen.getByRole('button', { name: /Next >/i });

    expect(prevButton).not.toBeDisabled();
    expect(nextButton).toBeDisabled();
  });

  it('calls onPageChange with the correct decremented value when clicking "Prev"', async (): Promise<void> => {
    const onPageChangeMock = vi.fn();
    render(
      <Pagination
        {...defaultProps}
        currentPage={3}
        onPageChange={onPageChangeMock}
      />
    );

    const prevButton = screen.getByRole('button', { name: /< Prev/i });
    await userEvent.click(prevButton);

    expect(onPageChangeMock).toHaveBeenCalledTimes(1);
    expect(onPageChangeMock).toHaveBeenCalledWith(2);
  });

  it('calls onPageChange with the correct incremented value when clicking "Next"', async (): Promise<void> => {
    const onPageChangeMock = vi.fn();
    render(
      <Pagination
        {...defaultProps}
        currentPage={3}
        onPageChange={onPageChangeMock}
      />
    );

    const nextButton = screen.getByRole('button', { name: /Next >/i });
    await userEvent.click(nextButton);

    expect(onPageChangeMock).toHaveBeenCalledTimes(1);
    expect(onPageChangeMock).toHaveBeenCalledWith(4);
  });
});

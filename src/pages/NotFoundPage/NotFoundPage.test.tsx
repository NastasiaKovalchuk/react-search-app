import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, it, expect } from 'vitest';
import NotFoundPage from './NotFoundPage';

describe('NotFoundPage Component', (): void => {
  it('renders the 404 error code and dimension status headings', (): void => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );

    expect(
      screen.getByRole('heading', { level: 1, name: '404' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 2, name: /Dimension Not Found/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Terminal — Status: Dimension Collapse/i)
    ).toBeInTheDocument();
  });

  it('renders the descriptive Rick and Morty themed error message', (): void => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );

    const errorMessage = screen.getByText(
      /The portal fluids are depleted or you entered incorrect coordinates/i
    );
    expect(errorMessage).toBeInTheDocument();
  });

  it('renders the return button with a correct link to the home page', (): void => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );

    const returnLink = screen.getByRole('link', {
      name: /< Return to Safety/i,
    });

    expect(returnLink).toBeInTheDocument();
    expect(returnLink).toHaveAttribute('href', '/');
  });
});

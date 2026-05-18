import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router';
import { describe, it, expect } from 'vitest';
import App from './App';

const MockPage = ({ title }: { title: string }) => <div>{title}</div>;

describe('App Component', () => {
  it('renders the application title and subtitle', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText(/Rick & Morty/i)).toBeInTheDocument();
    expect(screen.getByText(/Finder/i)).toBeInTheDocument();
    expect(screen.getByText(/Dimension C-137 Database/i)).toBeInTheDocument();
  });

  it('highlights the "Database" tab as active on the root route', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    // Using exact regex bounds prevents catching the logo text
    const databaseLink = screen.getByRole('link', { name: /^database$/i });
    const aboutLink = screen.getByRole('link', { name: /^about$/i });

    expect(databaseLink).toHaveClass('bg-lime-500');
    expect(aboutLink).toHaveClass('bg-slate-800');
  });

  it('highlights the "About" tab as active when navigating to /about', () => {
    render(
      <MemoryRouter initialEntries={['/about']}>
        <App />
      </MemoryRouter>
    );

    // Using exact regex bounds prevents catching the logo text
    const databaseLink = screen.getByRole('link', { name: /^database$/i });
    const aboutLink = screen.getByRole('link', { name: /^about$/i });

    expect(aboutLink).toHaveClass('bg-lime-500');
    expect(databaseLink).toHaveClass('bg-slate-800');
  });

  it('correctly renders child components via <Outlet />', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path='/' element={<App />}>
            <Route index element={<MockPage title='Main Database Content' />} />
            <Route path='about' element={<MockPage title='About Content' />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Main Database Content')).toBeInTheDocument();
    expect(screen.queryByText('About Content')).not.toBeInTheDocument();
  });

  it('logo link navigates to the root path', () => {
    render(
      <MemoryRouter initialEntries={['/about']}>
        <App />
      </MemoryRouter>
    );

    const logoLink = screen.getByRole('link', {
      name: /Rick & Morty Finder Dimension C-137 Database/i,
    });
    expect(logoLink).toHaveAttribute('href', '/');
  });
});

import { render, screen } from '@testing-library/react';
import AboutPage from './AboutPage';

describe('AboutPage Rendering & Layout', (): void => {
  beforeEach((): void => {
    render(<AboutPage />);
  });

  test('displays terminal header and current indexing status', (): void => {
    const terminalStatus = screen.getByText(
      /Terminal — Status: Indexing Creator_/i
    );
    expect(terminalStatus).toBeInTheDocument();
  });

  test('renders specific logs placeholders', (): void => {
    expect(screen.getByText('[Developer_Profile.log]')).toBeInTheDocument();
    expect(screen.getByText('[Application_Source.cfg]')).toBeInTheDocument();
  });

  test('displays security clearance levels text', (): void => {
    const clearanceText = screen.getByText(
      /Access granted: Level 4 Clearance/i
    );
    expect(clearanceText).toBeInTheDocument();
  });
});

describe('AboutPage Author Information', (): void => {
  beforeEach((): void => {
    render(<AboutPage />);
  });

  test('renders author section headers and name correctly', (): void => {
    const mainHeading = screen.getByRole('heading', {
      name: /Author Information/i,
      level: 2,
    });
    expect(mainHeading).toBeInTheDocument();

    expect(screen.getByText(/Anastasia/i)).toBeInTheDocument();
  });

  test('contains a secure and valid link to the authors GitHub profile', (): void => {
    const githubLink = screen.getByRole('link', { name: /NastasiaKovalchuk/i });

    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute(
      'href',
      'https://github.com/NastasiaKovalchuk'
    );
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
  });
});

describe('AboutPage Application Source & Education', (): void => {
  beforeEach((): void => {
    render(<AboutPage />);
  });

  test('renders educational context headers and details', (): void => {
    const subHeading = screen.getByRole('heading', {
      name: /The Portal Source/i,
      level: 3,
    });
    expect(subHeading).toBeInTheDocument();

    expect(screen.getByText(/RS School ecosystem/i)).toBeInTheDocument();
  });

  test('contains a secure and valid action link to the RS School course', (): void => {
    const courseLink = screen.getByRole('link', {
      name: /RS School React Course/i,
    });

    expect(courseLink).toBeInTheDocument();
    expect(courseLink).toHaveAttribute(
      'href',
      'https://rs.school/courses/reactjs'
    );
    expect(courseLink).toHaveAttribute('target', '_blank');
    expect(courseLink).toHaveAttribute('rel', 'noopener noreferrer');
  });
});

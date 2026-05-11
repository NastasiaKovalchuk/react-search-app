import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

import ErrorBoundary from './ErrorBoundary';
import BuggyButton from './BuggyButton';

const CrashComponent = (): never => {
  throw new Error('Test Error');
};

describe('ErrorBoundary', (): void => {
  beforeEach((): void => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach((): void => {
    vi.restoreAllMocks();
  });

  test('renders children correctly when no error occurs', (): void => {
    render(
      <ErrorBoundary>
        <div data-testid='child'>Success</div>
      </ErrorBoundary>
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  test('catches errors and displays fallback UI', async (): Promise<void> => {
    const user = userEvent.setup();
    render(
      <ErrorBoundary>
        <BuggyButton />
      </ErrorBoundary>
    );

    await user.click(screen.getByRole('button', { name: /Trigger Crash/i }));

    expect(screen.getByText(/Critical System Failure/i)).toBeInTheDocument();
    expect(
      screen.getByText(
        /The multiverse has collapsed. A component error occurred./i
      )
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Reload Reality/i })
    ).toBeInTheDocument();
  });

  test('logs error to console with correct information', async (): Promise<void> => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <CrashComponent />
      </ErrorBoundary>
    );

    expect(consoleSpy).toHaveBeenCalled();

    consoleSpy.mockRestore();
  });
});

test('reload button triggers page reload', async (): Promise<void> => {
  const user = userEvent.setup();

  const reloadMock = vi.fn();
  vi.stubGlobal('location', {
    ...window.location,
    reload: reloadMock,
  });

  render(
    <ErrorBoundary>
      <BuggyButton />
    </ErrorBoundary>
  );

  await user.click(screen.getByRole('button', { name: /Trigger Crash/i }));

  await user.click(screen.getByRole('button', { name: /Reload Reality/i }));

  expect(reloadMock).toHaveBeenCalled();
});

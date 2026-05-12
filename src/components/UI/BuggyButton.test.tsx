import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

import ErrorBoundary from './ErrorBoundary';
import BuggyButton from './BuggyButton';

describe('BuggyButton', (): void => {
  beforeEach((): void => {
    vi.spyOn(console, 'error').mockImplementation((): void => {});
  });

  afterEach((): void => {
    vi.restoreAllMocks();
  });

  test('throws error when test button is clicked', async (): Promise<void> => {
    const user = userEvent.setup();

    render(
      <ErrorBoundary>
        <BuggyButton />
      </ErrorBoundary>
    );
    const button = screen.getByRole('button', { name: /Trigger Crash/i });
    expect(button).toBeInTheDocument();

    await user.click(button);
    expect(button).not.toBeInTheDocument();

    expect(screen.getByText(/Critical System Failure/i)).toBeInTheDocument();
  });
});

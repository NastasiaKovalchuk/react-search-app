import { Component, type ReactNode, type ErrorInfo } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
  };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className='min-h-screen bg-slate-950 flex items-center justify-center p-6 text-center'>
          <div className='bg-slate-900 border-4 border-red-500/50 p-10 rounded-3xl shadow-2xl max-w-md'>
            <h1 className='text-4xl mb-4'>🛸</h1>
            <h2 className='text-red-500 text-2xl font-black uppercase tracking-tighter mb-4'>
              Critical System Failure
            </h2>
            <p className='text-slate-400 font-mono text-sm mb-6'>
              The multiverse has collapsed. A component error occurred.
            </p>
            <button
              onClick={() => window.location.reload()}
              className='bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-6 rounded-full transition-colors uppercase text-xs'
            >
              Reload Reality
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

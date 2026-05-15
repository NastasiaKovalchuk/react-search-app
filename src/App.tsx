import { Outlet } from 'react-router';
import ErrorBoundary from './components/UI/ErrorBoundary';

const App = () => {
  return (
    <div className='min-h-screen bg-slate-950 text-slate-200 font-mono'>
      <main className='max-w-5xl mx-auto px-6 py-8'>
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </main>
    </div>
  );
};

export default App;

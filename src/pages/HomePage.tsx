// pages/HomePage.tsx
import { useParams, useNavigate, Outlet } from 'react-router';
import SearchSection from '../components/Search/SearchSection';
import ResultsSection from '../components/Results/ResultsSection';
import BuggyButton from '../components/UI/BuggyButton';
import ErrorBoundary from '../components/UI/ErrorBoundary';
import Pagination from '../components/Pagination/Pagination';
import { useCharactersSearch } from '../hooks/useCharactersSearch';

const HomePage = () => {
  const { id: detailsId } = useParams();
  const navigate = useNavigate();

  const {
    searchValue,
    characters,
    isLoading,
    errorMessage,
    totalPages,
    currentPage,
    searchParams,
    handleSearchChange,
    handleSearchClick,
    handlePageChange,
  } = useCharactersSearch();

  const handleCharacterClick = (id: number): void => {
    navigate({
      pathname: `/details/${id}`,
      search: searchParams.toString(),
    });
  };

  const handleCloseDetails = (): void => {
    navigate({
      pathname: '/',
      search: searchParams.toString(),
    });
  };

  const showPagination = !isLoading && characters.length > 0;

  return (
    <div className='min-h-screen bg-slate-950 text-slate-200 font-mono'>
      <div className='max-w-6xl  mx-auto px-6 py-1'>
        <SearchSection
          value={searchValue}
          onSearchChange={handleSearchChange}
          onSearchClick={handleSearchClick}
        />
        <BuggyButton />
      </div>

      <div className='max-w-6xl mx-auto px-6 py-1'>
        <ErrorBoundary>
          {showPagination && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}

          <div
            className={`grid gap-6 ${detailsId ? 'grid-cols-1 md:grid-cols-12' : 'grid-cols-1'}`}
          >
            <div className={detailsId ? 'md:col-span-8' : 'w-full'}>
              <ResultsSection
                characters={characters}
                isLoading={isLoading}
                errorMessage={errorMessage}
                onCharacterClick={handleCharacterClick}
              />
            </div>

            {detailsId && (
              <div className='md:col-span-4 bg-slate-900 border-4 border-slate-800 rounded-3xl p-6 sticky top-4 h-[calc(100vh-40px)] overflow-y-auto'>
                <Outlet context={{ onClose: handleCloseDetails }} />
              </div>
            )}
          </div>
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default HomePage;

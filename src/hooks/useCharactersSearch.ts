// hooks/useCharactersSearch.ts
import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router';
import { useLocalStorage } from './useLocalStorage';
import { fetchCharacters } from '../services/rickAndMortyApi';
import { type Character } from '../types/character';

export const useCharactersSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [savedSearch, saveSearch] = useLocalStorage('search_value', '');

  const queryParam = searchParams.get('q');
  const pageParam = searchParams.get('page');

  const currentPage = Number(pageParam) || 1;
  const currentSearchTerm = queryParam !== null ? queryParam : savedSearch;

  const [searchValue, setSearchValue] = useState<string>(currentSearchTerm);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number>(1);

  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect((): void => {
    if (queryParam === null && savedSearch) {
      setSearchParams({ q: savedSearch, page: '1' });
    }
  }, [queryParam, savedSearch, setSearchParams]);

  useEffect((): (() => void) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;

    const loadCharacters = async (): Promise<void> => {
      setIsLoading(true);
      setErrorMessage(null);

      try {
        const data = await fetchCharacters(
          currentSearchTerm,
          currentPage,
          controller.signal
        );

        setCharacters(data.results);
        setTotalPages(data.totalPages);
        saveSearch(currentSearchTerm);
      } catch (error) {
        if (error.name === 'AbortError') return;
        setCharacters([]);
        setErrorMessage('Ouch! The interdimensional portal is unstable.');
      } finally {
        setIsLoading(false);
      }
    };

    loadCharacters();

    return (): void => controller.abort();
  }, [currentSearchTerm, currentPage, saveSearch]);

  const handleSearchChange = (value: string): void => setSearchValue(value);

  const handleSearchClick = (): void => {
    setSearchParams({ q: searchValue.trim(), page: '1' });
  };

  const handlePageChange = (newPage: number): void => {
    setSearchParams({ q: currentSearchTerm, page: String(newPage) });
  };

  return {
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
  };
};

import { useState, useCallback } from 'react';

export const useLocalStorage = (
  key: string,
  initialValue: string
): readonly [string, (value: string) => void] => {
  const [storedValue, setStoredValue] = useState<string>(() => {
    return localStorage.getItem(key) || initialValue;
  });

  const saveValue = useCallback(
    (value: string): void => {
      localStorage.setItem(key, value);
      setStoredValue(value);
    },
    [key]
  );

  return [storedValue, saveValue] as const;
};

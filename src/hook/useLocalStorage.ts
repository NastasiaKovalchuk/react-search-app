import { useState } from 'react';

export const useLocalStorage = (
  key: string,
  initialValue: string
): readonly [string, (value: string) => void] => {
  const [storedValue, setStoredValue] = useState<string>((): string => {
    return localStorage.getItem(key) || initialValue;
  });

  const saveValue = (value: string): void => {
    localStorage.setItem(key, value);
    setStoredValue(value);
  };

  return [storedValue, saveValue] as const;
};

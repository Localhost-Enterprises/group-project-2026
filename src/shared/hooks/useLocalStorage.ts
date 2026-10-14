import { useEffect, useState } from 'react';

const LOCAL_STORAGE_CHANGE_EVENT = 'local-storage-change';

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [value, setValue] = useState<T>(() => {
    const storedValue = localStorage.getItem(key);

    if (storedValue === null) {
      return initialValue;
    }

    try {
      return JSON.parse(storedValue) as T;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    const updateFromStorage = (storedValue: string | null) => {
      if (storedValue === null) {
        setValue(initialValue);
        return;
      }

      try {
        setValue(JSON.parse(storedValue) as T);
      } catch {
        setValue(initialValue);
      }
    };

    const handleStorage = (event: StorageEvent) => {
      if (event.key === key) {
        updateFromStorage(event.newValue);
      }
    };

    const handleLocalStorageChange = (event: Event) => {
      const { key: changedKey, value: changedValue } = (
        event as CustomEvent<{ key: string; value: T }>
      ).detail;

      if (changedKey === key) {
        setValue(changedValue);
      }
    };

    window.addEventListener('storage', handleStorage);
    window.addEventListener(
      LOCAL_STORAGE_CHANGE_EVENT,
      handleLocalStorageChange,
    );

    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener(
        LOCAL_STORAGE_CHANGE_EVENT,
        handleLocalStorageChange,
      );
    };
  }, [initialValue, key]);

  const updateValue = (newValue: T) => {
    localStorage.setItem(key, JSON.stringify(newValue));
    setValue(newValue);
    window.dispatchEvent(
      new CustomEvent(LOCAL_STORAGE_CHANGE_EVENT, {
        detail: { key, value: newValue },
      }),
    );
  };

  return [value, updateValue] as const;
};

import { Product } from '@/types';
import { useCallback, useEffect, useState } from 'react';

function useLocalStorage(key: string) {
  const [list, setList] = useState<Product[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(key);
    setList(stored ? JSON.parse(stored) : []);
  }, []);

  const save = (updatedItems: Product[]) => {
    setList(updatedItems);
    localStorage.setItem(key, JSON.stringify(updatedItems));
  };

  const addItem = (item: Product) => {
    if (!list.some(i => i.productId === item.productId)) {
      save([...list, item]);
    }
  };

  const removeItem = (id: number) => {
    const updated = list.filter(item => item.productId !== id);
    save(updated);
  };

  const isExistItem = (id: number) => list.some(item => item.productId === id);

/*   useEffect(() => {
    const stored = localStorage.getItem(key);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setList(parsed);
        } else {
          console.warn('Invalid format in localStorage:', parsed);
        }
      } catch (error) {
        console.warn('Failed to parse localStorage JSON:', error);
      }
    }
  }, [key]);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(list));
  }, [list, key]);

  const addItem = useCallback((item: Product) => {
    setList(prev => {
      const exists = prev.some(i => i.productId === item.productId);
      return exists ? prev : [...prev, item];
    });
  }, []);

  const removeItem = useCallback((id: number) => {
    setList(prev => prev.filter(i => i.productId !== id));
  }, []);

  const isExistItem = useCallback((id: number) => {
    return list.some(i => i.productId === id);
  }, [list]); */

  return { list, addItem, removeItem, isExistItem };
}

export default useLocalStorage;

export type FavoriteStore = ReturnType<typeof useLocalStorage>;

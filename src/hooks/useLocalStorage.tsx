'use client';

import { Product } from '@/types';
import { useEffect, useState } from 'react';

const FAVORITES_KEY = 'favorites';

function useLocalStorage() {
  const [list, setList] = useState<Product[]>([]);

  /* useEffect(() => {
    const stored = localStorage.getItem(FAVORITES_KEY);
    setList(stored ? JSON.parse(stored) : []);
  }, []); */

  useEffect(() => 
    { 
      const handler = () => 
        { 
          const stored = localStorage.getItem(FAVORITES_KEY); 
          setList(stored ? JSON.parse(stored) : []); 
        }; 
        window.addEventListener("favorites-updated", handler); 
        return () => window.removeEventListener("favorites-updated", handler); 
      }, []);

  const save = (updatedItems: Product[]) => {
    setList(updatedItems);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedItems));
    window.dispatchEvent(new Event("favorites-updated"));
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
  return {
    list,
    addItem,
    removeItem,
    isExistItem,
  };

}

export default useLocalStorage;

export type FavoriteStore = ReturnType<typeof useLocalStorage>;

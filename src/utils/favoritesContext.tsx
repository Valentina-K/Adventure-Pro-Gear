'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { Product } from '@/types';

const FAVORITES_KEY = 'favorites';

type FavoritesContextType = {
  list: Product[];
  addItem: (item: Product) => void;
  removeItem: (id: number) => void;
  isExistItem: (id: number) => boolean;
};

const FavoritesContext = createContext<FavoritesContextType | null>(null);

export const FavoritesProvider = ({ children }: { children: React.ReactNode }) => {
  const [list, setList] = useState<Product[]>([]);

  // Инициализация из localStorage
  useEffect(() => {
    const stored = localStorage.getItem(FAVORITES_KEY);
    setList(stored ? JSON.parse(stored) : []);
  }, []);

  const save = (updated: Product[]) => {
    setList(updated);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
  };

  const addItem = (item: Product) => {
  setList(prev => {
    if (prev.some(i => i.productId === item.productId)) return prev;
    const updated = [...prev, item];
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
    return updated;
  });
};

  const removeItem = (id: number) => {
    save(list.filter(i => i.productId !== id));
  };

  const isExistItem = (id: number) => list.some(i => i.productId === id);

  return (
    <FavoritesContext.Provider value={{ list, addItem, removeItem, isExistItem }}>
      {children}
    </FavoritesContext.Provider>
  );
};

const useLocalStorage = () => {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error('useFavorites must be used within FavoritesProvider');
  return ctx;
};

export default useLocalStorage;

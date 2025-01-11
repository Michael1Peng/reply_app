import { SalesScript, SalesScripts, SearchHistory } from "./types";
import { SALES_SCRIPTS } from "@/constants/scripts";

const STORAGE_KEY = "sales-scripts-state";
const SEARCH_HISTORY_KEY = "search-history";
const MAX_SEARCH_HISTORY = 10;

export const loadScripts = (): SalesScripts => {
  if (typeof window === "undefined") return SALES_SCRIPTS;
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : SALES_SCRIPTS;
};

export const saveScripts = (scripts: SalesScripts): void => {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(scripts));
};

export const searchScripts = (
  scripts: SalesScripts, 
  query: string,
  category?: string
): SalesScripts => {
  if (!query.trim() && (!category || category === 'all')) return scripts;
  
  return scripts.filter((script) => {
    const matchesQuery = !query.trim() || 
      script.question.toLowerCase().includes(query.toLowerCase()) ||
      script.answer.toLowerCase().includes(query.toLowerCase());
      
    const matchesCategory = !category || category === 'all' || script.category === category;
    
    return matchesQuery && matchesCategory;
  }).sort((a, b) => (b.useCount || 0) - (a.useCount || 0));
};

export const getCategories = (scripts: SalesScripts): string[] => {
  const categories = new Set(scripts.filter(s => s.category).map(s => s.category as string));
  return Array.from(categories);
};

export const toggleFavorite = (scripts: SalesScripts, id: string): SalesScripts => {
  const newScripts = scripts.map((script) =>
    script.id === id ? { ...script, isFavorite: !script.isFavorite } : script
  );
  saveScripts(newScripts);
  return newScripts;
};

export const trackScriptUsage = (scripts: SalesScripts, id: string): SalesScripts => {
  const newScripts = scripts.map((script) =>
    script.id === id ? { ...script, useCount: (script.useCount || 0) + 1 } : script
  );
  saveScripts(newScripts);
  return newScripts;
};

export const loadSearchHistory = (): SearchHistory[] => {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(SEARCH_HISTORY_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const addSearchHistory = (query: string): void => {
  if (typeof window === "undefined" || !query.trim()) return;
  
  const history = loadSearchHistory();
  const newHistory = [
    { query: query.trim(), timestamp: Date.now() },
    ...history.filter(h => h.query !== query.trim())
  ].slice(0, MAX_SEARCH_HISTORY);
  
  localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(newHistory));
};

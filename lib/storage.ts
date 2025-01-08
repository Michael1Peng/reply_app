import { SalesScript, SalesScripts } from "./types";

const STORAGE_KEY = "sales-scripts";

export const loadScripts = (): SalesScripts => {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const saveScripts = (scripts: SalesScripts): void => {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(scripts));
};

export const addScript = (scripts: SalesScripts, script: SalesScript): SalesScripts => {
  const newScripts = [...scripts, script];
  saveScripts(newScripts);
  return newScripts;
};

export const removeScript = (scripts: SalesScripts, id: string): SalesScripts => {
  const newScripts = scripts.filter((script) => script.id !== id);
  saveScripts(newScripts);
  return newScripts;
};

export const searchScripts = (scripts: SalesScripts, query: string): SalesScripts => {
  if (!query.trim()) return scripts;
  const lowerQuery = query.toLowerCase();
  return scripts.filter(
    (script) =>
      script.question.toLowerCase().includes(lowerQuery) ||
      script.answer.toLowerCase().includes(lowerQuery)
  );
};

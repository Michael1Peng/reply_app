import { useState, useEffect } from "react"
import { SalesScript, SearchHistory } from "@/lib/types"
import { 
  searchScripts, 
  getCategories,
  loadSearchHistory,
  addSearchHistory
} from "@/lib/storage"

export function useSearch(initialScripts: SalesScript[]) {
  const [scripts, setScripts] = useState<SalesScript[]>(initialScripts)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [filteredScripts, setFilteredScripts] = useState<SalesScript[]>(initialScripts)
  const [categories, setCategories] = useState<string[]>([])
  const [searchHistory, setSearchHistory] = useState<SearchHistory[]>([])
  const [showHistory, setShowHistory] = useState(false)

  useEffect(() => {
    const history = loadSearchHistory()
    setCategories(getCategories(initialScripts))
    setSearchHistory(history)
  }, [initialScripts])

  const handleSearch = (query: string, category: string) => {
    setSearchQuery(query)
    setSelectedCategory(category)
    setFilteredScripts(searchScripts(scripts, query, category))
    if (query.trim()) {
      addSearchHistory(query)
      const history = loadSearchHistory()
      setSearchHistory(history)
    }
    setShowHistory(false)
  }

  return {
    scripts,
    setScripts,
    searchQuery,
    selectedCategory,
    filteredScripts,
    categories,
    searchHistory,
    showHistory,
    setShowHistory,
    handleSearch
  }
} 

"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Copy, Star, History, Search } from "lucide-react"
import { SalesScript, SearchHistory } from "@/lib/types"
import { SALES_SCRIPTS } from "@/constants/scripts"
import { 
  searchScripts, 
  getCategories,
  trackScriptUsage,
  toggleFavorite,
  loadSearchHistory,
  addSearchHistory
} from "@/lib/storage"

export default function Home() {
  const [scripts, setScripts] = useState<SalesScript[]>(SALES_SCRIPTS)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [filteredScripts, setFilteredScripts] = useState<SalesScript[]>(SALES_SCRIPTS)
  const [categories, setCategories] = useState<string[]>([])
  const [searchHistory, setSearchHistory] = useState<SearchHistory[]>([])
  const [showHistory, setShowHistory] = useState(false)

  useEffect(() => {
    const history = loadSearchHistory()
    setCategories(getCategories(SALES_SCRIPTS))
    setSearchHistory(history)
  }, [])

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

  const handleCopy = (script: SalesScript) => {
    navigator.clipboard.writeText(script.answer)
    const updatedScripts = trackScriptUsage(scripts, script.id)
    setScripts(updatedScripts)
    setFilteredScripts(searchScripts(updatedScripts, searchQuery, selectedCategory))
  }

  const handleToggleFavorite = (script: SalesScript) => {
    const updatedScripts = toggleFavorite(scripts, script.id)
    setScripts(updatedScripts)
    setFilteredScripts(searchScripts(updatedScripts, searchQuery, selectedCategory))
  }

  const handleHistoryClick = (query: string) => {
    handleSearch(query, selectedCategory)
  }

  return (
    <main className="container mx-auto p-4 max-w-4xl">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">销售话术管理</h1>
        </div>

        <div className="relative">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Input
                placeholder="搜索问题或话术..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value, selectedCategory)}
                className="w-full pr-10"
              />
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2"
                onClick={() => setShowHistory(!showHistory)}
              >
                <History className="h-4 w-4 text-gray-400" />
              </button>
            </div>
            <Select
              value={selectedCategory}
              onValueChange={(value: string) => handleSearch(searchQuery, value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="选择分类" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">所有分类</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Search History Dropdown */}
          {showHistory && searchHistory.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
              {searchHistory.map((item, index) => (
                <button
                  key={index}
                  className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2"
                  onClick={() => handleHistoryClick(item.query)}
                >
                  <Search className="h-4 w-4 text-gray-400" />
                  {item.query}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="grid gap-4">
          {filteredScripts.map((script) => (
            <Card
              key={script.id}
              className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => {
                handleCopy(script);
                // Add visual feedback
                const card = document.getElementById(`script-${script.id}`);
                if (card) {
                  card.classList.add('bg-green-50');
                  setTimeout(() => card.classList.remove('bg-green-50'), 200);
                }
              }}
              id={`script-${script.id}`}
            >
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold">问题：{script.question}</h3>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleFavorite(script);
                      }}
                    >
                      <Star
                        className={`h-4 w-4 ${
                          script.isFavorite ? "fill-yellow-400 text-yellow-400" : "text-gray-400"
                        }`}
                      />
                    </Button>
                  </div>
                </div>
                <p className="text-gray-600">回答：{script.answer}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  {script.category && <span>分类：{script.category}</span>}
                  {script.useCount !== undefined && <span>使用次数：{script.useCount}</span>}
                </div>
              </div>
            </Card>
          ))}
          {filteredScripts.length === 0 && (
            <div className="text-center text-gray-500 py-8">
              没有找到匹配的话术
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

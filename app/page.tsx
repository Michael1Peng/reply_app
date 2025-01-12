"use client"

import { useState } from "react"
import { SALES_SCRIPTS } from "@/constants/scripts"
import { useSearch } from "@/lib/hooks/useSearch"
import { useScripts } from "@/lib/hooks/useScripts"
import { SearchBar } from "@/components/SearchBar"
import { ScriptCard } from "@/components/ScriptCard"

const COMMON_TAGS = [
  "需求确认",
  "创业介绍",
  "收益说明",
  "自我介绍",
  "产品介绍",
  "主理人",
  "加盟费用",
  "收益",
  "旅行团",
  "创业"
]

export default function Home() {
  const {
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
  } = useSearch(SALES_SCRIPTS)

  const { handleCopy, handleToggleFavorite } = useScripts(scripts, setScripts)

  return (
    <main className="container mx-auto p-4 max-w-4xl">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">销售话术管理</h1>
        </div>

        <SearchBar
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
          categories={categories}
          showHistory={showHistory}
          searchHistory={searchHistory}
          onSearch={handleSearch}
          onToggleHistory={() => setShowHistory(!showHistory)}
          onHistoryClick={(query) => handleSearch(query, selectedCategory)}
        />

        {/* Search History Tags */}
        {searchHistory.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {searchHistory.map((item, index) => (
              <button
                key={index}
                className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                onClick={() => handleSearch(item.query, selectedCategory)}
              >
                {item.query}
              </button>
            ))}
          </div>
        )}

        {/* Common Search Tags */}
        <div className="flex flex-wrap gap-2">
          {COMMON_TAGS.map((tag) => (
            <button
              key={tag}
              className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
              onClick={() => handleSearch(tag, selectedCategory)}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="grid gap-4">
          {filteredScripts.map((script) => (
            <ScriptCard
              key={script.id}
              script={script}
              onCopy={handleCopy}
              onToggleFavorite={handleToggleFavorite}
            />
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

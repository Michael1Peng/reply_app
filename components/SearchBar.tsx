import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { History } from "lucide-react"
import { SearchHistory } from "@/lib/types"

interface SearchBarProps {
  searchQuery: string
  selectedCategory: string
  categories: string[]
  showHistory: boolean
  searchHistory: SearchHistory[]
  onSearch: (query: string, category: string) => void
  onToggleHistory: () => void
  onHistoryClick: (query: string) => void
}

export function SearchBar({
  searchQuery,
  selectedCategory,
  categories,
  showHistory,
  searchHistory,
  onSearch,
  onToggleHistory,
  onHistoryClick
}: SearchBarProps) {
  return (
    <div className="relative">
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Input
            placeholder="搜索问题或话术..."
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value, selectedCategory)}
            className="w-full pr-10"
          />
          <button
            className="absolute right-3 top-1/2 -translate-y-1/2"
            onClick={onToggleHistory}
          >
            <History className="h-4 w-4 text-gray-400" />
          </button>
        </div>
        <Select
          value={selectedCategory}
          onValueChange={(value: string) => onSearch(searchQuery, value)}
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

      {showHistory && searchHistory.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
          {searchHistory.map((item, index) => (
            <button
              key={index}
              className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2"
              onClick={() => onHistoryClick(item.query)}
            >
              {item.query}
            </button>
          ))}
        </div>
      )}
    </div>
  )
} 

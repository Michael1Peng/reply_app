"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScriptDialog } from "./components/script-dialog"
import { SalesScript } from "@/lib/types"
import { loadScripts, saveScripts, searchScripts } from "@/lib/storage"

export default function Home() {
  const [scripts, setScripts] = useState<SalesScript[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredScripts, setFilteredScripts] = useState<SalesScript[]>([])

  useEffect(() => {
    const savedScripts = loadScripts()
    setScripts(savedScripts)
    setFilteredScripts(savedScripts)
  }, [])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    setFilteredScripts(searchScripts(scripts, query))
  }

  const handleSave = (script: SalesScript) => {
    const newScripts = [...scripts, script]
    setScripts(newScripts)
    setFilteredScripts(searchScripts(newScripts, searchQuery))
    saveScripts(newScripts)
  }

  return (
    <main className="container mx-auto p-4 max-w-4xl">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">销售话术管理</h1>
          <ScriptDialog onSave={handleSave} />
        </div>

        <div className="w-full">
          <Input
            placeholder="搜索问题或话术..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full"
          />
        </div>

        <div className="grid gap-4">
          {filteredScripts.map((script) => (
            <Card key={script.id} className="p-4">
              <div className="space-y-2">
                <h3 className="font-semibold">问题：{script.question}</h3>
                <p className="text-gray-600">回答：{script.answer}</p>
              </div>
            </Card>
          ))}
          {filteredScripts.length === 0 && (
            <div className="text-center text-gray-500 py-8">
              {scripts.length === 0 ? "暂无话术，请添加" : "没有找到匹配的话术"}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

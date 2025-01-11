"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SalesScript } from "@/lib/types"

interface ScriptDialogProps {
  onSave: (script: SalesScript) => void;
  categories: string[];
}

export function ScriptDialog({ onSave, categories }: ScriptDialogProps) {
  const [open, setOpen] = useState(false)
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")
  const [category, setCategory] = useState("")
  const [newCategory, setNewCategory] = useState("")

  const handleSave = () => {
    if (!question.trim() || !answer.trim()) return

    onSave({
      id: Date.now().toString(),
      question: question.trim(),
      answer: answer.trim(),
      category: newCategory.trim() || category,
    })

    setQuestion("")
    setAnswer("")
    setCategory("")
    setNewCategory("")
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">添加话术</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>添加新的销售话术</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <label htmlFor="question">问题</label>
            <Input
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="输入可能的客户问题"
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="answer">回答话术</label>
            <Textarea
              id="answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="输入对应的回答话术"
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="category">分类</label>
            <div className="flex gap-2">
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="选择分类" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                placeholder="或输入新分类"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <Button onClick={handleSave}>保存</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

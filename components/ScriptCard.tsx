import { SalesScript } from "@/lib/types"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"

interface ScriptCardProps {
  script: SalesScript
  onCopy: (script: SalesScript) => void
  onToggleFavorite: (script: SalesScript) => void
}

export function ScriptCard({ script, onCopy, onToggleFavorite }: ScriptCardProps) {
  return (
    <Card
      key={script.id}
      className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
      onClick={() => onCopy(script)}
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
                e.stopPropagation()
                onToggleFavorite(script)
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
  )
} 

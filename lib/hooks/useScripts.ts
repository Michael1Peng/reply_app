import { SalesScript } from "@/lib/types"
import { toggleFavorite as toggleFavoriteStorage, trackScriptUsage as trackUsage } from "@/lib/storage"

export function useScripts(scripts: SalesScript[], setScripts: (scripts: SalesScript[]) => void) {
  const handleCopy = (script: SalesScript) => {
    navigator.clipboard.writeText(script.answer)
    const updatedScripts = trackUsage(scripts, script.id)
    setScripts(updatedScripts)
  }

  const handleToggleFavorite = (script: SalesScript) => {
    const updatedScripts = toggleFavoriteStorage(scripts, script.id)
    setScripts(updatedScripts)
  }

  return {
    handleCopy,
    handleToggleFavorite
  }
} 

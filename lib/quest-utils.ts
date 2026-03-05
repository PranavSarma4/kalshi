import { type Quest } from "@/lib/mockData"

const estimateHours: Record<Quest["timeEstimate"], number> = {
  "30 min": 0.5,
  "1-2 hrs": 1.5,
  "2-4 hrs": 3,
  "4-6 hrs": 5,
}

export function getEstimatedHours(timeEstimate: Quest["timeEstimate"]) {
  return estimateHours[timeEstimate]
}

export function getUniqueValues<T extends keyof Quest>(quests: Quest[], key: T) {
  return [...new Set(quests.map((quest) => quest[key]))]
}

"use client"

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import { initialProject, initialQuests, type Quest, type TeamProject } from "@/lib/mockData"

type QuestInput = {
  title: string
  description: string
  teamName: string
  teamProject: string
  task: string
  verificationMethod: string
  verificationCount: number
  points: number
  community: string
  disasterType: Quest["disasterType"]
  taskType: Quest["taskType"]
  timeEstimate: Quest["timeEstimate"]
  difficulty: Quest["difficulty"]
  location: Quest["location"]
  dueDate: string
  impactTag: string
  phase: Quest["phase"]
}

type DemoContextValue = {
  quests: Quest[]
  project: TeamProject
  pointsByQuest: Record<string, number>
  authRole: "student" | "arc" | null
  signIn: (role: "student" | "arc") => void
  signOut: () => void
  acceptQuest: (id: string) => void
  submitQuestProof: (id: string, points: number) => void
  approveQuest: (id: string) => void
  createQuest: (input: QuestInput) => void
}

const DemoContext = createContext<DemoContextValue | null>(null)

export function DemoProvider({ children }: { children: ReactNode }) {
  const [quests, setQuests] = useState<Quest[]>(initialQuests)
  const [project] = useState<TeamProject>(initialProject)
  const [pointsByQuest, setPointsByQuest] = useState<Record<string, number>>({})
  const [authRole, setAuthRole] = useState<"student" | "arc" | null>(null)

  const signIn = useCallback((role: "student" | "arc") => setAuthRole(role), [])
  const signOut = useCallback(() => setAuthRole(null), [])

  const acceptQuest = useCallback((id: string) => {
    setQuests((prev) => prev.map((quest) => (quest.id === id ? { ...quest, status: "claimed" } : quest)))
  }, [])

  const submitQuestProof = useCallback((id: string, points: number) => {
    setQuests((prev) =>
      prev.map((quest) => (quest.id === id ? { ...quest, status: "submitted" } : quest)),
    )
    setPointsByQuest((prev) => ({ ...prev, [id]: points }))
  }, [])

  const approveQuest = useCallback((id: string) => {
    setQuests((prev) => prev.map((quest) => (quest.id === id ? { ...quest, status: "approved" } : quest)))
  }, [])

  const createQuest = useCallback((input: QuestInput) => {
    setQuests((prev) => {
      const nextNumber = prev.length + 101
      const quest: Quest = {
        id: `Q-${nextNumber}`,
        ...input,
        status: "open",
      }
      return [quest, ...prev]
    })
  }, [])

  const value = useMemo(
    () => ({
      quests,
      project,
      pointsByQuest,
      authRole,
      signIn,
      signOut,
      acceptQuest,
      submitQuestProof,
      approveQuest,
      createQuest,
    }),
    [quests, project, pointsByQuest, authRole, signIn, signOut, acceptQuest, submitQuestProof, approveQuest, createQuest],
  )

  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>
}

export function useDemo() {
  const context = useContext(DemoContext)
  if (!context) {
    throw new Error("useDemo must be used within DemoProvider")
  }
  return context
}

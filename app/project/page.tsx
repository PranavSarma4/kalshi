"use client"

import { AppShell } from "@/components/app-shell"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useDemo } from "@/lib/demo-context"
import type { TimelinePhase } from "@/lib/mockData"

const phaseColors: Record<string, { border: string; bg: string; badge: string; dot: string; accent: string }> = {
  april: {
    border: "border-red-200",
    bg: "bg-red-50/60",
    badge: "bg-[var(--arc-red)] text-white",
    dot: "bg-[var(--arc-red)]",
    accent: "text-[var(--arc-red)]",
  },
  may: {
    border: "border-blue-200",
    bg: "bg-blue-50/60",
    badge: "bg-blue-600 text-white",
    dot: "bg-blue-600",
    accent: "text-blue-600",
  },
  "june-july": {
    border: "border-emerald-200",
    bg: "bg-emerald-50/60",
    badge: "bg-emerald-600 text-white",
    dot: "bg-emerald-600",
    accent: "text-emerald-600",
  },
}

function milestoneStatusStyle(status: string) {
  if (status === "done") return "border-emerald-300 bg-emerald-50 text-emerald-700"
  if (status === "active") return "border-amber-300 bg-amber-50 text-amber-700"
  return "border-slate-200 bg-white text-slate-500"
}

export default function ProjectPage() {
  const { project, quests } = useDemo()
  const completed = quests.filter((q) => q.status === "approved").length
  const trackerValue = Math.min(Math.round((completed / Math.max(quests.length, 1)) * 100), 100)

  return (
    <AppShell
      role="student"
      title="My Project"
      subtitle="Phase-based timeline with milestones, risks with mitigants, and overall progress toward community preparedness goals."
    >
      {/* Timeline header */}
      <div className="mb-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-[var(--arc-border)]" />
        <span className="font-mono-label text-[10px] uppercase tracking-[0.16em] text-slate-400">
          Impact Teams Project Timeline
        </span>
        <div className="h-px flex-1 bg-[var(--arc-border)]" />
      </div>
      <p className="-mt-4 mb-8 text-center text-xs text-slate-500">
        Submission checkpoints designed to provide guidance and structure
      </p>

      {/* Timeline phases */}
      <section className="space-y-6">
        {project.timeline.map((phase) => (
          <PhaseCard key={phase.id} phase={phase} />
        ))}
      </section>

      {/* Risks */}
      <Card className="surface-card animate-fade-up mt-8">
        <CardHeader>
          <CardTitle className="text-[var(--arc-navy)]">Risks and Mitigants</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {project.risks.map((r) => (
            <div key={r.risk} className="rounded-md border border-[var(--arc-border)] p-3">
              <div className="flex items-center justify-between">
                <p className="font-medium text-slate-900">{r.risk}</p>
                <Badge variant="outline" className="capitalize">
                  {r.level}
                </Badge>
              </div>
              <p className="mt-1 text-sm text-slate-600">Mitigant: {r.mitigant}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Progress */}
      <Card className="surface-card animate-fade-up mt-6">
        <CardHeader>
          <CardTitle className="text-[var(--arc-navy)]">Progress Tracker</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-600">Approved Quests Completion</span>
            <span className="font-medium text-slate-900">{trackerValue}%</span>
          </div>
          <Progress value={trackerValue} />
        </CardContent>
      </Card>
    </AppShell>
  )
}

function PhaseCard({ phase }: { phase: TimelinePhase }) {
  const colors = phaseColors[phase.id]

  return (
    <Card className={`surface-card animate-fade-up overflow-hidden border ${colors.border}`}>
      {/* Phase header bar */}
      <div className={`${colors.bg} px-6 py-4`}>
        <div className="flex flex-wrap items-center gap-3">
          <span className={`rounded-full px-3 py-1 text-xs font-bold ${colors.badge}`}>{phase.label}</span>
          <h3 className="text-lg font-semibold text-[var(--arc-navy)]">{phase.subtitle}</h3>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">{phase.description}</p>
      </div>

      <CardContent className="space-y-6 p-6">
        {/* Activities */}
        <div>
          <CardDescription className="mb-3 font-semibold uppercase tracking-wider">Activities</CardDescription>
          <ul className="space-y-2">
            {phase.activities.map((activity) => (
              <li key={activity} className="flex items-start gap-2 text-sm text-slate-700">
                <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${colors.dot}`} />
                {activity}
              </li>
            ))}
          </ul>
        </div>

        {/* Checkpoint */}
        <div className={`rounded-lg border ${colors.border} ${colors.bg} p-4`}>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Checkpoint</p>
          <p className="mt-1 text-sm font-medium text-slate-900">{phase.checkpoint}</p>
        </div>

        {/* Milestones */}
        <div>
          <CardDescription className="mb-3 font-semibold uppercase tracking-wider">Milestones</CardDescription>
          <div className="space-y-3">
            {phase.milestones.map((m, i) => (
              <div key={m.name} className={`flex items-start gap-3 rounded-lg border p-3 ${milestoneStatusStyle(m.status)}`}>
                <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${colors.dot}`}>
                  {i + 1}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-medium text-slate-900">{m.name}</p>
                    <Badge variant="outline" className="capitalize">
                      {m.status}
                    </Badge>
                  </div>
                  <p className="mt-0.5 text-sm text-slate-600">{m.target}</p>
                  <p className="mt-0.5 text-xs text-slate-400">Due {m.due}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

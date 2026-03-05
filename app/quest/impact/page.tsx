"use client"

import { AppShell } from "@/components/app-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useDemo } from "@/lib/demo-context"
import { getEstimatedHours } from "@/lib/quest-utils"

export default function QuestImpactPage() {
  const { quests, pointsByQuest } = useDemo()

  const approvedQuests = quests.filter((quest) => quest.status === "approved")
  const submittedOrApproved = quests.filter((quest) => quest.status === "submitted" || quest.status === "approved")
  const pointsEarned = submittedOrApproved.reduce((sum, quest) => sum + (pointsByQuest[quest.id] ?? 0), 0)
  const hoursContributed = approvedQuests.reduce((sum, quest) => sum + getEstimatedHours(quest.timeEstimate), 0)

  const impactByType = submittedOrApproved.reduce<Record<string, number>>((acc, quest) => {
    acc[quest.taskType] = (acc[quest.taskType] ?? 0) + 1
    return acc
  }, {})

  const impactEntries = Object.entries(impactByType)
  const maxValue = Math.max(...impactEntries.map(([, value]) => value), 1)

  return (
    <AppShell
      role="student"
      title="Impact Tracker"
      subtitle="Track your contributions and see how your work strengthens community resilience."
    >
      <section className="grid gap-5 md:grid-cols-3">
        <MetricCard label="Points Earned" value={String(pointsEarned)} />
        <MetricCard label="Hours Contributed" value={hoursContributed.toFixed(1)} />
        <MetricCard label="Quests Completed" value={String(approvedQuests.length)} />
      </section>

      <section className="mt-6 grid gap-5 lg:grid-cols-2">
        <Card className="surface-card animate-fade-up">
          <CardHeader>
            <CardTitle className="text-[var(--arc-navy)]">Community Impact by Task Type</CardTitle>
            <CardDescription>Your submitted and approved work grouped by task category.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {impactEntries.length === 0 ? (
              <p className="text-sm text-slate-600">
                No completed quests yet. Accept and submit quests to start tracking your impact.
              </p>
            ) : (
              impactEntries.map(([label, value]) => (
                <div key={label}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="text-slate-700">{label}</span>
                    <span className="font-medium text-slate-900">{value}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded bg-slate-100">
                    <div
                      className="h-2 rounded bg-[var(--arc-red)] transition-all duration-500"
                      style={{ width: `${Math.max((value / maxValue) * 100, 8)}%` }}
                    />
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        <Card className="surface-card animate-fade-up">
          <CardHeader>
            <CardTitle className="text-[var(--arc-navy)]">How Points Work</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-slate-700">
            <p>Points are assigned when you submit proof of quest completion (10, 20, or 40 points per quest).</p>
            <p>Hours are counted when your submitted quests are approved by the project team.</p>
            <p>
              Accumulate points to earn ARC-Certified Service Awards — Bronze, Silver, and Gold — recognized on
              your resume and for community service requirements.
            </p>
          </CardContent>
        </Card>
      </section>
    </AppShell>
  )
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <Card className="surface-card animate-fade-up">
      <CardHeader className="pb-2">
        <CardDescription>{label}</CardDescription>
        <CardTitle className="text-3xl text-[var(--arc-navy)]">{value}</CardTitle>
      </CardHeader>
      <CardContent />
    </Card>
  )
}

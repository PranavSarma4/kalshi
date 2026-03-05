"use client"

import Link from "next/link"
import { AppShell } from "@/components/app-shell"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useDemo } from "@/lib/demo-context"

export default function AdminDashboardPage() {
  const { project, quests } = useDemo()
  const submitted = quests.filter((q) => q.status === "submitted").length
  const approved = quests.filter((q) => q.status === "approved").length
  const { mobilizationMetrics, cohesionMetrics } = project

  return (
    <AppShell role="arc" title="Program Dashboard" subtitle="Overview of project delivery, mobilization metrics, and social cohesion indicators.">
      <section className="grid gap-5 lg:grid-cols-3">
        <Card className="surface-card animate-fade-up lg:col-span-2">
          <CardHeader>
            <CardDescription>{project.partnerOrg}</CardDescription>
            <CardTitle className="text-[var(--arc-navy)]">{project.projectName}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-slate-700">
            <p><span className="font-medium text-slate-900">Community:</span> {project.community}</p>
            <p><span className="font-medium text-slate-900">Disaster Threat:</span> {project.disasterThreat}</p>
            <div className="space-y-2">
              {project.objectives.map((obj) => (
                <div key={obj} className="rounded-md border border-[var(--arc-border)] bg-[var(--arc-surface)] p-2">{obj}</div>
              ))}
            </div>
          </CardContent>
        </Card>
        <div className="space-y-5">
          <Card className="surface-card animate-fade-up">
            <CardHeader className="pb-2"><CardTitle className="text-sm text-[var(--arc-navy)]">Mobilization Metrics</CardTitle></CardHeader>
            <CardContent className="space-y-2 text-sm">
              <Row label="Volunteers Onboarded" value={mobilizationMetrics.volunteersOnboarded} />
              <Row label="Quests Claimed" value={mobilizationMetrics.claimedQuests} />
              <Row label="Quests Completed" value={mobilizationMetrics.completedQuests} />
            </CardContent>
          </Card>
          <Card className="surface-card animate-fade-up">
            <CardHeader className="pb-2"><CardTitle className="text-sm text-[var(--arc-navy)]">Social Cohesion Indicators</CardTitle></CardHeader>
            <CardContent className="space-y-2 text-sm">
              <Row label="Partner Check-Ins" value={cohesionMetrics.partnerCheckIns} />
              <Row label="Avg. Response Time (hrs)" value={cohesionMetrics.responseTimeHours} />
              <Row label="Module Completion" value={`${cohesionMetrics.moduleCompletionRate}%`} />
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mt-6 grid gap-5 md:grid-cols-2">
        <Card className="surface-card animate-fade-up">
          <CardHeader className="pb-2"><CardTitle className="text-sm text-[var(--arc-navy)]">Delivery Progress</CardTitle></CardHeader>
          <CardContent className="space-y-3 text-sm">
            <ProgressRow label="Submitted Quests" value={submitted} max={10} />
            <ProgressRow label="Approved Quests" value={approved} max={10} />
          </CardContent>
        </Card>
        <Card className="surface-card animate-fade-up">
          <CardHeader className="pb-2"><CardTitle className="text-sm text-[var(--arc-navy)]">Quests Needed From Volunteers</CardTitle></CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {project.questsNeeded.map((q) => <Badge key={q} variant="outline">{q}</Badge>)}
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-2">
        <QuickLink title="Quest Management" href="/admin/quests" description="Create quests, approve submissions, and manage the quest lifecycle." />
      </section>
    </AppShell>
  )
}

function Row({ label, value }: { label: string; value: number | string }) {
  return <div className="flex items-center justify-between"><span className="text-slate-600">{label}</span><span className="font-semibold text-[var(--arc-navy)]">{value}</span></div>
}
function ProgressRow({ label, value, max }: { label: string; value: number; max: number }) {
  return <div><div className="mb-1 flex justify-between"><span className="text-slate-600">{label}</span><span className="font-medium text-slate-900">{value}</span></div><Progress value={Math.min((value / max) * 100, 100)} /></div>
}
function QuickLink({ title, href, description }: { title: string; href: string; description: string }) {
  return <Link href={href}><Card className="surface-card h-full transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--arc-red)] hover:bg-[var(--arc-surface)]"><CardHeader><CardTitle className="text-base text-[var(--arc-navy)]">{title}</CardTitle><CardDescription>{description}</CardDescription></CardHeader><CardContent /></Card></Link>
}

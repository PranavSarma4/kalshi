import { CheckSquare, GraduationCap, Megaphone, Users } from "lucide-react"
import { AppShell } from "@/components/app-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const modules = [
  { title: "Civic Project Scoping in 30 Minutes", focus: "Define measurable outcomes and partner handoff criteria for community-led initiatives.", icon: GraduationCap },
  { title: "Cross-Team Communication Basics", focus: "Set clear rhythms for status updates, escalation paths, and working with external partners.", icon: Users },
  { title: "Risk Review Checklist", focus: "Identify critical delivery blockers and develop mitigants before they become problems.", icon: CheckSquare },
  { title: "Community Mobilization Principles", focus: "How to transition from ARC-led to community-led disaster readiness, using student volunteers as mobilizers.", icon: Megaphone },
]

const checklist = [
  "Align scope and timeline with ARC partner org by weekly check-in.",
  "Define quest acceptance criteria before posting to the volunteer feed.",
  "Document one owner per milestone and one backup owner.",
  "Break large deliverables into quest-sized micro-tasks (30 min to 4 hrs).",
  "Run 15-minute readiness review before any community-facing event.",
  "Collect feedback from partner org after each milestone completion.",
]

export default function ToolkitPage() {
  return (
    <AppShell role="student" title="Team Toolkit" subtitle="PM learning modules, checklists, and collaboration guidance to help you lead your project.">
      <section className="grid gap-4 md:grid-cols-2">
        {modules.map((mod) => {
          const Icon = mod.icon
          return (
            <Card key={mod.title} className="surface-card animate-fade-up">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base text-[var(--arc-navy)]">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--arc-surface)]"><Icon className="h-4 w-4 text-[var(--arc-red)]" /></div>
                  {mod.title}
                </CardTitle>
                <CardDescription>{mod.focus}</CardDescription>
              </CardHeader>
              <CardContent />
            </Card>
          )
        })}
      </section>

      <section className="mt-6 grid gap-4 lg:grid-cols-2">
        <Card className="surface-card animate-fade-up">
          <CardHeader><CardTitle className="text-[var(--arc-navy)]">Deployment Checklist</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm text-slate-700">
            {checklist.map((item) => (
              <p key={item} className="rounded-md border border-[var(--arc-border)] bg-[var(--arc-surface)] p-2">{item}</p>
            ))}
          </CardContent>
        </Card>
        <Card className="surface-card animate-fade-up">
          <CardHeader><CardTitle className="text-[var(--arc-navy)]">Collaboration Guidance</CardTitle></CardHeader>
          <CardContent className="space-y-3 text-sm text-slate-700">
            <p>Use concise updates with blockers, owner, and deadline in one line.</p>
            <p>Prioritize tasks with direct community readiness impact first.</p>
            <p>Escalate partner dependency risks within 24 hours, not at end of sprint.</p>
            <p>Use the quest system to delegate work to other student volunteers — this builds their skills while advancing your project deliverables.</p>
          </CardContent>
        </Card>
      </section>
    </AppShell>
  )
}

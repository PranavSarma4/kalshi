import Link from "next/link"
import { AppShell } from "@/components/app-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const studentRoutes = [
  { href: "/", label: "Public Home" },
  { href: "/login/student", label: "Student Login" },
  { href: "/quest", label: "Quest Feed" },
  { href: "/quest/impact", label: "Impact Tracker" },
  { href: "/quest/leaderboard", label: "Leaderboard" },
  { href: "/project", label: "My Project" },
  { href: "/project/toolkit", label: "Toolkit" },
  { href: "/project/resources", label: "Resources" },
  { href: "/project/proposal", label: "Proposal Builder" },
]

const adminRoutes = [
  { href: "/admin/login", label: "Admin Login" },
  { href: "/admin", label: "Program Dashboard" },
  { href: "/admin/quests", label: "Quest Management" },
]

const demoFlow = [
  "Start at the Public Home page — note that only the student path is visible. No link to the admin site.",
  "Log in as a Student and browse the Quest Feed. Filter by task type or time estimate.",
  "Open a quest detail, accept it, then submit proof with 40 points. Notice the status changes.",
  "Open the Impact Tracker to see updated points, hours, and task-type breakdown.",
  "Visit the Leaderboard to show ARC-Certified Service Award tiers (Bronze, Silver, Gold).",
  "Open My Project to see milestones, risks, and a progress tracker for your team.",
  "Visit the Toolkit for PM learning modules, checklists, and collaboration guidance.",
  "Browse Resources — ARC disaster prep materials, delegation guides, and skill-building content.",
  "Open the Proposal Builder, submit a proposal to ARC with mock confirmation.",
  "Now navigate to /admin/login separately — this is the ARC staff portal, not accessible from the student site.",
  "Log in as ARC Staff. View the Program Dashboard with mobilization and cohesion metrics.",
  "Open Quest Management — create a new quest, then approve a submitted quest to show the admin-only approval flow.",
]

export default function DemoControlCenterPage() {
  return (
    <AppShell role="arc" title="Demo Control Center" subtitle="Quick navigation and suggested demo walkthrough flow.">
      <section className="grid gap-6 md:grid-cols-2">
        <div>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">Student Site</h2>
          <div className="grid gap-2">
            {studentRoutes.map((route) => (
              <Button key={route.href} asChild variant="outline" className="h-auto justify-start border-[var(--arc-border)] bg-white py-2.5 text-left text-[var(--arc-navy)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--arc-red)] hover:bg-[var(--arc-surface)]">
                <Link href={route.href}>{route.label}</Link>
              </Button>
            ))}
          </div>
        </div>
        <div>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">Admin / ARC Staff Site</h2>
          <div className="grid gap-2">
            {adminRoutes.map((route) => (
              <Button key={route.href} asChild variant="outline" className="h-auto justify-start border-[var(--arc-border)] bg-white py-2.5 text-left text-[var(--arc-navy)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--arc-red)] hover:bg-[var(--arc-surface)]">
                <Link href={route.href}>{route.label}</Link>
              </Button>
            ))}
          </div>
        </div>
      </section>

      <Card className="surface-card animate-fade-up mt-6">
        <CardHeader>
          <CardTitle className="text-[var(--arc-navy)]">Suggested 60-Second Demo Flow</CardTitle>
          <CardDescription>Use this sequence to narrate the full student-to-ARC lifecycle.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-slate-700">
          {demoFlow.map((step, i) => (
            <p key={i}><span className="font-semibold text-[var(--arc-red)]">{i + 1}.</span> {step}</p>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  )
}

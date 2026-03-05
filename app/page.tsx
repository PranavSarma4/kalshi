"use client"

import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  BookOpen,
  Calendar,
  CheckSquare,
  ClipboardList,
  GraduationCap,
  Megaphone,
  Star,
  Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useDemo } from "@/lib/demo-context"

const trainingModules = [
  {
    title: "Civic Project Scoping",
    description: "Define measurable outcomes and partner handoff criteria for community-led initiatives.",
    icon: GraduationCap,
    duration: "30 min",
  },
  {
    title: "Community Engagement 101",
    description: "Learn how to approach residents, build trust, and conduct effective surveys and interviews.",
    icon: Users,
    duration: "25 min",
  },
  {
    title: "Data Collection Best Practices",
    description: "How to gather accurate community input and organize responses for your Impact Team.",
    icon: CheckSquare,
    duration: "20 min",
  },
  {
    title: "Community Mobilization Principles",
    description: "Transition from ARC-led to community-led disaster readiness, using student volunteers as mobilizers.",
    icon: Megaphone,
    duration: "30 min",
  },
]

export default function Home() {
  const { authRole, project } = useDemo()
  const isSignedIn = authRole === "student"

  const nextCheckpoints = isSignedIn
    ? project.timeline
        .flatMap((phase) =>
          phase.milestones
            .filter((m) => m.status === "active" || m.status === "upcoming")
            .map((m) => ({ ...m, phaseLabel: phase.label })),
        )
        .slice(0, 4)
    : []

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <header className="border-b border-[var(--arc-border)]">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <Image
              src="/american-red-cross-mark.svg"
              alt="American Red Cross"
              width={40}
              height={40}
              className="rounded-md"
            />
            <div>
              <p className="font-mono-label text-[10px] font-medium uppercase tracking-[0.16em] text-[var(--arc-red)]">
                American Red Cross
              </p>
              <p className="text-sm font-semibold text-[var(--arc-navy)]">
                Youth Resilience &amp; Mobilization Program
              </p>
            </div>
          </div>
          {isSignedIn ? (
            <div className="flex items-center gap-2">
              <Button asChild size="sm" variant="outline">
                <Link href="/quest">Quest Feed</Link>
              </Button>
              <Button asChild size="sm" variant="outline">
                <Link href="/project">My Project</Link>
              </Button>
            </div>
          ) : (
            <Button asChild size="sm" className="bg-[var(--arc-red)] text-white hover:bg-[var(--arc-red-dark)]">
              <Link href="/login/student">Sign In</Link>
            </Button>
          )}
        </div>
      </header>

      <main className="flex flex-1 flex-col px-6 py-12">
        {/* Hero */}
        <div className="animate-fade-up mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-[var(--arc-navy)]">
            Building Community Resilience
            <br />
            <span className="text-[var(--arc-red)]">Through Youth Mobilization</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-slate-600">
            Strengthening social cohesion and disaster preparedness by connecting students with
            community-led initiatives through structured project teams and a volunteer quest system.
          </p>
        </div>

        {isSignedIn ? (
          /* ===== SIGNED-IN DASHBOARD ===== */
          <div className="animate-fade-up mx-auto mt-12 w-full max-w-5xl space-y-10">
            {/* Quick Actions */}
            <section className="grid gap-4 md:grid-cols-3">
              <Link href="/quest">
                <Card className="surface-card h-full transition-all duration-200 hover:-translate-y-1 hover:border-[var(--arc-red)]">
                  <CardHeader className="pb-2">
                    <div className="mb-1 flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--arc-surface)]">
                      <ClipboardList className="h-5 w-5 text-[var(--arc-red)]" />
                    </div>
                    <CardTitle className="text-base text-[var(--arc-navy)]">Browse Quests</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Find community input quests from local Impact Teams. Gather resident feedback and earn points.
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/project">
                <Card className="surface-card h-full transition-all duration-200 hover:-translate-y-1 hover:border-[var(--arc-red)]">
                  <CardHeader className="pb-2">
                    <div className="mb-1 flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--arc-surface)]">
                      <Star className="h-5 w-5 text-[var(--arc-red)]" />
                    </div>
                    <CardTitle className="text-base text-[var(--arc-navy)]">My Project & Timeline</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      View milestones, checkpoints, and track progress across all three project phases.
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/quest/impact">
                <Card className="surface-card h-full transition-all duration-200 hover:-translate-y-1 hover:border-[var(--arc-red)]">
                  <CardHeader className="pb-2">
                    <div className="mb-1 flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--arc-surface)]">
                      <Users className="h-5 w-5 text-[var(--arc-red)]" />
                    </div>
                    <CardTitle className="text-base text-[var(--arc-navy)]">Impact Tracker</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      See your points, hours contributed, and how your quest work is making communities more resilient.
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
            </section>

            {/* Training Modules */}
            <section>
              <div className="mb-4 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-[var(--arc-red)]" />
                <h2 className="text-lg font-semibold text-[var(--arc-navy)]">Training Modules</h2>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {trainingModules.map((mod) => {
                  const Icon = mod.icon
                  return (
                    <Card key={mod.title} className="surface-card transition-all duration-200 hover:-translate-y-0.5">
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--arc-surface)]">
                            <Icon className="h-4 w-4 text-[var(--arc-red)]" />
                          </div>
                          <Badge variant="outline" className="text-xs">{mod.duration}</Badge>
                        </div>
                        <CardTitle className="text-sm text-[var(--arc-navy)]">{mod.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-xs">{mod.description}</CardDescription>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
              <div className="mt-3 text-right">
                <Link href="/project/toolkit" className="text-sm font-medium text-[var(--arc-red-dark)] underline underline-offset-4">
                  View all modules & toolkit &rarr;
                </Link>
              </div>
            </section>

            {/* Upcoming Checkpoints */}
            {nextCheckpoints.length > 0 && (
              <section>
                <div className="mb-4 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-[var(--arc-red)]" />
                  <h2 className="text-lg font-semibold text-[var(--arc-navy)]">Upcoming Checkpoints</h2>
                </div>
                <Card className="surface-card">
                  <CardContent className="divide-y divide-[var(--arc-border)] p-0">
                    {nextCheckpoints.map((cp) => (
                      <div key={cp.name} className="flex items-center gap-4 px-5 py-4">
                        <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${cp.status === "active" ? "bg-amber-500" : "bg-slate-300"}`}>
                          {cp.status === "active" ? "!" : "—"}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-slate-900">{cp.name}</p>
                          <p className="text-xs text-slate-500">{cp.target}</p>
                        </div>
                        <div className="shrink-0 text-right">
                          <Badge variant="outline" className="capitalize">{cp.status}</Badge>
                          <p className="mt-0.5 text-xs text-slate-400">{cp.phaseLabel} &middot; {cp.due}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
                <div className="mt-3 text-right">
                  <Link href="/project" className="text-sm font-medium text-[var(--arc-red-dark)] underline underline-offset-4">
                    View full project timeline &rarr;
                  </Link>
                </div>
              </section>
            )}
          </div>
        ) : (
          /* ===== SIGNED-OUT LANDING ===== */
          <>
            <section className="animate-fade-up mx-auto mt-12 w-full max-w-lg">
              <Card className="surface-card group transition-all duration-200 hover:-translate-y-1 hover:border-[var(--arc-red)]">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--arc-surface)]">
                    <GraduationCap className="h-6 w-6 text-[var(--arc-red)]" />
                  </div>
                  <CardTitle className="text-[var(--arc-navy)]">Get Started as a Student Volunteer</CardTitle>
                  <CardDescription>
                    Browse volunteer quests from local project teams, earn ARC-Certified Service Awards,
                    and track your community impact — all in one place.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full bg-[var(--arc-red)] text-white hover:bg-[var(--arc-red-dark)]">
                    <Link href="/login/student">
                      Sign In to Quest Portal
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <p className="mt-3 text-center text-xs text-slate-500">
                    For students from career clubs, DECA, FBLA, volunteer organizations, and schools with
                    community service requirements
                  </p>
                </CardContent>
              </Card>
            </section>

            <section className="animate-fade-up mx-auto mt-16 max-w-3xl text-center">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">How It Works</h2>
              <div className="mt-6 grid gap-8 md:grid-cols-3">
                <div>
                  <div className="mx-auto mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-[var(--arc-red)] text-sm font-bold text-white">
                    1
                  </div>
                  <h3 className="text-sm font-semibold text-[var(--arc-navy)]">Impact Teams Post Quests</h3>
                  <p className="mt-1 text-xs text-slate-500">
                    Teams working with local organizations post quests to gather community input for their resilience projects.
                  </p>
                </div>
                <div>
                  <div className="mx-auto mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-[var(--arc-red)] text-sm font-bold text-white">
                    2
                  </div>
                  <h3 className="text-sm font-semibold text-[var(--arc-navy)]">You Gather Resident Feedback</h3>
                  <p className="mt-1 text-xs text-slate-500">
                    Survey, interview, and canvass community members. Submit phone numbers — we verify via text.
                  </p>
                </div>
                <div>
                  <div className="mx-auto mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-[var(--arc-red)] text-sm font-bold text-white">
                    3
                  </div>
                  <h3 className="text-sm font-semibold text-[var(--arc-navy)]">Earn Points, Build Impact</h3>
                  <p className="mt-1 text-xs text-slate-500">
                    Earn ARC-Certified awards, track your impact, and help communities become more disaster-prepared.
                  </p>
                </div>
              </div>
            </section>
          </>
        )}
      </main>

      <footer className="border-t border-[var(--arc-border)] py-4 text-center text-xs text-slate-400">
        American Red Cross Youth Resilience &amp; Mobilization Program &mdash; Demo Platform
      </footer>
    </div>
  )
}

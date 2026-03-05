import {
  BookOpen, FileText, Globe, GraduationCap, Handshake, HeartPulse, Megaphone, Shield, Target, Users,
} from "lucide-react"
import { AppShell } from "@/components/app-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const arcResources = [
  { title: "Disaster Preparedness Fundamentals", description: "ARC guidelines on household emergency plans, shelter logistics, and community alert systems.", icon: Shield, category: "ARC Resources" },
  { title: "Community Mobilization Framework", description: "How to transition from ARC-led to community-led disaster readiness initiatives.", icon: Megaphone, category: "ARC Resources" },
  { title: "Social Cohesion Measurement Guide", description: "Tools to assess network strength, trust indicators, and neighborhood collaboration scores.", icon: HeartPulse, category: "ARC Resources" },
  { title: "Partner Organization Toolkit", description: "Templates for co-design workshops, partner alignment meetings, and shared KPI tracking.", icon: Handshake, category: "ARC Resources" },
]

const pmResources = [
  { title: "Civic Project Scoping in 30 Minutes", description: "Define measurable outcomes, partner handoff criteria, and scope boundaries quickly.", icon: Target, category: "Project Management" },
  { title: "Delegation Through the Quest System", description: "Break project needs into micro-tasks that volunteers can claim and complete independently.", icon: FileText, category: "Project Management" },
  { title: "Cross-Team Communication Basics", description: "Set clear rhythms for status updates, escalation paths, and stakeholder check-ins.", icon: Users, category: "Project Management" },
  { title: "Working With External Partners", description: "Collaboration and communication skills for engaging people outside your core team.", icon: Globe, category: "Project Management" },
]

const skillBuilding = [
  { title: "Youth Leadership Development", description: "Build leadership skills through structured project ownership and community engagement.", icon: GraduationCap, category: "Skill Building" },
  { title: "ARC Regional Summit Preparation", description: "All completed projects are invited to present at regular regional summits with ARC leadership.", icon: BookOpen, category: "Skill Building" },
]

export default function ResourcesPage() {
  return (
    <AppShell role="student" title="Resources" subtitle="ARC guidelines, project management modules, and skill-building materials to support your project.">
      <section className="space-y-8">
        <ResourceSection title="ARC Disaster Preparedness & Community Resources" description="Official American Red Cross materials on disaster readiness, mobilization, and social cohesion." items={arcResources} />
        <ResourceSection title="Project Management & Delegation" description="Learn how to scope projects, delegate through the quest system, and coordinate across teams." items={pmResources} />
        <ResourceSection title="Skill Building & Recognition" description="Leadership development, presentation skills, and ARC recognition pathways." items={skillBuilding} />
      </section>
    </AppShell>
  )
}

function ResourceSection({ title, description, items }: { title: string; description: string; items: { title: string; description: string; icon: React.ComponentType<{ className?: string }>; category: string }[] }) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-[var(--arc-navy)]">{title}</h2>
      <p className="mt-1 text-sm text-slate-500">{description}</p>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {items.map((item) => {
          const Icon = item.icon
          return (
            <Card key={item.title} className="surface-card animate-fade-up transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--arc-red)]">
              <CardHeader className="pb-2">
                <div className="mb-1 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--arc-surface)]"><Icon className="h-4 w-4 text-[var(--arc-red)]" /></div>
                  <span className="font-mono-label text-[10px] uppercase tracking-wider text-slate-400">{item.category}</span>
                </div>
                <CardTitle className="text-base text-[var(--arc-navy)]">{item.title}</CardTitle>
              </CardHeader>
              <CardContent><CardDescription>{item.description}</CardDescription></CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

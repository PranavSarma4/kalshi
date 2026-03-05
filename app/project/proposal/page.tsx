"use client"

import * as React from "react"
import { Send } from "lucide-react"
import { AppShell } from "@/components/app-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function ProposalPage() {
  const [form, setForm] = React.useState({ projectName: "", lead: "", summary: "", resources: "", community: "" })
  const [submitted, setSubmitted] = React.useState(false)

  return (
    <AppShell role="student" title="Proposal Builder" subtitle="Prepare your project proposal and submit to the local ARC chapter for review and support.">
      <Card className="surface-card animate-fade-up mx-auto max-w-3xl">
        <CardHeader>
          <CardTitle className="text-[var(--arc-navy)]">Submit Proposal to ARC</CardTitle>
          <CardDescription>All completed projects are invited to present at regular regional summits with ARC leadership. ARC can use successful projects as replicable models and success stories.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-600">Project Name</label>
            <Input placeholder="e.g. Community Heat & Flood Preparedness Sprint" value={form.projectName} onChange={(e) => setForm((p) => ({ ...p, projectName: e.target.value }))} />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-600">Team Lead</label>
            <Input placeholder="Full name" value={form.lead} onChange={(e) => setForm((p) => ({ ...p, lead: e.target.value }))} />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-600">Community Served</label>
            <Input placeholder="e.g. South Side and Riverbend" value={form.community} onChange={(e) => setForm((p) => ({ ...p, community: e.target.value }))} />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-600">One-Sentence Project Summary</label>
            <Input placeholder="Describe the community resilience gap your project addresses" value={form.summary} onChange={(e) => setForm((p) => ({ ...p, summary: e.target.value }))} />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-600">Key Resources Requested From ARC</label>
            <Input placeholder="e.g. Outreach materials, venue access, expert mentors" value={form.resources} onChange={(e) => setForm((p) => ({ ...p, resources: e.target.value }))} />
          </div>
          <Button className="w-full bg-[var(--arc-red)] text-white hover:bg-[var(--arc-red-dark)]" onClick={() => { if (form.projectName && form.lead && form.summary) setSubmitted(true) }}>
            <Send className="mr-2 h-4 w-4" />Submit Proposal to ARC Chapter
          </Button>
          {submitted && (
            <div className="rounded-md border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">
              <p className="font-semibold">Proposal Submitted Successfully</p>
              <p className="mt-1">Your proposal has been sent to the local ARC chapter for review. You will be invited to present at the next regional summit if approved.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </AppShell>
  )
}

"use client"

import * as React from "react"
import { CheckCircle2, Star } from "lucide-react"
import { AppShell } from "@/components/app-shell"
import { QuestStatusBadge } from "@/components/quest-status-badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useDemo } from "@/lib/demo-context"
import { type Quest } from "@/lib/mockData"

const disasterTypes: Quest["disasterType"][] = ["Flood", "Heat", "Wildfire", "Storm", "Drought"]
const taskTypes: Quest["taskType"][] = ["Survey", "Interview", "Door-to-Door", "Focus Group", "Feedback Collection", "Community Canvass"]
const timeEstimates: Quest["timeEstimate"][] = ["30 min", "1-2 hrs", "2-4 hrs", "4-6 hrs"]
const difficulties: Quest["difficulty"][] = ["easy", "moderate", "hard"]
const pointValues = ["10", "20", "30", "40"] as const

export default function AdminQuestsPage() {
  const { quests, createQuest, approveQuest } = useDemo()
  const [form, setForm] = React.useState({
    title: "",
    description: "",
    teamName: "",
    teamProject: "",
    task: "",
    verificationCount: "5",
    points: "20",
    community: "",
    disasterType: "Heat" as Quest["disasterType"],
    taskType: "Survey" as Quest["taskType"],
    timeEstimate: "1-2 hrs" as Quest["timeEstimate"],
    difficulty: "moderate" as Quest["difficulty"],
    dueDate: "",
    impactTag: "",
    phase: "april" as Quest["phase"],
  })

  const resetForm = () =>
    setForm({
      title: "", description: "", teamName: "", teamProject: "", task: "",
      verificationCount: "5", points: "20", community: "",
      disasterType: "Heat", taskType: "Survey", timeEstimate: "1-2 hrs",
      difficulty: "moderate", dueDate: "", impactTag: "", phase: "april",
    })

  return (
    <AppShell role="arc" title="Quest Management" subtitle="Create community input quests, approve verified submissions, and monitor the quest lifecycle.">
      <section className="grid gap-6 lg:grid-cols-2">
        <Card className="surface-card animate-fade-up">
          <CardHeader>
            <CardTitle className="text-[var(--arc-navy)]">Create Quest</CardTitle>
            <CardDescription>New quests appear in the student Quest Feed immediately. All quests should focus on gathering community input.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input placeholder="Quest Title" value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} />
            <Input placeholder="Team Name (e.g. Team Ember)" value={form.teamName} onChange={(e) => setForm((p) => ({ ...p, teamName: e.target.value }))} />
            <Input placeholder="Team's Project Name" value={form.teamProject} onChange={(e) => setForm((p) => ({ ...p, teamProject: e.target.value }))} />
            <Input placeholder="Why the team needs this data (description)" value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} />
            <Input placeholder="Task: What the quester needs to do" value={form.task} onChange={(e) => setForm((p) => ({ ...p, task: e.target.value }))} />
            <Input placeholder="Community" value={form.community} onChange={(e) => setForm((p) => ({ ...p, community: e.target.value }))} />
            <div className="grid gap-3 md:grid-cols-2">
              <FormSelect value={form.taskType} onChange={(v) => setForm((p) => ({ ...p, taskType: v as Quest["taskType"] }))} options={taskTypes} placeholder="Task Type" />
              <FormSelect value={form.disasterType} onChange={(v) => setForm((p) => ({ ...p, disasterType: v as Quest["disasterType"] }))} options={disasterTypes} placeholder="Disaster Type" />
              <FormSelect value={form.timeEstimate} onChange={(v) => setForm((p) => ({ ...p, timeEstimate: v as Quest["timeEstimate"] }))} options={timeEstimates} placeholder="Time Estimate" />
              <FormSelect value={form.difficulty} onChange={(v) => setForm((p) => ({ ...p, difficulty: v as Quest["difficulty"] }))} options={difficulties} placeholder="Difficulty" />
              <FormSelect value={form.points} onChange={(v) => setForm((p) => ({ ...p, points: v }))} options={[...pointValues]} placeholder="Points" />
              <FormSelect value={form.phase} onChange={(v) => setForm((p) => ({ ...p, phase: v as Quest["phase"] }))} options={["april", "may", "june-july"]} placeholder="Timeline Phase" />
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <Input type="date" value={form.dueDate} onChange={(e) => setForm((p) => ({ ...p, dueDate: e.target.value }))} />
              <Input placeholder="# of contacts to verify (e.g. 5)" type="number" value={form.verificationCount} onChange={(e) => setForm((p) => ({ ...p, verificationCount: e.target.value }))} />
            </div>
            <Input placeholder="Impact Tag" value={form.impactTag} onChange={(e) => setForm((p) => ({ ...p, impactTag: e.target.value }))} />
            <Button
              onClick={() => {
                if (form.title && form.teamName && form.community && form.dueDate) {
                  const count = parseInt(form.verificationCount) || 5
                  createQuest({
                    title: form.title,
                    description: form.description || `${form.teamName} needs community input for ${form.teamProject}.`,
                    teamName: form.teamName,
                    teamProject: form.teamProject,
                    task: form.task || `Survey at least ${count} residents in ${form.community}.`,
                    verificationMethod: `Submit the phone numbers of the ${count} residents you spoke with. Our platform will text each person to confirm participation.`,
                    verificationCount: count,
                    points: parseInt(form.points) || 20,
                    community: form.community,
                    disasterType: form.disasterType,
                    taskType: form.taskType,
                    timeEstimate: form.timeEstimate,
                    difficulty: form.difficulty,
                    location: "In-Person",
                    dueDate: form.dueDate,
                    impactTag: form.impactTag || "Community input",
                    phase: form.phase,
                  })
                  resetForm()
                }
              }}
              className="w-full bg-[var(--arc-red)] text-white hover:bg-[var(--arc-red-dark)]"
            >
              Create Quest
            </Button>
          </CardContent>
        </Card>

        <Card className="surface-card animate-fade-up">
          <CardHeader>
            <CardTitle className="text-[var(--arc-navy)]">Active Quests</CardTitle>
            <CardDescription>Approve quests once verification texts are confirmed by residents.</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Team</TableHead>
                  <TableHead>Points</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {quests.map((quest) => (
                  <TableRow key={quest.id}>
                    <TableCell className="font-mono-label text-xs">{quest.id}</TableCell>
                    <TableCell className="max-w-[160px] truncate">{quest.title}</TableCell>
                    <TableCell className="text-xs text-slate-600">{quest.teamName}</TableCell>
                    <TableCell>
                      <span className="flex items-center gap-1 text-sm font-semibold text-amber-600">
                        <Star className="h-3 w-3" /> {quest.points}
                      </span>
                    </TableCell>
                    <TableCell><QuestStatusBadge status={quest.status} /></TableCell>
                    <TableCell>
                      {quest.status === "submitted" ? (
                        <Button
                          size="sm"
                          onClick={() => approveQuest(quest.id)}
                          className="h-7 bg-emerald-600 text-xs text-white hover:bg-emerald-700"
                        >
                          <CheckCircle2 className="mr-1 h-3.5 w-3.5" />
                          Approve
                        </Button>
                      ) : (
                        <span className="text-xs text-slate-400">—</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>
    </AppShell>
  )
}

function FormSelect({ value, onChange, options, placeholder }: { value: string; onChange: (v: string) => void; options: readonly string[]; placeholder: string }) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger><SelectValue placeholder={placeholder} /></SelectTrigger>
      <SelectContent>
        {options.map((o) => <SelectItem key={o} value={o}>{o.charAt(0).toUpperCase() + o.slice(1)}</SelectItem>)}
      </SelectContent>
    </Select>
  )
}

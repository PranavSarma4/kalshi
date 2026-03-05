"use client"

import * as React from "react"
import Link from "next/link"
import { Filter, LayoutGrid, List, Search, Star, Users } from "lucide-react"
import { AppShell } from "@/components/app-shell"
import { QuestStatusBadge } from "@/components/quest-status-badge"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useDemo } from "@/lib/demo-context"
import { type Quest } from "@/lib/mockData"
import { getUniqueValues } from "@/lib/quest-utils"

type FilterState = {
  query: string
  taskType: string
  timeEstimate: string
  disasterType: string
}

const defaultFilter: FilterState = {
  query: "",
  taskType: "all",
  timeEstimate: "all",
  disasterType: "all",
}

export default function QuestFeedPage() {
  const { quests } = useDemo()
  const [filters, setFilters] = React.useState<FilterState>(defaultFilter)
  const [view, setView] = React.useState<"table" | "card">("card")

  const filtered = React.useMemo(() => {
    return quests.filter((quest) => {
      const matchQuery =
        filters.query.length === 0 ||
        quest.title.toLowerCase().includes(filters.query.toLowerCase()) ||
        quest.community.toLowerCase().includes(filters.query.toLowerCase()) ||
        quest.teamName.toLowerCase().includes(filters.query.toLowerCase())
      const matchTaskType = filters.taskType === "all" || quest.taskType === filters.taskType
      const matchEstimate = filters.timeEstimate === "all" || quest.timeEstimate === filters.timeEstimate
      const matchDisaster = filters.disasterType === "all" || quest.disasterType === filters.disasterType
      return matchQuery && matchTaskType && matchEstimate && matchDisaster
    })
  }, [filters, quests])

  return (
    <AppShell
      role="student"
      title="Quest Feed"
      subtitle="Browse community input quests posted by Impact Teams. Complete quests to earn points and help teams build better proposals."
    >
      <section className="space-y-6">
        <Card className="surface-card animate-fade-up">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-[var(--arc-navy)]">
              <Filter className="h-4 w-4 text-[var(--arc-red)]" />
              Filter Quests
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
              <div className="relative lg:col-span-1">
                <Search className="pointer-events-none absolute top-2.5 left-2.5 h-4 w-4 text-slate-400" />
                <Input
                  value={filters.query}
                  onChange={(event) => setFilters((prev) => ({ ...prev, query: event.target.value }))}
                  className="pl-8"
                  placeholder="Search by quest, team, or community"
                />
              </div>
              <FilterSelect
                label="Task Type"
                value={filters.taskType}
                onChange={(value) => setFilters((prev) => ({ ...prev, taskType: value }))}
                options={["all", ...getUniqueValues(quests, "taskType")]}
              />
              <FilterSelect
                label="Time Estimate"
                value={filters.timeEstimate}
                onChange={(value) => setFilters((prev) => ({ ...prev, timeEstimate: value }))}
                options={["all", ...getUniqueValues(quests, "timeEstimate")]}
              />
              <FilterSelect
                label="Disaster Type"
                value={filters.disasterType}
                onChange={(value) => setFilters((prev) => ({ ...prev, disasterType: value }))}
                options={["all", ...getUniqueValues(quests, "disasterType")]}
              />
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-600">
                Showing <span className="font-semibold text-[var(--arc-navy)]">{filtered.length}</span> Quests
              </p>
              <Tabs value={view} onValueChange={(value) => setView(value as "table" | "card")}>
                <TabsList>
                  <TabsTrigger value="table">
                    <List className="mr-1 h-4 w-4" />
                    Table
                  </TabsTrigger>
                  <TabsTrigger value="card">
                    <LayoutGrid className="mr-1 h-4 w-4" />
                    Cards
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardContent>
        </Card>

        {view === "table" ? <QuestTable quests={filtered} /> : <QuestCards quests={filtered} />}
      </section>
    </AppShell>
  )
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  options: string[]
}) {
  return (
    <div>
      <p className="mb-1 text-xs font-medium text-slate-500">{label}</p>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option === "all" ? "All" : option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

function QuestTable({ quests }: { quests: Quest[] }) {
  return (
    <Card className="surface-card animate-fade-up">
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Quest</TableHead>
              <TableHead>Team</TableHead>
              <TableHead>Community</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Points</TableHead>
              <TableHead>Estimate</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {quests.map((quest) => (
              <TableRow key={quest.id}>
                <TableCell className="font-medium text-slate-900">
                  <Link href={`/quest/${quest.id}`} className="hover:underline">
                    {quest.title}
                  </Link>
                </TableCell>
                <TableCell className="text-sm text-slate-600">{quest.teamName}</TableCell>
                <TableCell>{quest.community}</TableCell>
                <TableCell>{quest.taskType}</TableCell>
                <TableCell>
                  <span className="flex items-center gap-1 font-semibold text-amber-600">
                    <Star className="h-3 w-3" /> {quest.points}
                  </span>
                </TableCell>
                <TableCell>{quest.timeEstimate}</TableCell>
                <TableCell>
                  <QuestStatusBadge status={quest.status} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

function QuestCards({ quests }: { quests: Quest[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {quests.map((quest) => (
        <Card key={quest.id} className="surface-card animate-fade-up transition-all duration-200 hover:-translate-y-0.5">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <Users className="h-3 w-3" />
                {quest.teamName}
              </div>
              <span className="flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-sm font-bold text-amber-600">
                <Star className="h-3.5 w-3.5" /> {quest.points} pts
              </span>
            </div>
            <CardTitle className="text-lg text-slate-900">{quest.title}</CardTitle>
            <CardDescription>{quest.teamProject}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p className="line-clamp-2 leading-relaxed text-slate-600">{quest.description}</p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">{quest.taskType}</Badge>
              <Badge variant="outline">{quest.disasterType}</Badge>
              <Badge variant="outline">{quest.timeEstimate}</Badge>
              <Badge variant="outline" className="border-[var(--arc-red)] text-[var(--arc-red)]">
                {quest.phase === "april" ? "April" : quest.phase === "may" ? "May" : "June–July"}
              </Badge>
            </div>
            <div className="flex items-center justify-between pt-1">
              <QuestStatusBadge status={quest.status} />
              <Link href={`/quest/${quest.id}`} className="text-[var(--arc-red-dark)] underline underline-offset-4">
                View Quest
              </Link>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

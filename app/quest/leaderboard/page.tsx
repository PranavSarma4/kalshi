"use client"

import { Award } from "lucide-react"
import { AppShell } from "@/components/app-shell"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useDemo } from "@/lib/demo-context"

const volunteers = [
  { name: "Avery Kim", quests: 5, school: "Lincoln High (DECA)" },
  { name: "Jordan Miles", quests: 4, school: "Westside Academy (FBLA)" },
  { name: "Priya Nair", quests: 4, school: "Harbor Prep (Volunteer Club)" },
  { name: "Luis Ortega", quests: 3, school: "Riverbend HS (CS Requirement)" },
  { name: "Noa Bennett", quests: 2, school: "Pine Ridge Community College" },
]

const tierConfig: Record<string, string> = {
  "ARC Certified Gold": "border-amber-400 bg-amber-50 text-amber-800",
  "ARC Certified Silver": "border-slate-300 bg-slate-50 text-slate-700",
  "ARC Certified Bronze": "border-orange-300 bg-orange-50 text-orange-800",
}

function getTier(points: number) {
  if (points >= 140) return "ARC Certified Gold"
  if (points >= 90) return "ARC Certified Silver"
  return "ARC Certified Bronze"
}

export default function LeaderboardPage() {
  const { pointsByQuest } = useDemo()
  const basePoints = Object.values(pointsByQuest).reduce((sum, value) => sum + value, 0)
  const ranked = volunteers
    .map((volunteer, index) => ({
      ...volunteer,
      points: basePoints + volunteer.quests * (20 - index),
    }))
    .sort((a, b) => b.points - a.points)

  return (
    <AppShell
      role="student"
      title="Volunteer Leaderboard"
      subtitle="Ranked participation with ARC-Certified Service Award tiers. Prove your contributions for college apps, resumes, and community service requirements."
    >
      <Card className="surface-card animate-fade-up">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-[var(--arc-navy)]">
            <Award className="h-5 w-5 text-[var(--arc-red)]" />
            Ranked Contributors
          </CardTitle>
          <CardDescription>
            Awards are recognized by the American Red Cross and can be cited on applications and resumes.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Rank</TableHead>
                <TableHead>Volunteer</TableHead>
                <TableHead>School / Org</TableHead>
                <TableHead>Quests Completed</TableHead>
                <TableHead>Total Points</TableHead>
                <TableHead>ARC Tier</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ranked.map((row, index) => {
                const tier = getTier(row.points)
                return (
                  <TableRow key={row.name}>
                    <TableCell className="font-medium text-slate-900">#{index + 1}</TableCell>
                    <TableCell className="font-medium">{row.name}</TableCell>
                    <TableCell className="text-slate-600">{row.school}</TableCell>
                    <TableCell>{row.quests}</TableCell>
                    <TableCell className="font-semibold">{row.points}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={tierConfig[tier]}>
                        {tier}
                      </Badge>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </AppShell>
  )
}

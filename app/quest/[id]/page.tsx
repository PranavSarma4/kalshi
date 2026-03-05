"use client"

import * as React from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { CheckCircle2, Clock, FileUp, Hand, MessageSquare, Phone, ShieldAlert, ShieldCheck, Star, Users } from "lucide-react"
import { AppShell } from "@/components/app-shell"
import { QuestStatusBadge } from "@/components/quest-status-badge"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useDemo } from "@/lib/demo-context"

export default function QuestDetailPage() {
  const params = useParams<{ id: string }>()
  const { quests, acceptQuest, submitQuestProof, pointsByQuest } = useDemo()
  const quest = quests.find((item) => item.id === params.id)
  const [phoneNumbers, setPhoneNumbers] = React.useState<string[]>([""])

  if (!quest) {
    return (
      <AppShell role="student" title="Quest Not Found" subtitle="This quest may have been removed or renamed.">
        <Button asChild variant="outline">
          <Link href="/quest">Back to Quest Feed</Link>
        </Button>
      </AppShell>
    )
  }

  const filledNumbers = phoneNumbers.filter((n) => n.trim().length >= 7)

  return (
    <AppShell role="student" title={quest.title} subtitle={`${quest.community} — ${quest.taskType}`}>
      <section className="grid gap-6 lg:grid-cols-3">
        {/* Main content */}
        <div className="space-y-6 lg:col-span-2">
          {/* Team & Project */}
          <Card className="surface-card animate-fade-up">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--arc-surface)]">
                  <Users className="h-4 w-4 text-[var(--arc-red)]" />
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500">Posted by</p>
                  <p className="font-semibold text-[var(--arc-navy)]">{quest.teamName}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border border-[var(--arc-border)] bg-[var(--arc-surface)] p-4">
                <p className="text-xs font-medium uppercase tracking-wider text-slate-400">Their Project</p>
                <p className="mt-1 font-medium text-slate-900">{quest.teamProject}</p>
                <p className="mt-2 leading-relaxed text-sm text-slate-600">{quest.description}</p>
              </div>
            </CardContent>
          </Card>

          {/* The Task */}
          <Card className="surface-card animate-fade-up">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[var(--arc-navy)]">
                <MessageSquare className="h-4 w-4 text-[var(--arc-red)]" />
                Your Task
              </CardTitle>
              <CardDescription>What you need to do to complete this quest</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="leading-relaxed text-sm text-slate-700">{quest.task}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Badge variant="outline">{quest.taskType}</Badge>
                <Badge variant="outline">{quest.disasterType}</Badge>
                <Badge variant="outline">{quest.timeEstimate}</Badge>
                <Badge variant="outline" className="capitalize">{quest.difficulty}</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Verification */}
          <Card className="surface-card animate-fade-up border-amber-200 bg-amber-50/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[var(--arc-navy)]">
                <ShieldCheck className="h-4 w-4 text-amber-600" />
                How Verification Works
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="leading-relaxed text-sm text-slate-700">{quest.verificationMethod}</p>
              <div className="space-y-2 rounded-md border border-amber-200 bg-amber-50 p-4">
                <div className="flex items-start gap-2">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                  <div className="text-sm">
                    <p className="font-medium text-amber-900">Phone number verification</p>
                    <p className="text-amber-800">
                      You&apos;ll submit {quest.verificationCount} phone numbers from residents you spoke with. A few hours later, our platform automatically texts each person: <span className="font-medium">&ldquo;Did a student volunteer speak with you about community preparedness today? Reply YES to confirm.&rdquo;</span> Only verified contacts count.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Points & Status */}
          <Card className="surface-card animate-fade-up">
            <CardHeader className="pb-3">
              <CardTitle className="text-slate-900">Quest Reward</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border border-[var(--arc-border)] bg-[var(--arc-surface)] p-4">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-amber-500" />
                  <span className="text-sm font-medium text-slate-700">Points</span>
                </div>
                <span className="text-2xl font-bold text-[var(--arc-navy)]">{quest.points}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Status</span>
                <QuestStatusBadge status={quest.status} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Due</span>
                <span className="text-sm font-medium text-slate-900">{quest.dueDate}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Phase</span>
                <Badge variant="outline" className="border-[var(--arc-red)] text-[var(--arc-red)]">
                  {quest.phase === "april" ? "April" : quest.phase === "may" ? "May" : "June–July"}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card className="surface-card animate-fade-up">
            <CardHeader className="pb-3">
              <CardTitle className="text-slate-900">Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                onClick={() => acceptQuest(quest.id)}
                disabled={quest.status !== "open"}
                className="w-full bg-[var(--arc-red)] text-white hover:bg-[var(--arc-red-dark)]"
              >
                <Hand className="mr-2 h-4 w-4" />
                Accept Quest
              </Button>

              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    disabled={quest.status !== "claimed"}
                    className="w-full border-[var(--arc-red)] text-[var(--arc-red-dark)] hover:bg-[var(--arc-surface)]"
                  >
                    <FileUp className="mr-2 h-4 w-4" />
                    Submit Verification
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Submit Phone Numbers for Verification</DialogTitle>
                    <DialogDescription>
                      Enter the phone numbers of the {quest.verificationCount} residents you spoke with. We&apos;ll text them to confirm participation.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-2 py-2">
                    {phoneNumbers.map((num, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <span className="w-5 text-right text-xs font-medium text-slate-400">{i + 1}.</span>
                        <Input
                          placeholder="(555) 123-4567"
                          value={num}
                          onChange={(e) => {
                            const updated = [...phoneNumbers]
                            updated[i] = e.target.value
                            setPhoneNumbers(updated)
                          }}
                        />
                      </div>
                    ))}
                    {phoneNumbers.length < quest.verificationCount && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setPhoneNumbers([...phoneNumbers, ""])}
                        className="ml-7 text-xs text-[var(--arc-red)]"
                      >
                        + Add another number
                      </Button>
                    )}
                    <p className="ml-7 text-xs text-slate-500">
                      {filledNumbers.length} of {quest.verificationCount} numbers entered
                    </p>
                  </div>
                  <DialogFooter>
                    <Button
                      onClick={() => {
                        if (filledNumbers.length >= quest.verificationCount) {
                          submitQuestProof(quest.id, quest.points as 10 | 20 | 40)
                          setPhoneNumbers([""])
                        }
                      }}
                      disabled={filledNumbers.length < quest.verificationCount}
                      className="bg-[var(--arc-red)] text-white hover:bg-[var(--arc-red-dark)]"
                    >
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      Submit {filledNumbers.length} Numbers
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              {quest.status === "submitted" && (
                <div className="flex items-center gap-2 rounded-md border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
                  <Clock className="h-4 w-4 shrink-0" />
                  Verification texts sent. Awaiting resident confirmations.
                </div>
              )}

              {quest.status === "approved" && (
                <div className="rounded-md border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-900">
                  <CheckCircle2 className="mr-1 inline h-4 w-4" />
                  Verified! <span className="font-semibold">{quest.points} points</span> added to your total.
                </div>
              )}

              {quest.status === "open" && (
                <div className="rounded-md border border-[var(--arc-border)] bg-[var(--arc-surface)] p-3 text-sm text-slate-600">
                  <ShieldAlert className="mr-1 inline h-4 w-4" />
                  Accept this quest to get started.
                </div>
              )}

              {quest.status === "claimed" && !pointsByQuest[quest.id] && (
                <div className="rounded-md border border-[var(--arc-border)] bg-[var(--arc-surface)] p-3 text-sm text-slate-600">
                  Complete the task, then submit {quest.verificationCount} phone numbers above.
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </AppShell>
  )
}

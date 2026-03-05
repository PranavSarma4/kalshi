"use client"

import * as React from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useDemo } from "@/lib/demo-context"

export default function AdminLoginPage() {
  const router = useRouter()
  const { signIn } = useDemo()
  const [email, setEmail] = React.useState("")
  const [role, setRole] = React.useState("")

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--arc-background)] px-6">
      <Card className="surface-card animate-fade-up w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-3 flex items-center gap-2">
            <Image src="/american-red-cross-mark.svg" alt="ARC" width={28} height={28} className="rounded" />
            <span className="font-mono-label text-[10px] uppercase tracking-[0.14em] text-[var(--arc-red)]">
              American Red Cross
            </span>
          </div>
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--arc-surface)]">
            <ShieldCheck className="h-6 w-6 text-[var(--arc-red)]" />
          </div>
          <CardTitle className="text-[var(--arc-navy)]">ARC Program Administration</CardTitle>
          <CardDescription>
            Manage project teams, create quests, review proposals, and track mobilization and cohesion metrics.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-600">Work Email</label>
            <Input type="email" placeholder="name@redcross.org" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-600">Role</label>
            <Input placeholder="e.g. Chapter Coordinator, Partner Org Lead" value={role} onChange={(e) => setRole(e.target.value)} />
          </div>
          <Button className="w-full bg-[var(--arc-red)] text-white hover:bg-[var(--arc-red-dark)]" onClick={() => { signIn("arc"); router.push("/admin") }}>
            Sign In to Administration
          </Button>
          <p className="text-center text-xs text-slate-500">
            For ARC chapter staff, partner organization coordinators, and project team leads.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

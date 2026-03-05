"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { GraduationCap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useDemo } from "@/lib/demo-context"

export default function StudentLoginPage() {
  const router = useRouter()
  const { signIn } = useDemo()
  const [email, setEmail] = React.useState("")
  const [name, setName] = React.useState("")

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
            <GraduationCap className="h-6 w-6 text-[var(--arc-red)]" />
          </div>
          <CardTitle className="text-[var(--arc-navy)]">Student Login</CardTitle>
          <CardDescription>
            Access the Quest System to browse volunteer tasks, earn points, and build your service record.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-600">Full Name</label>
            <Input
              placeholder="e.g. Jordan Miles"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-600">School Email</label>
            <Input
              type="email"
              placeholder="jordan@university.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <Button
            className="w-full bg-[var(--arc-red)] text-white hover:bg-[var(--arc-red-dark)]"
            onClick={() => { signIn("student"); router.push("/quest") }}
          >
            Sign In to Quest Portal
          </Button>
          <p className="text-center text-xs text-slate-500">
            Recruited through career clubs, DECA, FBLA, volunteer orgs, or schools with community service requirements.
          </p>
          <div className="text-center">
            <Link href="/" className="text-xs text-[var(--arc-red-dark)] underline underline-offset-4">
              Back to Home
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BookOpen,
  ClipboardList,
  FolderKanban,
  Gauge,
  Home,
  LayoutDashboard,
  ListTodo,
  LogOut,
  Send,
  ShieldCheck,
  Trophy,
  Wrench,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useDemo } from "@/lib/demo-context"

type NavLink = { href: string; label: string; icon: React.ComponentType<{ className?: string }> }

const studentNav: NavLink[] = [
  { href: "/", label: "Home", icon: Home },
  { href: "/quest", label: "Quests", icon: ClipboardList },
  { href: "/quest/impact", label: "Impact", icon: Gauge },
  { href: "/quest/leaderboard", label: "Leaderboard", icon: Trophy },
  { href: "/project", label: "My Project", icon: FolderKanban },
  { href: "/project/toolkit", label: "Toolkit", icon: Wrench },
  { href: "/project/resources", label: "Resources", icon: BookOpen },
  { href: "/project/proposal", label: "Proposal", icon: Send },
]

const arcNav: NavLink[] = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/quests", label: "Manage Quests", icon: ListTodo },
]

type AppShellProps = {
  role: "student" | "arc"
  title: string
  subtitle?: string
  children: React.ReactNode
}

export function AppShell({ role, title, subtitle, children }: AppShellProps) {
  const pathname = usePathname()
  const { authRole, signOut } = useDemo()
  const navLinks = role === "student" ? studentNav : arcNav
  const isSignedIn = authRole === role

  return (
    <div className="flex min-h-screen flex-col bg-[var(--arc-background)]">
      <header className="sticky top-0 z-40 border-b border-[var(--arc-border)] bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-6 py-3">
          <Link
            href={role === "student" ? "/" : "/admin"}
            className="flex items-center gap-3"
          >
            <Image
              src="/american-red-cross-mark.svg"
              alt="American Red Cross"
              width={36}
              height={36}
              className="rounded-md"
            />
            <div className="hidden sm:block">
              <p className="font-mono-label text-[10px] font-medium uppercase tracking-[0.16em] text-[var(--arc-red)]">
                American Red Cross
              </p>
              <p className="text-xs text-slate-500">
                {role === "student" ? "Student Quest Portal" : "Program Administration"}
              </p>
            </div>
          </Link>

          {isSignedIn ? (
            <nav className="flex flex-wrap items-center gap-1.5">
              {navLinks.map((link) => {
                const Icon = link.icon
                const hasExactMatch = navLinks.some((l) => l.href === pathname)
                const isActive = hasExactMatch
                  ? pathname === link.href
                  : link.href === "/"
                    ? false
                    : pathname.startsWith(`${link.href}/`)
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-xs font-medium transition-all duration-200",
                      isActive
                        ? "border-[var(--arc-red)] bg-[var(--arc-red)] text-white shadow-sm"
                        : "border-transparent bg-transparent text-[var(--arc-navy)] hover:border-[var(--arc-border)] hover:bg-slate-50",
                    )}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    <span className="hidden md:inline">{link.label}</span>
                  </Link>
                )
              })}

              <div className="ml-1 h-5 w-px bg-[var(--arc-border)]" />

              {role === "arc" && (
                <Link
                  href="/demo"
                  className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs text-slate-500 transition-colors hover:text-[var(--arc-navy)]"
                >
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span className="hidden md:inline">Demo</span>
                </Link>
              )}

              <Link
                href={role === "student" ? "/" : "/admin/login"}
                onClick={signOut}
                className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs text-slate-500 transition-colors hover:text-[var(--arc-red)]"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span className="hidden md:inline">Log Out</span>
              </Link>
            </nav>
          ) : (
            <Link
              href={role === "student" ? "/login/student" : "/admin/login"}
              className="inline-flex items-center gap-1.5 rounded-md border border-[var(--arc-border)] px-3 py-1.5 text-xs font-medium text-[var(--arc-navy)] transition-colors hover:bg-slate-50"
            >
              Sign In
            </Link>
          )}
        </div>
      </header>

      <div className="mx-auto w-full max-w-7xl px-6 py-6">
        <div className="animate-fade-up mb-6">
          <h1 className="text-2xl font-semibold text-[var(--arc-navy)]">{title}</h1>
          {subtitle ? <p className="mt-1 text-sm text-slate-500">{subtitle}</p> : null}
        </div>
        <main>{children}</main>
      </div>
    </div>
  )
}

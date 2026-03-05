import { Badge } from "@/components/ui/badge"
import { type QuestStatus } from "@/lib/mockData"

const statusStyles: Record<QuestStatus, string> = {
  open: "bg-slate-100 text-slate-800",
  claimed: "bg-[var(--arc-surface)] text-[var(--arc-red-dark)]",
  submitted: "bg-amber-100 text-amber-900",
  approved: "bg-emerald-100 text-emerald-900",
}

export function QuestStatusBadge({ status }: { status: QuestStatus }) {
  return (
    <Badge variant="secondary" className={`capitalize ${statusStyles[status]}`}>
      {status}
    </Badge>
  )
}

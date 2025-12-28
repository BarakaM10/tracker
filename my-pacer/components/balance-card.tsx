import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, DollarSign } from "lucide-react"
import { formatCurrency } from "@/lib/finance"

interface BalanceCardProps {
  title: string
  amount: number
  type: "income" | "expense" | "balance"
  icon?: React.ReactNode
}

export function BalanceCard({ title, amount, type, icon }: BalanceCardProps) {
  const getColorClass = () => {
    if (type === "income") return "text-success"
    if (type === "expense") return "text-destructive"
    return amount >= 0 ? "text-success" : "text-destructive"
  }

  const getIcon = () => {
    if (icon) return icon
    if (type === "income") return <TrendingUp className="h-4 w-4" />
    if (type === "expense") return <TrendingDown className="h-4 w-4" />
    return <DollarSign className="h-4 w-4" />
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className="text-muted-foreground">{getIcon()}</div>
      </CardHeader>
      <CardContent>
        <div className={`text-2xl font-bold ${getColorClass()}`}>{formatCurrency(amount)}</div>
      </CardContent>
    </Card>
  )
}

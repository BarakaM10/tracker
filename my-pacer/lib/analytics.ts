import type { Transaction, Category } from "../types"

export interface CategoryBreakdown {
  category: string
  amount: number
  percentage: number
  color: string
}

export interface MonthlyData {
  month: string
  income: number
  expenses: number
}

export function getCategoryBreakdown(
  transactions: Transaction[],
  categories: Category[],
  type: "income" | "expense",
): CategoryBreakdown[] {
  const filtered = transactions.filter((t) => t.type === type)
  const total = filtered.reduce((sum, t) => sum + t.amount, 0)

  const categoryTotals = new Map<string, number>()

  filtered.forEach((t) => {
    const current = categoryTotals.get(t.category) || 0
    categoryTotals.set(t.category, current + t.amount)
  })

  const breakdown: CategoryBreakdown[] = []
  categoryTotals.forEach((amount, category) => {
    const cat = categories.find((c) => c.name === category)
    breakdown.push({
      category,
      amount,
      percentage: total > 0 ? (amount / total) * 100 : 0,
      color: cat?.color || "#6b7280",
    })
  })

  return breakdown.sort((a, b) => b.amount - a.amount)
}

export function getMonthlyData(transactions: Transaction[]): MonthlyData[] {
  const monthlyMap = new Map<string, { income: number; expenses: number }>()

  transactions.forEach((t) => {
    const date = new Date(t.date)
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`

    const current = monthlyMap.get(monthKey) || { income: 0, expenses: 0 }

    if (t.type === "income") {
      current.income += t.amount
    } else if (t.type === "expense") {
      current.expenses += t.amount
    }

    monthlyMap.set(monthKey, current)
  })

  const data: MonthlyData[] = []
  monthlyMap.forEach((value, key) => {
    const [year, month] = key.split("-")
    const date = new Date(Number.parseInt(year), Number.parseInt(month) - 1)
    data.push({
      month: date.toLocaleDateString("en-US", { month: "short", year: "numeric" }),
      income: value.income,
      expenses: value.expenses,
    })
  })

  return data.sort((a, b) => {
    const dateA = new Date(a.month)
    const dateB = new Date(b.month)
    return dateA.getTime() - dateB.getTime()
  })
}

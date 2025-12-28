import type { Transaction, RecurringTransaction, FinanceContext } from "../types"

export function calculateBalance(
  transactions: Transaction[],
  context: FinanceContext,
): { income: number; expenses: number; balance: number } {
  const filtered = transactions.filter((t) => t.context === context)

  const income = filtered.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0)

  const expenses = filtered.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0)

  return {
    income,
    expenses,
    balance: income - expenses,
  }
}

export function formatCurrency(amount: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount)
}

export function formatDate(date: string, format = "MM/DD/YYYY"): string {
  const d = new Date(date)
  const month = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")
  const year = d.getFullYear()

  if (format === "DD/MM/YYYY") {
    return `${day}/${month}/${year}`
  }
  return `${month}/${day}/${year}`
}

export function shouldProcessRecurring(recurring: RecurringTransaction): boolean {
  if (!recurring.lastProcessed) return true

  const lastDate = new Date(recurring.lastProcessed)
  const today = new Date()

  switch (recurring.frequency) {
    case "daily":
      return lastDate.getDate() !== today.getDate()
    case "weekly":
      const daysDiff = Math.floor((today.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24))
      return daysDiff >= 7
    case "monthly":
      return lastDate.getMonth() !== today.getMonth() || lastDate.getFullYear() !== today.getFullYear()
    case "yearly":
      return lastDate.getFullYear() !== today.getFullYear()
    default:
      return false
  }
}

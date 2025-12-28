export type TransactionType = "income" | "expense" | "transfer"
export type RecurrenceFrequency = "daily" | "weekly" | "monthly" | "yearly"
export type FinanceContext = "personal" | "business"

export interface Category {
  id: string
  name: string
  color: string
  context: FinanceContext
  type: "income" | "expense"
}

export interface Transaction {
  id: string
  date: string
  type: TransactionType
  category: string
  amount: number
  description: string
  context: FinanceContext
  recurring?: string
}

export interface RecurringTransaction {
  id: string
  name: string
  type: TransactionType
  category: string
  amount: number
  frequency: RecurrenceFrequency
  startDate: string
  endDate?: string
  context: FinanceContext
  lastProcessed?: string
}

export interface SavingsGoal {
  id: string
  name: string
  targetAmount: number
  currentAmount: number
  deadline: string
  color: string
}

export interface Settings {
  currency: string
  dateFormat: string
  theme: "light" | "dark"
  notifications: boolean
}

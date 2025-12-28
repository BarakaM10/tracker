import type { Transaction, RecurringTransaction, Category, SavingsGoal, Settings } from "./types"

const STORAGE_KEYS = {
  TRANSACTIONS: "finance_transactions",
  RECURRING: "finance_recurring",
  CATEGORIES: "finance_categories",
  GOALS: "finance_goals",
  SETTINGS: "finance_settings",
}

// Default categories
const DEFAULT_CATEGORIES: Category[] = [
  { id: "1", name: "Salary", color: "#10b981", context: "personal", type: "income" },
  { id: "2", name: "Freelance", color: "#3b82f6", context: "personal", type: "income" },
  { id: "3", name: "Food & Dining", color: "#ef4444", context: "personal", type: "expense" },
  { id: "4", name: "Transportation", color: "#f59e0b", context: "personal", type: "expense" },
  { id: "5", name: "Housing", color: "#8b5cf6", context: "personal", type: "expense" },
  { id: "6", name: "Entertainment", color: "#ec4899", context: "personal", type: "expense" },
  { id: "7", name: "Business Revenue", color: "#10b981", context: "business", type: "income" },
  { id: "8", name: "Business Expenses", color: "#ef4444", context: "business", type: "expense" },
  { id: "9", name: "Marketing", color: "#f59e0b", context: "business", type: "expense" },
  { id: "10", name: "Operations", color: "#3b82f6", context: "business", type: "expense" },
]

const DEFAULT_SETTINGS: Settings = {
  currency: "USD",
  dateFormat: "MM/DD/YYYY",
  theme: "light",
  notifications: true,
}

export const storage = {
  getTransactions: (): Transaction[] => {
    if (typeof window === "undefined") return []
    const data = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS)
    return data ? JSON.parse(data) : []
  },

  saveTransactions: (transactions: Transaction[]) => {
    if (typeof window === "undefined") return
    localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions))
  },

  getRecurringTransactions: (): RecurringTransaction[] => {
    if (typeof window === "undefined") return []
    const data = localStorage.getItem(STORAGE_KEYS.RECURRING)
    return data ? JSON.parse(data) : []
  },

  saveRecurringTransactions: (recurring: RecurringTransaction[]) => {
    if (typeof window === "undefined") return
    localStorage.setItem(STORAGE_KEYS.RECURRING, JSON.stringify(recurring))
  },

  getCategories: (): Category[] => {
    if (typeof window === "undefined") return DEFAULT_CATEGORIES
    const data = localStorage.getItem(STORAGE_KEYS.CATEGORIES)
    return data ? JSON.parse(data) : DEFAULT_CATEGORIES
  },

  saveCategories: (categories: Category[]) => {
    if (typeof window === "undefined") return
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories))
  },

  getGoals: (): SavingsGoal[] => {
    if (typeof window === "undefined") return []
    const data = localStorage.getItem(STORAGE_KEYS.GOALS)
    return data ? JSON.parse(data) : []
  },

  saveGoals: (goals: SavingsGoal[]) => {
    if (typeof window === "undefined") return
    localStorage.setItem(STORAGE_KEYS.GOALS, JSON.stringify(goals))
  },

  getSettings: (): Settings => {
    if (typeof window === "undefined") return DEFAULT_SETTINGS
    const data = localStorage.getItem(STORAGE_KEYS.SETTINGS)
    return data ? JSON.parse(data) : DEFAULT_SETTINGS
  },

  saveSettings: (settings: Settings) => {
    if (typeof window === "undefined") return
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings))
  },
}

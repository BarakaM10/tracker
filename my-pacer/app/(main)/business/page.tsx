"use client"

import { useState, useEffect } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { TransactionForm } from "@/components/transaction-form"
import { TransactionList } from "@/components/transaction-list"
import { BalanceCard } from "@/components/balance-card"
import { storage } from "@/lib/storage"
import { calculateBalance } from "@/lib/finance"
import type { Transaction } from "@/lib/types"

export default function BusinessFinancePage() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [categories, setCategories] = useState(storage.getCategories())
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    setTransactions(storage.getTransactions())
  }, [])

  const handleAddTransaction = (newTransaction: Omit<Transaction, "id">) => {
    const transaction: Transaction = {
      ...newTransaction,
      id: crypto.randomUUID(),
    }
    const updated = [...transactions, transaction]
    setTransactions(updated)
    storage.saveTransactions(updated)
    setIsDialogOpen(false)
  }

  const handleDeleteTransaction = (id: string) => {
    const updated = transactions.filter((t) => t.id !== id)
    setTransactions(updated)
    storage.saveTransactions(updated)
  }

  const businessTransactions = transactions.filter((t) => t.context === "business")
  const { income, expenses, balance } = calculateBalance(transactions, "business")

  return (
    <div className="flex flex-col h-full">
      <div className="border-b border-border bg-card">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Business Finance</h1>
              <p className="text-muted-foreground mt-1">Track your business revenue and expenses</p>
            </div>
            <Button onClick={() => setIsDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Transaction
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <BalanceCard title="Total Revenue" amount={income} type="income" />
            <BalanceCard title="Total Expenses" amount={expenses} type="expense" />
            <BalanceCard title="Net Profit" amount={balance} type="balance" />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Your business transactions sorted by date</CardDescription>
            </CardHeader>
            <CardContent>
              <TransactionList
                transactions={businessTransactions.sort(
                  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
                )}
                categories={categories}
                onDelete={handleDeleteTransaction}
              />
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Business Transaction</DialogTitle>
          </DialogHeader>
          <TransactionForm
            categories={categories}
            context="business"
            onSubmit={handleAddTransaction}
            onCancel={() => setIsDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}

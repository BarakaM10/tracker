"use client"

import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import type { Transaction, Category } from "@/lib/types"
import { formatCurrency, formatDate } from "@/lib/finance"

interface TransactionListProps {
  transactions: Transaction[]
  categories: Category[]
  onDelete: (id: string) => void
}

export function TransactionList({ transactions, categories, onDelete }: TransactionListProps) {
  const getCategoryColor = (categoryName: string) => {
    return categories.find((c) => c.name === categoryName)?.color || "#6b7280"
  }

  if (transactions.length === 0) {
    return (
      <Card className="p-8 text-center">
        <p className="text-muted-foreground">No transactions yet. Add your first transaction to get started.</p>
      </Card>
    )
  }

  return (
    <div className="space-y-2">
      {transactions.map((transaction) => (
        <Card key={transaction.id} className="p-4 hover:bg-muted/50 transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 flex-1">
              <div
                className="h-10 w-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: getCategoryColor(transaction.category) + "20" }}
              >
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: getCategoryColor(transaction.category) }}
                />
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium">{transaction.category}</h4>
                  <span className="text-xs text-muted-foreground">{formatDate(transaction.date)}</span>
                </div>
                {transaction.description && (
                  <p className="text-sm text-muted-foreground mt-1">{transaction.description}</p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span
                className={`text-lg font-semibold ${transaction.type === "income" ? "text-success" : "text-foreground"}`}
              >
                {transaction.type === "income" ? "+" : "-"}
                {formatCurrency(transaction.amount)}
              </span>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDelete(transaction.id)}
                className="text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}

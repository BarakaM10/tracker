"use client"

import { Trash2, Plus, Minus } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import type { SavingsGoal } from "@/lib/types"
import { formatCurrency } from "@/lib/finance"

interface GoalCardProps {
  goal: SavingsGoal
  onDelete: (id: string) => void
  onUpdate: (id: string, amount: number) => void
}

export function GoalCard({ goal, onDelete, onUpdate }: GoalCardProps) {
  const progress = (goal.currentAmount / goal.targetAmount) * 100
  const remaining = goal.targetAmount - goal.currentAmount
  const deadline = new Date(goal.deadline)
  const today = new Date()
  const daysRemaining = Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div
              className="h-10 w-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: goal.color }}
            >
              <div className="h-3 w-3 rounded-full bg-white" />
            </div>
            <div>
              <CardTitle className="text-lg">{goal.name}</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {daysRemaining > 0 ? `${daysRemaining} days remaining` : "Deadline passed"}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(goal.id)}
            className="text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="flex justify-between items-center">
          <div>
            <p className="text-2xl font-bold">{formatCurrency(goal.currentAmount)}</p>
            <p className="text-sm text-muted-foreground">of {formatCurrency(goal.targetAmount)} goal</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-muted-foreground">Remaining</p>
            <p className="text-lg font-semibold">{formatCurrency(remaining)}</p>
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <Button variant="outline" size="sm" onClick={() => onUpdate(goal.id, -50)} className="flex-1">
            <Minus className="h-4 w-4 mr-1" />
            Withdraw
          </Button>
          <Button size="sm" onClick={() => onUpdate(goal.id, 50)} className="flex-1">
            <Plus className="h-4 w-4 mr-1" />
            Contribute
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

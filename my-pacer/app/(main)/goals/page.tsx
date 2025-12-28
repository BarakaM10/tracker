"use client"

import { useState, useEffect } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { GoalCard } from "@/components/goal-card"
import { GoalForm } from "@/components/goal-form"
import { storage } from "@/lib/storage"
import type { SavingsGoal } from "@/lib/types"

export default function SavingsGoalsPage() {
  const [goals, setGoals] = useState<SavingsGoal[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false)
  const [selectedGoalId, setSelectedGoalId] = useState("")
  const [updateAmount, setUpdateAmount] = useState("")

  useEffect(() => {
    setGoals(storage.getGoals())
  }, [])

  const handleAddGoal = (newGoal: Omit<SavingsGoal, "id">) => {
    const goal: SavingsGoal = {
      ...newGoal,
      id: crypto.randomUUID(),
    }
    const updated = [...goals, goal]
    setGoals(updated)
    storage.saveGoals(updated)
    setIsDialogOpen(false)
  }

  const handleDeleteGoal = (id: string) => {
    const updated = goals.filter((g) => g.id !== id)
    setGoals(updated)
    storage.saveGoals(updated)
  }

  const handleUpdateGoal = (id: string, quickAmount: number) => {
    setSelectedGoalId(id)
    setUpdateAmount(Math.abs(quickAmount).toString())
    setUpdateDialogOpen(true)
  }

  const confirmUpdate = () => {
    const amount = Number.parseFloat(updateAmount)
    if (isNaN(amount)) return

    const updated = goals.map((g) =>
      g.id === selectedGoalId ? { ...g, currentAmount: Math.max(0, g.currentAmount + amount) } : g,
    )
    setGoals(updated)
    storage.saveGoals(updated)
    setUpdateDialogOpen(false)
    setUpdateAmount("")
  }

  const totalSaved = goals.reduce((sum, g) => sum + g.currentAmount, 0)
  const totalTarget = goals.reduce((sum, g) => sum + g.targetAmount, 0)

  return (
    <div className="flex flex-col h-full">
      <div className="border-b border-border bg-card">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Savings Goals</h1>
              <p className="text-muted-foreground mt-1">Track progress toward your financial goals</p>
            </div>
            <Button onClick={() => setIsDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              New Goal
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {goals.length > 0 && (
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">Total Saved</p>
                  <p className="text-3xl font-bold text-primary">${totalSaved.toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Total Goal</p>
                  <p className="text-3xl font-bold">${totalTarget.toLocaleString()}</p>
                </div>
              </div>
            </div>
          )}

          {goals.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">No savings goals yet</p>
              <p className="text-sm text-muted-foreground mt-2">Create your first goal to start tracking</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {goals.map((goal) => (
                <GoalCard key={goal.id} goal={goal} onDelete={handleDeleteGoal} onUpdate={handleUpdateGoal} />
              ))}
            </div>
          )}
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Savings Goal</DialogTitle>
          </DialogHeader>
          <GoalForm onSubmit={handleAddGoal} onCancel={() => setIsDialogOpen(false)} />
        </DialogContent>
      </Dialog>

      <Dialog open={updateDialogOpen} onOpenChange={setUpdateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Goal Amount</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                value={updateAmount}
                onChange={(e) => setUpdateAmount(e.target.value)}
                placeholder="0.00"
              />
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setUpdateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={confirmUpdate}>Confirm</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

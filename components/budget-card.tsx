"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Edit, AlertTriangle } from "lucide-react"

interface Budget {
  category: string
  budgetAmount: number
  spentAmount: number
}

interface BudgetCardProps {
  budget: Budget
  onUpdateBudget: (category: string, newAmount: number) => void
}

export function BudgetCard({ budget, onUpdateBudget }: BudgetCardProps) {
  const [open, setOpen] = useState(false)
  const [newAmount, setNewAmount] = useState(budget.budgetAmount.toString())

  const { category, budgetAmount, spentAmount } = budget
  const percentage = budgetAmount > 0 ? (spentAmount / budgetAmount) * 100 : 0
  const remaining = budgetAmount - spentAmount
  const isOverBudget = spentAmount > budgetAmount

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const amount = Number.parseFloat(newAmount)
    if (amount >= 0) {
      onUpdateBudget(category, amount)
      setOpen(false)
    }
  }

  const getProgressColor = () => {
    if (isOverBudget) return "bg-red-500"
    if (percentage > 80) return "bg-yellow-500"
    return "bg-green-500"
  }

  return (
    <Card className={`${isOverBudget ? "border-red-200 bg-red-50/50" : ""}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          {category.charAt(0).toUpperCase() + category.slice(1)}
          {isOverBudget && <AlertTriangle className="h-4 w-4 text-red-500" />}
        </CardTitle>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost" size="sm" onClick={() => setNewAmount(budgetAmount.toString())}>
              <Edit className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit {category.charAt(0).toUpperCase() + category.slice(1)} Budget</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="budget-amount">Monthly Budget Amount</Label>
                <Input
                  id="budget-amount"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  value={newAmount}
                  onChange={(e) => setNewAmount(e.target.value)}
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Update Budget</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Spent</span>
          <span className="text-muted-foreground">Budget</span>
        </div>
        <div className="flex justify-between font-semibold">
          <span className={isOverBudget ? "text-red-600" : ""}>${spentAmount.toFixed(2)}</span>
          <span>${budgetAmount.toFixed(2)}</span>
        </div>

        <div className="space-y-2">
          <Progress value={Math.min(percentage, 100)} className="h-2" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{percentage.toFixed(1)}% used</span>
            <span>{Math.min(percentage, 100).toFixed(0)}%</span>
          </div>
        </div>

        <div className="text-sm">
          {isOverBudget ? (
            <span className="text-red-600 font-medium">${Math.abs(remaining).toFixed(2)} over budget</span>
          ) : (
            <span className="text-green-600">${remaining.toFixed(2)} remaining</span>
          )}
        </div>

        {isOverBudget && (
          <div className="text-xs text-red-600 bg-red-50 p-2 rounded border border-red-200">
            Warning: You have exceeded your budget for this category!
          </div>
        )}
      </CardContent>
    </Card>
  )
}

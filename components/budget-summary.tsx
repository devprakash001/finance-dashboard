"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Target } from "lucide-react"

interface Budget {
  category: string
  budgetAmount: number
  spentAmount: number
}

interface BudgetSummaryProps {
  budgets: Budget[]
}

export function BudgetSummary({ budgets }: BudgetSummaryProps) {
  const totalBudget = budgets.reduce((sum, budget) => sum + budget.budgetAmount, 0)
  const totalSpent = budgets.reduce((sum, budget) => sum + budget.spentAmount, 0)
  const totalRemaining = totalBudget - totalSpent
  const overBudgetCategories = budgets.filter((budget) => budget.spentAmount > budget.budgetAmount).length

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Total Budget</CardTitle>
          <Target className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${totalBudget.toFixed(2)}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Total Spent</CardTitle>
          <TrendingDown className="h-4 w-4 text-red-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600">${totalSpent.toFixed(2)}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Remaining</CardTitle>
          <TrendingUp className={`h-4 w-4 ${totalRemaining >= 0 ? "text-green-600" : "text-red-600"}`} />
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${totalRemaining >= 0 ? "text-green-600" : "text-red-600"}`}>
            ${totalRemaining.toFixed(2)}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Over Budget</CardTitle>
          <div className={`h-4 w-4 rounded-full ${overBudgetCategories > 0 ? "bg-red-500" : "bg-green-500"}`} />
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${overBudgetCategories > 0 ? "text-red-600" : "text-green-600"}`}>
            {overBudgetCategories}
          </div>
          <p className="text-xs text-muted-foreground">{overBudgetCategories === 1 ? "category" : "categories"}</p>
        </CardContent>
      </Card>
    </div>
  )
}

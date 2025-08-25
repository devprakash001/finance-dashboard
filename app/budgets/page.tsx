"use client"

import { Navbar } from "@/components/navbar"
import { BudgetCard } from "@/components/budget-card"
import { BudgetSummary } from "@/components/budget-summary"
import { useFinance } from "@/context/finance-context"

export default function BudgetsPage() {
  const { budgets, updateBudget } = useFinance()

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground">Budgets</h2>
          <p className="text-muted-foreground">Set and track your monthly budgets</p>
        </div>

        <BudgetSummary budgets={budgets} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {budgets.map((budget) => (
            <BudgetCard key={budget.category} budget={budget} onUpdateBudget={updateBudget} />
          ))}
        </div>
      </main>
    </div>
  )
}

"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

export interface Transaction {
  id: string
  date: string
  description: string
  category: string
  amount: number
  type: "income" | "expense"
}

export interface Budget {
  category: string
  budgetAmount: number
  spentAmount: number
}

interface FinanceContextType {
  transactions: Transaction[]
  budgets: Budget[]
  addTransaction: (transaction: Omit<Transaction, "id">) => void
  updateBudget: (category: string, newAmount: number) => void
  clearAllData: () => void
  getTotalIncome: () => number
  getTotalExpense: () => number
  getBalance: () => number
  getSpendingByCategory: () => { name: string; value: number; color: string }[]
  getSpendingOverTime: () => { month: string; spending: number }[]
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined)

const sampleTransactions: Transaction[] = []

const sampleBudgets: Budget[] = [
  { category: "food", budgetAmount: 0, spentAmount: 0 },
  { category: "transport", budgetAmount: 0, spentAmount: 0 },
  { category: "shopping", budgetAmount: 0, spentAmount: 0 },
  { category: "bills", budgetAmount: 0, spentAmount: 0 },
  { category: "health", budgetAmount: 0, spentAmount: 0 },
  { category: "others", budgetAmount: 0, spentAmount: 0 },
]

export function FinanceProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [budgets, setBudgets] = useState<Budget[]>([])

  // Load data from localStorage on mount
  useEffect(() => {
    const savedTransactions = localStorage.getItem("finance-transactions")
    const savedBudgets = localStorage.getItem("finance-budgets")

    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions))
    } else {
      setTransactions([])
    }

    if (savedBudgets) {
      setBudgets(JSON.parse(savedBudgets))
    } else {
      setBudgets(sampleBudgets)
    }
  }, [])

  useEffect(() => {
    const savedTransactions = localStorage.getItem("finance-transactions")
    if (savedTransactions) {
      const parsed = JSON.parse(savedTransactions)
      // Check if there are transactions from 2024 (old sample data)
      const hasOldData = parsed.some((t: Transaction) => t.date.includes("2024"))
      if (hasOldData) {
        localStorage.removeItem("finance-transactions")
        localStorage.removeItem("finance-budgets")
        setTransactions([])
        setBudgets(sampleBudgets)
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("finance-transactions", JSON.stringify(transactions))
  }, [transactions])

  useEffect(() => {
    localStorage.setItem("finance-budgets", JSON.stringify(budgets))
  }, [budgets])

  // Update budget spent amounts based on transactions
  useEffect(() => {
    setBudgets((prevBudgets) =>
      prevBudgets.map((budget) => {
        const categorySpending = transactions
          .filter((t) => t.type === "expense" && t.category === budget.category)
          .reduce((sum, t) => sum + t.amount, 0)

        return { ...budget, spentAmount: categorySpending }
      }),
    )
  }, [transactions])

  const addTransaction = (newTransaction: Omit<Transaction, "id">) => {
    const transaction: Transaction = {
      ...newTransaction,
      id: Date.now().toString(),
    }
    setTransactions((prev) => [transaction, ...prev])
  }

  const updateBudget = (category: string, newAmount: number) => {
    setBudgets((prev) =>
      prev.map((budget) => (budget.category === category ? { ...budget, budgetAmount: newAmount } : budget)),
    )
  }

  const clearAllData = () => {
    setTransactions([])
    setBudgets(sampleBudgets)
    localStorage.removeItem("finance-transactions")
    localStorage.removeItem("finance-budgets")
  }

  const getTotalIncome = () => {
    return transactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0)
  }

  const getTotalExpense = () => {
    return transactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0)
  }

  const getBalance = () => {
    return getTotalIncome() - getTotalExpense()
  }

  const getSpendingByCategory = () => {
    const categorySpending: { [key: string]: number } = {}
    const colors = [
      "hsl(var(--chart-1))",
      "hsl(var(--chart-2))",
      "hsl(var(--chart-3))",
      "hsl(var(--chart-4))",
      "hsl(var(--chart-5))",
    ]

    transactions
      .filter((t) => t.type === "expense")
      .forEach((t) => {
        categorySpending[t.category] = (categorySpending[t.category] || 0) + t.amount
      })

    return Object.entries(categorySpending).map(([name, value], index) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      value,
      color: colors[index % colors.length],
    }))
  }

  const getSpendingOverTime = () => {
    const monthlySpending: { [key: string]: number } = {}

    transactions
      .filter((t) => t.type === "expense")
      .forEach((t) => {
        const date = new Date(t.date)
        const monthKey = date.toLocaleDateString("en-US", { month: "short" })
        monthlySpending[monthKey] = (monthlySpending[monthKey] || 0) + t.amount
      })

    const months = ["Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"]
    const result = months.map((month) => ({
      month,
      spending: monthlySpending[month] || 0,
    }))

    return result
  }

  const value: FinanceContextType = {
    transactions,
    budgets,
    addTransaction,
    updateBudget,
    clearAllData,
    getTotalIncome,
    getTotalExpense,
    getBalance,
    getSpendingByCategory,
    getSpendingOverTime,
  }

  return <FinanceContext.Provider value={value}>{children}</FinanceContext.Provider>
}

export function useFinance() {
  const context = useContext(FinanceContext)
  if (context === undefined) {
    throw new Error("useFinance must be used within a FinanceProvider")
  }
  return context
}

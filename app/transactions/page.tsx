"use client"

import { Navbar } from "@/components/navbar"
import { AddTransactionModal } from "@/components/add-transaction-modal"
import { TransactionsTable } from "@/components/transactions-table"
import { useFinance } from "@/context/finance-context"

export default function TransactionsPage() {
  const { transactions, addTransaction } = useFinance()

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Transactions</h2>
            <p className="text-muted-foreground">Manage your income and expenses</p>
          </div>
          <AddTransactionModal onAddTransaction={addTransaction} />
        </div>

        <TransactionsTable transactions={transactions} />
      </main>
    </div>
  )
}

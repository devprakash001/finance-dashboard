"use client"

import { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, DollarSign, Tag, FileText } from "lucide-react"

interface Transaction {
  id: string
  date: string
  description: string
  category: string
  amount: number
  type: "income" | "expense"
}

interface TransactionsTableProps {
  transactions: Transaction[]
}

export function TransactionsTable({ transactions }: TransactionsTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const matchesSearch =
        transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.category.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = categoryFilter === "all" || transaction.category.toLowerCase() === categoryFilter
      return matchesSearch && matchesCategory
    })
  }, [transactions, searchTerm, categoryFilter])

  const categories = Array.from(new Set(transactions.map((t) => t.category.toLowerCase())))

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <div className="flex-1">
          <Input
            type="text"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full glass-morphism border-border/40"
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full sm:w-48 glass-morphism border-border/40">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Desktop Table View */}
      <Card className="hidden md:block glass-morphism border-border/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 backdrop-blur-sm">
              <tr>
                <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Date
                </th>
                <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Description
                </th>
                <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Category
                </th>
                <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="bg-card/50 backdrop-blur-sm divide-y divide-border/40">
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-muted-foreground">
                    {transactions.length === 0
                      ? "No transactions yet. Add your first transaction!"
                      : "No transactions match your search."}
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-muted/30 transition-colors duration-200">
                    <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-foreground">
                      {new Date(transaction.date).toLocaleDateString()}
                    </td>
                    <td className="px-4 lg:px-6 py-4 text-sm text-foreground">{transaction.description}</td>
                    <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm">
                      <Badge variant="secondary" className="glass-morphism">
                        {transaction.category.charAt(0).toUpperCase() + transaction.category.slice(1)}
                      </Badge>
                    </td>
                    <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <span className={transaction.type === "income" ? "text-green-500" : "text-red-500"}>
                        {transaction.type === "income" ? "+" : "-"}${Math.abs(transaction.amount).toFixed(2)}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-3">
        {filteredTransactions.length === 0 ? (
          <Card className="glass-morphism border-border/20 p-6 text-center">
            <p className="text-muted-foreground">
              {transactions.length === 0
                ? "No transactions yet. Add your first transaction!"
                : "No transactions match your search."}
            </p>
          </Card>
        ) : (
          filteredTransactions.map((transaction) => (
            <Card
              key={transaction.id}
              className="glass-morphism border-border/20 p-4 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <h3 className="font-medium text-foreground text-sm">{transaction.description}</h3>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {new Date(transaction.date).toLocaleDateString()}
                  </div>
                </div>
                <div className="text-right">
                  <div
                    className={`font-semibold text-lg ${transaction.type === "income" ? "text-green-500" : "text-red-500"}`}
                  >
                    {transaction.type === "income" ? "+" : "-"}${Math.abs(transaction.amount).toFixed(2)}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Tag className="h-3 w-3 text-muted-foreground" />
                  <Badge variant="secondary" className="glass-morphism text-xs">
                    {transaction.category.charAt(0).toUpperCase() + transaction.category.slice(1)}
                  </Badge>
                </div>
                <div className="flex items-center gap-1">
                  <DollarSign className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground capitalize">{transaction.type}</span>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}

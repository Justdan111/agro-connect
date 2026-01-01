"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Download } from "lucide-react"
import { TransactionTable } from "@/components/transporter/transaction-table"
import { TransactionStats } from "@/components/transporter/transaction-stats"
import { TransactionChart } from "@/components/transporter/transaction-chart"

// Dummy transaction data
const transactions = [
  {
    id: "TXN-001",
    date: "2025-05-15",
    jobId: "JOB-2001",
    cargo: "Corn",
    amount: "$450",
    status: "Completed",
    paymentMethod: "Bank Transfer",
  },
  {
    id: "TXN-002",
    date: "2025-05-14",
    jobId: "JOB-2002",
    cargo: "Wheat",
    amount: "$320",
    status: "Completed",
    paymentMethod: "Bank Transfer",
  },
  {
    id: "TXN-003",
    date: "2025-05-13",
    jobId: "JOB-2003",
    cargo: "Vegetables",
    amount: "$280",
    status: "Pending",
    paymentMethod: "Bank Transfer",
  },
  {
    id: "TXN-004",
    date: "2025-05-12",
    jobId: "JOB-2004",
    cargo: "Rice",
    amount: "$600",
    status: "Completed",
    paymentMethod: "Bank Transfer",
  },
  {
    id: "TXN-005",
    date: "2025-05-11",
    jobId: "JOB-2005",
    cargo: "Dairy Products",
    amount: "$500",
    status: "Completed",
    paymentMethod: "Bank Transfer",
  },
]

export default function TransactionsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateRange, setDateRange] = useState("all")

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.cargo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.jobId.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || transaction.status === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Transaction History</h1>
          <p className="text-muted-foreground">Track all your payments and earnings</p>
        </div>
        <Button>
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      <TransactionStats transactions={transactions} />

      <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search transactions..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
              </SelectContent>
            </Select>
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Date Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Dates</SelectItem>
                <SelectItem value="week">Last Week</SelectItem>
                <SelectItem value="month">Last Month</SelectItem>
                <SelectItem value="quarter">Last Quarter</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <TransactionChart transactions={transactions} />

        <TransactionTable transactions={filteredTransactions} />
      </div>
    </div>
  )
}

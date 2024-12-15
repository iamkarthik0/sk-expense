'use client'

import { useState, useMemo } from 'react'
import { ChevronUp, ChevronDown } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead, 
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"

type Invoice = {
  invoiceDate: string
  month: string
  description: string
  category: string
  totalAmount: string
  tax: string
  paymentMethod: string
  type: 'expense' | 'income'
}

const invoices: Invoice[] = [
  {
    invoiceDate: "2023-05-01",
    month: "May", 
    description: "Web Development Services",
    category: "IT Services",
    totalAmount: "$250.00",
    tax: "$25.00",
    paymentMethod: "Credit Card",
    type: 'income'
  },
  {
    invoiceDate: "2023-05-15",
    month: "May",
    description: "Graphic Design",
    category: "Design",
    totalAmount: "$150.00",
    tax: "$15.00",
    paymentMethod: "PayPal",
    type: 'expense'
  },
  {
    invoiceDate: "2023-06-01",
    month: "June",
    description: "Server Maintenance ", 
    category: "IT Services",
    totalAmount: "$350.00",
    tax: "$35.00",
    paymentMethod: "Bank Transfer",
    type: 'expense'
  },
  {
    invoiceDate: "2023-06-15",
    month: "June",
    description: "Content Writing",
    category: "Content",
    totalAmount: "$450.00",
    tax: "$45.00",
    paymentMethod: "Credit Card",
    type: 'income'
  },
  {
    invoiceDate: "2023-07-01",
    month: "July",
    description: "SEO Optimization",
    category: "Marketing",
    totalAmount: "$550.00",
    tax: "$55.00",
    paymentMethod: "PayPal",
    type: 'income'
  },
  {
    invoiceDate: "2023-07-15",
    month: "July",
    description: "Mobile App Development",
    category: "IT Services",
    totalAmount: "$200.00",
    tax: "$20.00",
    paymentMethod: "Bank Transfer",
    type: 'expense'
  },
  {
    invoiceDate: "2023-08-01",
    month: "August",
    description: "Social Media Management",
    category: "Marketing",
    totalAmount: "$300.00",
    tax: "$30.00",
    paymentMethod: "Credit Card",
    type: 'expense'
  },
]

type SortKeys = keyof Invoice
type SortOrder = 'asc' | 'desc'

function getSortedData(data: Invoice[], sortKey: SortKeys, reverse: boolean) {
  const sortedData = data.sort((a, b) => {
    if (sortKey === 'totalAmount' || sortKey === 'tax') {
      return parseFloat(a[sortKey].replace('$', '')) > parseFloat(b[sortKey].replace('$', '')) ? 1 : -1
    }
    if (sortKey === 'invoiceDate') {
      return new Date(a[sortKey]) > new Date(b[sortKey]) ? 1 : -1
    }
    return a[sortKey] > b[sortKey] ? 1 : -1
  })

  if (reverse) {
    return sortedData.reverse()
  }

  return sortedData
}

export function ExpenseTable() {
  const [sortKey, setSortKey] = useState<SortKeys>('invoiceDate')
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc')
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const sortedInvoices = useMemo(() => 
    getSortedData(invoices, sortKey, sortOrder === 'desc'),
    [sortKey, sortOrder]
  )

  const changeSort = (key: SortKeys) => {
    setSortOrder(oldOrder => {
      if (sortKey !== key) return 'asc'
      if (oldOrder === 'asc') return 'desc'
      return 'asc'
    })
    setSortKey(key)
  }

  const handleRowClick = (invoice: Invoice) => {
    setSelectedInvoice(invoice)
    setIsDialogOpen(true)
  }

  const handleDelete = () => {
    // Handle delete logic here
    toast.success("Invoice deleted successfully")
    setIsDialogOpen(false)
    setSelectedInvoice(null)
  }

  const handleSave = () => {
    // Handle save logic here
    toast.success("Changes saved successfully")
    setIsDialogOpen(false)
    setSelectedInvoice(null)
  }

  const SortButton = ({ sortKey }: { sortKey: SortKeys }) => {
    return (
      <Button 
        variant="ghost" 
        onClick={() => changeSort(sortKey)}
        className="p-0 h-4 w-4 ml-2 hover:bg-zinc-100 dark:hover:bg-zinc-800"
      >
        {sortOrder === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </Button>
    )
  }

  return (
    <Card className="p-4">
      <div className="mb-4">
        <h2 className="text-2xl font-bold">Expense Summary</h2>
      </div>
      
      <div className="w-full overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50">
              <TableHead className="w-[110px] min-w-[150px] font-bold">
                Invoice Date
                <SortButton sortKey="invoiceDate" />
              </TableHead>
              <TableHead className="w-[90px] min-w-[90px] font-bold">
                Month
                <SortButton sortKey="month" />
              </TableHead>
              <TableHead className="text-right min-w-[100px] font-bold">
                Amount
                <SortButton sortKey="totalAmount" />
              </TableHead>
              <TableHead className="text-right min-w-[80px] font-bold">
                Tax
                <SortButton sortKey="tax" />
              </TableHead>
              <TableHead className="min-w-[200px] font-bold">
                Description
                <SortButton sortKey="description" />
              </TableHead>
              <TableHead className="min-w-[120px] font-bold">
                Category
                <SortButton sortKey="category" />
              </TableHead>
              <TableHead className="min-w-[120px] font-bold">
                Method
                <SortButton sortKey="paymentMethod" />
              </TableHead>
              <TableHead className="min-w-[80px] font-bold">
                Type
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedInvoices.map((invoice, index) => (
              <TableRow 
                key={index}
                className={`hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50 transition-colors cursor-pointer ${
                  invoice.type === 'income' 
                    ? 'bg-green-50 dark:bg-green-900/20' 
                    : 'bg-red-50 dark:bg-red-900/20'
                }`}
                onClick={() => handleRowClick(invoice)}
              >
                <TableCell className="font-medium">{invoice.invoiceDate}</TableCell>
                <TableCell>{invoice.month}</TableCell>
                <TableCell className={`text-right font-semibold ${
                  invoice.type === 'income' 
                    ? 'text-green-600 dark:text-green-400' 
                    : 'text-red-600 dark:text-red-400'
                }`}>
                  {invoice.totalAmount}
                </TableCell>
                <TableCell className="text-right text-red-600 dark:text-red-400">
                  {invoice.tax}
                </TableCell>
                <TableCell>{invoice.description}</TableCell>
                <TableCell>
                  <span className="px-2 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-sm">
                    {invoice.category}
                  </span>
                </TableCell>
                <TableCell>{invoice.paymentMethod}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    invoice.type === 'income'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  }`}>
                    {invoice.type.charAt(0).toUpperCase() + invoice.type.slice(1)}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Invoice</DialogTitle>
          </DialogHeader>
          {selectedInvoice && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">Date</Label>
                <Input id="date" type="date" defaultValue={selectedInvoice.invoiceDate} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">Description</Label>
                <Input id="description" defaultValue={selectedInvoice.description} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="amount" className="text-right">Amount</Label>
                <Input id="amount" defaultValue={selectedInvoice.totalAmount} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="tax" className="text-right">Tax</Label>
                <Input id="tax" defaultValue={selectedInvoice.tax} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">Category</Label>
                <Select defaultValue={selectedInvoice.category}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="IT Services">IT Services</SelectItem>
                    <SelectItem value="Design">Design</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Content">Content</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">Type</Label>
                <Select defaultValue={selectedInvoice.type}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="income">Income</SelectItem>
                    <SelectItem value="expense">Expense</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="destructive" onClick={handleDelete}>Delete</Button>
            <Button onClick={handleSave}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  )
}

"use client"

import { useState, type ChangeEvent, useCallback, useMemo } from "react"
import { router } from "@inertiajs/react"
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  FilterIcon,
  SearchIcon,
  ChevronDownIcon,
  MoreHorizontalIcon,
  UserPlusIcon,
  FileTextIcon,
  CreditCardIcon,
} from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Label } from "@/components/ui/label"
import RecordCollectionSheet from "@/components/RecordCollectionSheet"

interface Customer {
  id: number
  name: string
  email: string | null
  phone: string | null
  balance: number
  status: string
}

interface Pagination<T> {
  data: T[]
  from: number
  to: number
  total: number
  current_page: number
  last_page: number
}

interface Filters {
  search?: string
  per_page?: number
  sort_field?: string
  sort_dir?: "asc" | "desc"
  page?: number
  name_filter?: string
  email_filter?: string
  phone_filter?: string
  balance_filter?: string
  status_filter?: string
}

interface RecordCollectionData {
  customerId: number
  amount: number
  paymentMethod: string
  referenceNumber: string
  paymentDate: Date
  notes: string
}

interface CustomersProps {
  section: string
  customers: Pagination<Customer>
  filters: Filters
}

// Debounce utility
function debounce<T extends unknown[]>(func: (...args: T) => void, wait: number): (...args: T) => void {
  let timeout: NodeJS.Timeout
  return (...args: T) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

export default function CustomersFixed({ section, customers, filters }: CustomersProps) {
  const [selectedIds, setSelectedIds] = useState<number[]>([])
  const [searchText, setSearchText] = useState(filters.search || "")
  const [filterOpen, setFilterOpen] = useState(false)
  const [sheetCustomer, setSheetCustomer] = useState<Customer | null>(null)

  const [columnFilters, setColumnFilters] = useState({
    name: filters.name_filter || "",
    email: filters.email_filter || "",
    phone: filters.phone_filter || "",
    balance: filters.balance_filter || "",
    status: filters.status_filter || "",
  })

  const data = customers.data

  // Batched updateQuery
  const updateQuery = useCallback(
    (params: Partial<Filters>) => {
      router.get(
        `/accounting/receivables/${section}`,
        { ...filters, ...params },
        {
          preserveState: true,
          replace: true,
          only: ["customers", "filters"],
        }
      )
    },
    [section, filters]
  )

  // Debounced raw GET for search & column filters
  const debouncedUpdate = useMemo(
    () =>
      debounce((key: keyof Filters, value: string | number) => {
        router.get(
          `/accounting/receivables/${section}`,
          { ...filters, [key]: value },
          {
            preserveState: true,
            replace: true,
            only: ["customers", "filters"],
          }
        )
      }, 300),
    [section, filters]
  )

  const handleSearch = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const v = e.target.value
      setSearchText(v)
      debouncedUpdate("search", v)
    },
    [debouncedUpdate]
  )

  const clearSearch = useCallback(() => {
    setSearchText("")
    updateQuery({ search: "" })
  }, [updateQuery])

  const handleColumnFilter = useCallback(
    (column: keyof typeof columnFilters, value: string) => {
      setColumnFilters((prev) => ({ ...prev, [column]: value }))
      debouncedUpdate(`${column}_filter` as keyof Filters, value)
    },
    [debouncedUpdate]
  )

  const toggleSelect = useCallback((id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }, [])

  const toggleSelectAll = useCallback(() => {
    if (selectedIds.length === data.length) {
      setSelectedIds([])
    } else {
      setSelectedIds(data.map((c) => c.id))
    }
  }, [selectedIds.length, data])

  // Single-call sort that resets page
  const handleSort = useCallback(
    (field: keyof Customer) => {
      const dir = filters.sort_field === field && filters.sort_dir === "asc" ? "desc" : "asc"
      updateQuery({ sort_field: field, sort_dir: dir, page: 1 })
    },
    [filters, updateQuery]
  )

  const handleMainAction = useCallback((cust: Customer) => {
    if (cust.balance > 0) {
      setSheetCustomer(cust)
    } else {
      router.visit(`/invoices/create?customer=${cust.id}`)
    }
  }, [])

  const handleMenuAction = useCallback((action: string, cust: Customer) => {
    switch (action) {
      case "view":
        router.visit(`/customers/${cust.id}`)
        break
      case "invoice":
        router.visit(`/invoices/create?customer=${cust.id}`)
        break
      case "record":
        setSheetCustomer(cust)
        break
      case "statement":
        router.visit(`/statements/send?customer=${cust.id}`)
        break
      case "inactive":
        router.patch(`/customers/${cust.id}/status`, { status: "inactive" })
        break
    }
  }, [])

  const handleNewCustomer = useCallback(() => {
    router.visit("/customers/create")
  }, [])

  const formatBalance = useCallback((bal: number) => {
    return bal.toLocaleString("en-PH", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  }, [])

  const handleCollectionSubmit = useCallback((data: RecordCollectionData) => {
    const payload = {
      customer_id: data.customerId,
      amount: data.amount,
      payment_method: data.paymentMethod,
      reference_number: data.referenceNumber,
      payment_date: data.paymentDate.toISOString().split("T")[0],
      notes: data.notes,
    }
    router.post("/collections", payload, {
      onSuccess: () => {
        setSheetCustomer(null)
        router.reload({ only: ["customers"] })
      },
      onError: (errors) => console.error("Error:", errors),
    })
  }, [])

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Global Search */}
          <div className="relative">
            <Input
              placeholder="Search all columns..."
              value={searchText}
              onChange={handleSearch}
              className="pl-10 pr-10 w-80"
            />
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            {searchText && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800 text-lg"
              >
                ×
              </button>
            )}
          </div>

          {/* Column Filters */}
          <Popover open={filterOpen} onOpenChange={setFilterOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center space-x-1">
                <FilterIcon className="h-4 w-4" />
                <span>Filter Columns</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-4">
              <div className="font-medium mb-4">Filter by Column</div>
              <div className="space-y-3">
                {Object.entries(columnFilters).map(([col, val]) => (
                  <div key={col}>
                    <Label className="text-sm font-medium capitalize">{col}</Label>
                    <Input
                      placeholder={`Filter by ${col}...`}
                      value={val}
                      onChange={(e) =>
                        handleColumnFilter(col as keyof typeof columnFilters, e.target.value)
                      }
                      className="mt-1"
                    />
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>

          {/* Per-page */}
          <Select
            value={(filters.per_page || 10).toString()}
            onValueChange={(v) => updateQuery({ per_page: Number(v), page: 1 })}
          >
            <SelectTrigger className="w-20">
              <SelectValue placeholder={`${filters.per_page ?? 10}`} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="30">30</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* New Customer */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="bg-orange-600 hover:bg-orange-700 text-white flex items-center">
              <UserPlusIcon className="mr-2 h-4 w-4" />
              New Customer
              <ChevronDownIcon className="ml-1 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onSelect={handleNewCustomer}>
              <UserPlusIcon className="mr-2 h-4 w-4" />
              New Customer
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={() => router.visit("/customers/import")}>
              Import Customers
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => router.visit("/customers/categories")}>
              Manage Categories
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Table */}
      <div className="overflow-auto rounded-md border max-h-[70vh]">
        <Table>
          <TableHeader className="bg-gray-50 sticky top-0 z-10">
            <TableRow>
              <TableHead className="w-12 sticky top-0 bg-gray-50">
                <Checkbox
                  checked={selectedIds.length === data.length && data.length > 0}
                  onCheckedChange={toggleSelectAll}
                  aria-label="Select all customers"
                />
              </TableHead>
              {(["name", "email", "phone", "balance", "status"] as (keyof Customer)[]).map((field) => (
                <TableHead
                  key={field}
                  className="cursor-pointer hover:bg-gray-100 sticky top-0 bg-gray-50"
                  onClick={() => handleSort(field)}
                >
                  <div className="flex items-center space-x-1 font-medium">
                    <span>{field.charAt(0).toUpperCase() + field.slice(1)}</span>
                    <span className="text-xs text-gray-400">⇅</span>
                    {filters.sort_field === field && (
                      <span className="text-xs">{filters.sort_dir === "asc" ? "↑" : "↓"}</span>
                    )}
                  </div>
                </TableHead>
              ))}
              <TableHead className="text-center font-medium sticky top-0 bg-gray-50">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.length > 0 ? (
              data.map((cust) => {
                const hasBalance = cust.balance > 0
                const mainActionLabel = hasBalance ? "Record Collection" : "Create Invoice"
                const MainActionIcon = hasBalance ? CreditCardIcon : FileTextIcon

                return (
                  <TableRow key={cust.id} className="hover:bg-gray-50">
                    <TableCell>
                      <Checkbox
                        checked={selectedIds.includes(cust.id)}
                        onCheckedChange={() => toggleSelect(cust.id)}
                        aria-label={`Select ${cust.name}`}
                      />
                    </TableCell>
                    <TableCell className="font-medium">{cust.name}</TableCell>
                    <TableCell>{cust.email ?? "N/A"}</TableCell>
                    <TableCell>{cust.phone ?? "N/A"}</TableCell>
                    <TableCell>
                      <span className={`font-medium ${hasBalance ? "text-red-600" : "text-green-600"}`}>
                        ₱{formatBalance(cust.balance)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                          cust.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {cust.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <Button
                          size="sm"
                          className={hasBalance ? "bg-orange-600 hover:bg-orange-700" : ""}
                          onClick={() => handleMainAction(cust)}
                        >
                          <MainActionIcon className="mr-1 h-3 w-3" />
                          {mainActionLabel}
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontalIcon className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onSelect={() => handleMenuAction("view", cust)}>
                              View Details
                            </DropdownMenuItem>
                            {!hasBalance && (
                              <DropdownMenuItem onSelect={() => handleMenuAction("record", cust)}>
                                Record Collection
                              </DropdownMenuItem>
                            )}
                            {hasBalance && (
                              <DropdownMenuItem onSelect={() => handleMenuAction("invoice", cust)}>
                                Create Invoice
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem onSelect={() => handleMenuAction("statement", cust)}>
                              Send Statement
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onSelect={() => handleMenuAction("inactive", cust)}
                              className="text-red-600"
                            >
                              Make Inactive
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                  No customers found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {data.length > 0 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Showing {customers.from}–{customers.to} of {customers.total} customers
          </p>
          <div className="flex items-center space-x-1">
            <Button
              size="sm"
              variant="outline"
              disabled={customers.current_page <= 1}
              onClick={() => updateQuery({ page: customers.current_page - 1 })}
            >
              Previous
            </Button>
            {Array.from({ length: Math.min(5, customers.last_page) }).map((_, i) => {
              const page = i + 1
              return (
                <Button
                  key={page}
                  size="sm"
                  variant={customers.current_page === page ? "default" : "outline"}
                  onClick={() => updateQuery({ page })}
                >
                  {page}
                </Button>
              )
            })}
            <Button
              size="sm"
              variant="outline"
              disabled={customers.current_page >= customers.last_page}
              onClick={() => updateQuery({ page: customers.current_page + 1 })}
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {/* Record Collection Sheet */}
      <Sheet open={!!sheetCustomer} onOpenChange={() => setSheetCustomer(null)}>
        <SheetContent side="right" className="w-[500px] sm:w-[540px]">
          <SheetHeader>
            <SheetTitle>Record Collection</SheetTitle>
          </SheetHeader>
          {sheetCustomer && (
            <RecordCollectionSheet
              customer={sheetCustomer}
              onClose={() => setSheetCustomer(null)}
              onSubmit={handleCollectionSubmit}
            />
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}

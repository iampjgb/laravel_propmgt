import React, { useState, ChangeEvent } from 'react'
import { router } from '@inertiajs/react'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { FilterIcon, SearchIcon, ChevronDownIcon } from 'lucide-react'
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from '@/components/ui/sheet'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import RecordCollectionForm from '@/components/RecordCollectionSheet'

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
  sort_dir?: 'asc' | 'desc'
  page?: number
}

interface CustomersProps {
  section: string
  customers: Pagination<Customer>
  filters: Filters
}

export default function Customers({ section, customers, filters }: CustomersProps) {
  const [selectedIds, setSelectedIds] = useState<number[]>([])
  const [searchText, setSearchText] = useState(filters.search || '')
  const [filterOpen, setFilterOpen] = useState(false)
  const [visibleCols, setVisibleCols] = useState<Record<keyof Customer, boolean>>({
    name: true,
    email: true,
    phone: true,
    balance: true,
    status: true,
    id: false,
  })
  const [sheetCustomer, setSheetCustomer] = useState<Customer | null>(null)

  const data = customers.data

  function updateQuery(key: keyof Filters, value: string | number) {
    router.get(
      `/accounting/receivables/${section}`,
      { ...filters, [key]: value },
      { preserveState: true, replace: true }
    )
  }

  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    const v = e.target.value
    setSearchText(v)
    updateQuery('search', v)
  }

  function clearSearch() {
    setSearchText('')
    updateQuery('search', '')
  }

  function toggleSelect(id: number) {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  function toggleSelectAll() {
    if (selectedIds.length === data.length) {
      setSelectedIds([])
    } else {
      setSelectedIds(data.map((c) => c.id))
    }
  }

  function handleSort(field: keyof Customer) {
    const dir = filters.sort_field === field && filters.sort_dir === 'asc' ? 'desc' : 'asc'
    updateQuery('sort_field', field)
    updateQuery('sort_dir', dir)
  }

  function toggleColumn(col: keyof Customer) {
    setVisibleCols((prev) => ({ ...prev, [col]: !prev[col] }))
  }

  function handleAction(action: string, cust: Customer) {
    if (action === 'view') {
      router.visit(`/customers/${cust.id}`)
    }
    if (action === 'invoice') {
      router.visit(`/invoices/create?customer=${cust.id}`)
    }
    if (action === 'record') {
      setSheetCustomer(cust)
    }
    if (action === 'statement') {
      router.visit(`/statements/send?customer=${cust.id}`)
    }
  }

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            <Input
              placeholder="Search customers..."
              value={searchText}
              onChange={handleSearch}
              className="pl-10 pr-10"
            />
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            {searchText && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800"
              >
                ×
              </button>
            )}
          </div>

          {/* Filter */}
          <Popover open={filterOpen} onOpenChange={setFilterOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center space-x-1">
                <FilterIcon className="h-4 w-4" />
                <span>Filter</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-4">
              <div className="font-medium mb-2">Toggle Columns</div>
              {(['name','email','phone','balance','status'] as (keyof Customer)[]).map((col) => (
                <div key={col} className="flex items-center mb-1">
                  <Checkbox
                    checked={visibleCols[col]}
                    onCheckedChange={() => toggleColumn(col)}
                  />
                  <span className="ml-2">{col.charAt(0).toUpperCase() + col.slice(1)}</span>
                </div>
              ))}
            </PopoverContent>
          </Popover>

          {/* Per-page */}
          <Select
            value={(filters.per_page || 10).toString()}
            onValueChange={(v) => updateQuery('per_page', Number(v))}
          >
            <SelectTrigger className="w-20">
              <SelectValue placeholder={`${filters.per_page ?? 10}`} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="30">30</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Create New Customer */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="bg-orange-600 hover:bg-orange-700 text-white flex items-center">
              New Customer
              <ChevronDownIcon className="ml-1 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onSelect={() => router.visit('/contacts/create?type=customer')}>
              New Customer Category
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={() => {/* import customers logic */}}>
              Import Customers
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => {/* import category logic */}}>
              Import Category
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Table */}
      <div className="overflow-auto rounded-md border">
        <Table>
          <TableHeader className="bg-gray-50 sticky top-0">
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedIds.length === data.length && data.length > 0}
                  onCheckedChange={toggleSelectAll}
                  aria-label="Select all customers"
                />
              </TableHead>

              {(['name','email','phone','balance','status'] as (keyof Customer)[]).map((field) =>
                visibleCols[field] && (
                  <TableHead
                    key={field}
                    className="cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort(field)}
                  >
                    <div className="flex items-center space-x-1 font-medium">
                      <span>{field.charAt(0).toUpperCase() + field.slice(1)}</span>
                      <span className="text-xs text-gray-400">⇅</span>
                      {filters.sort_field === field && (
                        <span className="text-xs">{filters.sort_dir === 'asc' ? '↑' : '↓'}</span>
                      )}
                    </div>
                  </TableHead>
                )
              )}

              <TableHead className="text-center font-medium">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.length > 0 ? (
              data.map((cust) => {
                const hasBal = cust.balance > 0
                const primary = hasBal ? 'record' : 'invoice'
                const label = hasBal ? 'Record Collection' : 'Create Invoice'
                return (
                  <TableRow key={cust.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedIds.includes(cust.id)}
                        onCheckedChange={() => toggleSelect(cust.id)}
                        aria-label={`Select ${cust.name}`}
                      />
                    </TableCell>
                    {visibleCols.name && <TableCell className="font-medium">{cust.name}</TableCell>}
                    {visibleCols.email && <TableCell>{cust.email ?? 'N/A'}</TableCell>}
                    {visibleCols.phone && <TableCell>{cust.phone ?? 'N/A'}</TableCell>}
                    {visibleCols.balance && (
                      <TableCell>
                        <span className={`font-medium ${hasBal ? 'text-red-600' : 'text-green-600'}`}>
                          ₱{cust.balance.toLocaleString('en-PH',{minimumFractionDigits:2,maximumFractionDigits:2})}
                        </span>
                      </TableCell>
                    )}
                    {visibleCols.status && (
                      <TableCell>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                          cust.status==='active'?'bg-green-100 text-green-800':'bg-gray-100 text-gray-800'
                        }`}>
                          {cust.status}
                        </span>
                      </TableCell>
                    )}
                    <TableCell className="text-center">
                      <Select onValueChange={(act) => handleAction(act, cust)}>
                        <SelectTrigger className="w-8 h-8 p-0">•••</SelectTrigger>
                        <SelectContent>
                          <SelectItem value={primary}>{label}</SelectItem>
                          {primary !== 'record' && <SelectItem value="record">Record Collection</SelectItem>}
                          {primary !== 'invoice' && <SelectItem value="invoice">Create Invoice</SelectItem>}
                          <SelectItem value="view">View</SelectItem>
                          <SelectItem value="statement">Send Statement</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                )
              })
            ) : (
              <TableRow>
                <TableCell colSpan={
                  Object.values(visibleCols).filter(Boolean).length + 2
                } className="text-center py-8 text-gray-500">
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
            Showing {customers.from}–{customers.to} of {customers.total}
          </p>
          <div className="flex items-center space-x-1">
            <Button
              size="sm"
              variant="outline"
              disabled={customers.current_page <= 1}
              onClick={() => updateQuery('page', customers.current_page - 1)}
            >
              Previous
            </Button>
            {Array.from({ length: customers.last_page }).map((_, i) => {
              const page = i + 1
              return (
                <Button
                  key={page}
                  size="sm"
                  variant={customers.current_page===page?'default':'outline'}
                  onClick={() => updateQuery('page', page)}
                >
                  {page}
                </Button>
              )
            })}
            <Button
              size="sm"
              variant="outline"
              disabled={customers.current_page>=customers.last_page}
              onClick={() => updateQuery('page', customers.current_page+1)}
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {/* Record Collection Sheet */}
      <Sheet open={!!sheetCustomer} onOpenChange={() => setSheetCustomer(null)}>
        <SheetTrigger asChild><div/></SheetTrigger>
        <SheetContent side="right" className="max-w-md">
          <SheetHeader>
            <SheetTitle>
              {sheetCustomer ? `Record Collection: ${sheetCustomer.name}` : 'Record Collection'}
            </SheetTitle>
            <SheetClose />
          </SheetHeader>
          {sheetCustomer && (
            <RecordCollectionForm
              customer={sheetCustomer}
              onClose={() => setSheetCustomer(null)}
              onSubmit={(data) => {
                console.log('Saved:', data)
                setSheetCustomer(null)
              }}
            />
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}

import React, { useState, ChangeEvent } from 'react';
import { router } from '@inertiajs/react';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

interface Customer {
  id: number;
  name: string;
  email: string | null;
  phone: string | null;
  balance: number;
  status: string;
}

interface Pagination<T> {
  data: T[];
  from: number;
  to: number;
  total: number;
  current_page: number;
  last_page: number;
}

interface Filters {
  search?: string;
  per_page?: number;
  sort_field?: string;
  sort_dir?: 'asc' | 'desc';
  page?: number;
}

interface CustomersProps {
  section: string;
  customers: Pagination<Customer>;
  filters: Filters;
}

export default function Customers({ section, customers, filters }: CustomersProps): React.JSX.Element {
  const [selected, setSelected] = useState<number[]>([]);
  const data = customers.data;

  const updateQuery = (key: keyof Filters, value: string | number): void => {
    router.get(
      `/accounting/receivables/${section}`,
      { ...filters, [key]: value },
      { preserveState: true, replace: true }
    );
  };

  const toggleSelect = (id: number): void => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const toggleSelectAll = (): void => {
    setSelected((prev) => (prev.length === data.length ? [] : data.map((c) => c.id)));
  };

  const handleSort = (field: keyof Customer): void => {
    const newDir: 'asc' | 'desc' = filters.sort_field === field && filters.sort_dir === 'asc' ? 'desc' : 'asc';
    updateQuery('sort_field', field);
    updateQuery('sort_dir', newDir);
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>): void => {
    updateQuery('search', e.target.value);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Input
          placeholder="Search customers..."
          value={filters.search || ''}
          onChange={handleSearch}
          className="max-w-sm"
        />
        <Select
          value={(filters.per_page || 10).toString()}
          onValueChange={(v) => updateQuery('per_page', Number(v))}
        >
          <SelectTrigger className="w-24">
            <SelectValue placeholder={`${filters.per_page ?? 10}`} />
          </SelectTrigger>
          <SelectContent>
            {[10, 20, 30].map((n) => (
              <SelectItem key={n} value={n.toString()}>
                {n}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={selected.length === data.length && data.length > 0}
                  onCheckedChange={toggleSelectAll}
                  aria-label="Select all customers"
                />
              </TableHead>
              {(
                ['name', 'email', 'phone', 'balance', 'status'] as (keyof Customer)[]
              ).map((field) => (
                <TableHead key={field} className="cursor-pointer hover:bg-muted/50" onClick={() => handleSort(field)}>
                  <div className="flex items-center space-x-1">
                    <span>{field.charAt(0).toUpperCase() + field.slice(1)}</span>
                    {filters.sort_field === field && <span className="text-xs">{filters.sort_dir === 'asc' ? '↑' : '↓'}</span>}
                  </div>
                </TableHead>
              ))}
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.length > 0 ? (
              data.map((cust) => (
                <TableRow key={cust.id}>
                  <TableCell>
                    <Checkbox checked={selected.includes(cust.id)} onCheckedChange={() => toggleSelect(cust.id)} aria-label={`Select ${cust.name}`} />
                  </TableCell>
                  <TableCell>{cust.name}</TableCell>
                  <TableCell>{cust.email ?? 'N/A'}</TableCell>
                  <TableCell>{cust.phone ?? 'N/A'}</TableCell>
                  <TableCell>
                    <span className={`font-medium ${(cust.balance > 0 ? 'text-red-600' : 'text-green-600')}`}>₱{cust.balance.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${(cust.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800')}`}>{cust.status}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="outline" onClick={() => router.visit(`/customers/${cust.id}`)}>View</Button>
                      <Button size="sm" onClick={() => router.visit(`/invoices/create?customer=${cust.id}`)}>Invoice</Button>
                      <Button size="sm" variant="secondary" onClick={() => router.visit(`/collections/create?customer=${cust.id}`)}>Collect</Button>
                      <Button size="sm" variant="ghost" onClick={() => console.log('Statement', cust.id)}>Statement</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">No customers found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {data.length > 0 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Showing {customers.from}–{customers.to} of {customers.total}</p>
          <div className="flex items-center space-x-1">
            <Button size="sm" variant="outline" disabled={customers.current_page <= 1} onClick={() => updateQuery('page', customers.current_page - 1)}>Previous</Button>
            {Array.from({ length: customers.last_page }).map((_, i) => {
              const page = i + 1;
              return (
                <Button key={page} size="sm" variant={customers.current_page === page ? 'default' : 'outline'} onClick={() => updateQuery('page', page)}>{page}</Button>
              );
            })}
            <Button size="sm" variant="outline" disabled={customers.current_page >= customers.last_page} onClick={() => updateQuery('page', customers.current_page + 1)}>Next</Button>
          </div>
        </div>
      )}
    </div>
  );
}

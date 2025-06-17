"use client"

import React, { useState, ChangeEvent, FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"

interface Customer {
  id: number
  name: string
  email: string | null
  phone: string | null
  balance: number
  status: string
}

export interface RecordCollectionData {
  customerId: number
  amount: number
  paymentMethod: string
  referenceNumber: string
  paymentDate: Date
  notes: string
}

interface RecordCollectionSheetProps {
  customer: Customer
  onClose: () => void
  onSubmit: (data: RecordCollectionData) => void
}

export default function RecordCollectionSheet({
  customer,
  onClose,
  onSubmit,
}: RecordCollectionSheetProps) {
  // Define form state with explicit types
  const [formData, setFormData] = useState<{
    amount: string
    paymentMethod: string
    referenceNumber: string
    paymentDate: Date
    notes: string
  }>({
    amount: "",
    paymentMethod: "",
    referenceNumber: "",
    paymentDate: new Date(),
    notes: "",
  })

  // Handle form submission
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    onSubmit({
      customerId: customer.id,
      amount: parseFloat(formData.amount),
      paymentMethod: formData.paymentMethod,
      referenceNumber: formData.referenceNumber,
      paymentDate: formData.paymentDate,
      notes: formData.notes,
    })
  }

  // Generic field updater
  function handleInputChange<
    K extends keyof typeof formData
  >(field: K, value: typeof formData[K]) {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="space-y-6 p-6">
      {/* Customer Info */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-medium text-gray-900">{customer.name}</h3>
        {customer.email && (
          <p className="text-sm text-gray-600">{customer.email}</p>
        )}
        <p className="text-sm font-medium text-red-600">
          Outstanding Balance: ₱
          {customer.balance.toLocaleString("en-PH", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>
      </div>

      {/* Collection Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Amount */}
        <div>
          <Label htmlFor="amount">Collection Amount *</Label>
          <Input
            id="amount"
            type="number"
            step="0.01"
            placeholder="0.00"
            value={formData.amount}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleInputChange("amount", e.target.value)
            }
            required
          />
        </div>

        {/* Payment Method */}
        <div>
          <Label htmlFor="paymentMethod">Payment Method *</Label>
          <Select
            value={formData.paymentMethod}
            onValueChange={(v) => handleInputChange("paymentMethod", v)}
          >
            <SelectTrigger id="paymentMethod">
              <SelectValue placeholder="Select payment method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cash">Cash</SelectItem>
              <SelectItem value="check">Check</SelectItem>
              <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
              <SelectItem value="credit_card">Credit Card</SelectItem>
              <SelectItem value="gcash">GCash</SelectItem>
              <SelectItem value="paymaya">PayMaya</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Reference Number */}
        <div>
          <Label htmlFor="referenceNumber">Reference Number</Label>
          <Input
            id="referenceNumber"
            placeholder="Check #, Transaction ID, etc."
            value={formData.referenceNumber}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleInputChange("referenceNumber", e.target.value)
            }
          />
        </div>

        {/* Payment Date */}
        <div>
          <Label htmlFor="paymentDate">Payment Date *</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
                id="paymentDate"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {format(formData.paymentDate, "PPP")}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={formData.paymentDate}
                onSelect={(date) =>
                  handleInputChange(
                    "paymentDate",
                    date ?? new Date()
                  )
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Notes */}
        <div>
          <Label htmlFor="notes">Notes</Label>
          <textarea
            id="notes"
            placeholder="Additional notes..."
            rows={3}
            className="mt-1 block w-full rounded-md border px-3 py-2"
            value={formData.notes}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              handleInputChange("notes", e.target.value)
            }
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-orange-600 hover:bg-orange-700 text-white"
            disabled={
              formData.amount === "" || formData.paymentMethod === ""
            }
          >
            Record Collection
          </Button>
        </div>
      </form>
    </div>
  )
}

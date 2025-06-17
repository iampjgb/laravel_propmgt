"use client"

import * as React from "react"
import { ChevronDownIcon } from "lucide-react"
import { Dialog, DialogOverlay, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover"
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select"

interface Props {
  customer: { id: number; name: string }
  onClose(): void
  onSubmit(data: {
    date: Date
    receiptNo: string
    paymentMethod: string
    reference?: string
    amount: number
  }): void
}

export default function RecordCollectionSheet({ customer, onClose, onSubmit }: Props) {
  const [open, setOpen] = React.useState(false)
  const [date, setDate] = React.useState<Date>(new Date())
  const [receiptNo, setReceiptNo] = React.useState<string>("")
  const [method, setMethod] = React.useState<string>("Cash")
  const [reference, setReference] = React.useState<string>("")
  const [amount, setAmount] = React.useState<number>(0)

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogOverlay className="fixed inset-0 bg-black/50" />
      <DialogContent className="fixed bottom-0 left-0 right-0 bg-white p-6 rounded-t-lg shadow-lg">
        <h2 className="text-lg font-semibold mb-4">
          Record Collection for {customer.name}
        </h2>

        <div className="space-y-4">
          {/* Date Picker */}
          <div className="flex flex-col gap-1">
            <Label htmlFor="collection-date">Date</Label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  id="collection-date"
                  className="w-48 justify-between font-normal"
                >
                  {date.toLocaleDateString("en-PH", {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                  })}
                  <ChevronDownIcon className="ml-2 h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  captionLayout="dropdown"
                  onSelect={(d) => {
                    if (d) {
                      setDate(d)
                      setOpen(false)
                    }
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Receipt No */}
          <div>
            <Label htmlFor="receipt-no">Receipt No.</Label>
            <Input
              id="receipt-no"
              value={receiptNo}
              onChange={(e) => setReceiptNo(e.target.value)}
              className="mt-1 w-full"
            />
          </div>

          {/* Payment Method */}
          <div>
            <Label htmlFor="payment-method">Payment Method</Label>
            <Select
              value={method}
              onValueChange={setMethod}
            >
              <SelectTrigger id="payment-method" className="w-full mt-1">
                <SelectValue placeholder="Select method" />
              </SelectTrigger>
              <SelectContent>
                {["Cash", "Check", "Credit Card", "Bank Transfer"].map((m) => (
                  <SelectItem key={m} value={m}>
                    {m}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Reference (only if not Cash) */}
          {method !== "Cash" && (
            <div>
              <Label htmlFor="reference">Reference</Label>
              <Input
                id="reference"
                value={reference}
                onChange={(e) => setReference(e.target.value)}
                className="mt-1 w-full"
              />
            </div>
          )}

          {/* Amount */}
          <div>
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="mt-1 w-full"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={() =>
              onSubmit({
                date,
                receiptNo,
                paymentMethod: method,
                reference,
                amount,
              })
            }
          >
            Save Collection
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

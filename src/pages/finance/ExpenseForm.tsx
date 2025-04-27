
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useState } from "react"
import { toast } from "@/components/ui/use-toast"

import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ExpenseFormHeader } from "./components/ExpenseFormHeader"
import { DateField } from "./components/DateField"
import { AmountField } from "./components/AmountField"
import { SelectField } from "./components/SelectField"
import { ReceiptUpload } from "./components/ReceiptUpload"

const formSchema = z.object({
  date: z.date({
    required_error: "Please select a date",
  }),
  description: z.string().min(5, "Description must be at least 5 characters"),
  amount: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Please enter a valid amount greater than 0",
  }),
  expenseType: z.string({
    required_error: "Please select an expense type",
  }),
  fund: z.string().optional(),
  paymentMethod: z.string({
    required_error: "Please select a payment method",
  }),
  receipt: z.any().optional(),
})

const expenseTypes = [
  "Administrative",
  "Building Maintenance",
  "Events",
  "Missions",
  "Staff",
  "Utilities",
  "Worship",
  "Other",
]

const paymentMethods = [
  "Cash",
  "Check",
  "Credit Card",
  "Debit Card",
  "Bank Transfer",
  "Other",
]

const funds = [
  "Building Fund",
  "Missions Fund",
  "Youth Fund",
  "General Fund",
]

export default function ExpenseForm() {
  const [receiptFileName, setReceiptFileName] = useState<string>("")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    toast({
      title: "Expense recorded",
      description: `$${values.amount} expense has been recorded.`,
    })
  }

  return (
    <div className="container py-6">
      <ExpenseFormHeader />

      <div className="mt-4 max-w-2xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <DateField control={form.control} />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <Textarea
                    placeholder="Enter expense description"
                    className="resize-none"
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <AmountField control={form.control} />

            <SelectField
              control={form.control}
              name="expenseType"
              label="Expense Type"
              placeholder="Select expense type"
              options={expenseTypes}
            />

            <SelectField
              control={form.control}
              name="fund"
              label="Fund"
              placeholder="Select fund (optional)"
              options={funds}
              optional={true}
            />

            <SelectField
              control={form.control}
              name="paymentMethod"
              label="Payment Method"
              placeholder="Select payment method"
              options={paymentMethods}
            />

            <ReceiptUpload 
              control={form.control}
              receiptFileName={receiptFileName}
              setReceiptFileName={setReceiptFileName}
            />

            <Button type="submit" className="w-full">
              Record Expense
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}


import { DollarSign } from "lucide-react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";

interface AmountFieldProps {
  control: Control<any>;
}

export function AmountField({ control }: AmountFieldProps) {
  return (
    <FormField
      control={control}
      name="amount"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Amount</FormLabel>
          <FormControl>
            <div className="relative">
              <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              <Input placeholder="0.00" className="pl-10" {...field} />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

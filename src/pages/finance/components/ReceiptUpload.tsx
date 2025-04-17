
import { Upload } from "lucide-react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Control } from "react-hook-form";

interface ReceiptUploadProps {
  control: Control<any>;
  receiptFileName: string;
  setReceiptFileName: (name: string) => void;
}

export function ReceiptUpload({ control, receiptFileName, setReceiptFileName }: ReceiptUploadProps) {
  return (
    <FormField
      control={control}
      name="receipt"
      render={({ field: { onChange, value, ...fieldProps } }) => (
        <FormItem>
          <FormLabel>Receipt (Optional)</FormLabel>
          <FormControl>
            <div className="grid w-full items-center gap-1.5">
              <label 
                htmlFor="receipt"
                className="flex w-full cursor-pointer items-center justify-center rounded-md border border-dashed p-4 hover:bg-muted"
              >
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Upload className="h-4 w-4" />
                  <span>
                    {receiptFileName ? receiptFileName : "Upload receipt"}
                  </span>
                </div>
                <input
                  id="receipt"
                  type="file"
                  className="hidden"
                  accept="image/*,.pdf"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      onChange(file);
                      setReceiptFileName(file.name);
                    }
                  }}
                />
              </label>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

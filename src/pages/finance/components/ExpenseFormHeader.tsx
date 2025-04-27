import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ExpenseFormHeader() {
  return (
     <div className="flex items-center gap-3">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => navigate("/people/journeys")}
          className="h-8 w-8"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-semibold text-church-primary">Register Expense</h1>
    </div>
  );
}

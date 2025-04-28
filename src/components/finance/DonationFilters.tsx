
import { useState } from "react";
import { X, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type FilterType = "date" | "payment" | "amount" | "status";
type ActiveFilter = {
  type: FilterType;
  label: string;
};

export interface FilterValues {
  startDate?: Date;
  endDate?: Date;
  paymentMethod?: string;
  amount?: string;
  status?: string;
}

interface DonationFiltersProps {
  onFilterChange: (filters: FilterValues) => void;
}

export function DonationFilters({ onFilterChange }: DonationFiltersProps) {
  const [activeFilters, setActiveFilters] = useState<ActiveFilter[]>([]);
  const [filterValues, setFilterValues] = useState<FilterValues>({});

  const availableFilters = [
    { type: "date" as FilterType, label: "Date" },
    { type: "amount" as FilterType, label: "Amount" },
    { type: "status" as FilterType, label: "Status" },
    { type: "payment" as FilterType, label: "Payment Method" },
  ];

  const addFilter = (filter: ActiveFilter) => {
    if (!activeFilters.find(f => f.type === filter.type)) {
      setActiveFilters([...activeFilters, filter]);
    }
  };

  const removeFilter = (filterType: FilterType) => {
    setActiveFilters(activeFilters.filter(f => f.type !== filterType));
    const newValues = { ...filterValues };
    if (filterType === "date") {
      delete newValues.startDate;
      delete newValues.endDate;
    } else if (filterType === "payment") {
      delete newValues.paymentMethod;
    } else if (filterType === "amount") {
      delete newValues.amount;
    } else if (filterType === "status") {
      delete newValues.status;
    }
    setFilterValues(newValues);
    onFilterChange(newValues);
  };

  const updateFilterValue = (type: FilterType, value: any) => {
    const newValues = { ...filterValues, ...value };
    setFilterValues(newValues);
    onFilterChange(newValues);
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      {activeFilters.map((filter) => (
        <div
          key={filter.type}
          className="inline-flex items-center gap-2 bg-white border rounded-full px-3 py-1.5 text-sm"
        >
          <span className="text-muted-foreground">{filter.label}</span>
          {filter.type === "date" && (
            <div className="flex items-center gap-1">
              <span className="text-primary">Starting from</span>
              <DatePicker
                date={filterValues.startDate}
                setDate={(date) =>
                  updateFilterValue("date", { startDate: date })
                }
              />
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </div>
          )}
          
          {filter.type === "amount" && (
            <div className="flex items-center gap-1">
              <span className="text-primary">Less than $6</span>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </div>
          )}

          {filter.type === "status" && (
            <div className="flex items-center gap-1">
              <span className="text-primary">Failed</span>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </div>
          )}
          
          {filter.type === "payment" && (
            <div className="flex items-center gap-1">
              <Select 
                value={filterValues.paymentMethod} 
                onValueChange={(value) => 
                  updateFilterValue("payment", { paymentMethod: value })
                }
              >
                <SelectTrigger className="border-0 p-0 h-auto hover:bg-transparent">
                  <SelectValue placeholder="Select payment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Credit Card">Credit Card</SelectItem>
                  <SelectItem value="Cash">Cash</SelectItem>
                  <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                  <SelectItem value="Check">Check</SelectItem>
                </SelectContent>
              </Select>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </div>
          )}
          
          <Button
            variant="ghost"
            size="sm"
            className="h-4 w-4 p-0 hover:bg-transparent"
            onClick={() => removeFilter(filter.type)}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      ))}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            size="sm" 
            className="rounded-full border-dashed"
          >
            Add Filter
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          {availableFilters
            .filter((filter) => !activeFilters.find(f => f.type === filter.type))
            .map((filter) => (
              <DropdownMenuItem
                key={filter.type}
                onClick={() => addFilter(filter)}
              >
                {filter.label}
              </DropdownMenuItem>
            ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

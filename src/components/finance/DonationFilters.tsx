
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
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        {activeFilters.map((filter) => (
          <div
            key={filter.type}
            className="flex items-center gap-2 bg-white rounded-lg px-3 py-1.5 text-sm border shadow-sm"
          >
            <span className="text-muted-foreground whitespace-nowrap">{filter.label}:</span>
            {filter.type === "date" && (
              <div className="flex items-center gap-2">
                <DatePicker
                  date={filterValues.startDate}
                  setDate={(date) =>
                    updateFilterValue("date", { startDate: date })
                  }
                />
              </div>
            )}
            
            {filter.type === "amount" && (
              <div className="flex items-center gap-1">
                <Select>
                  <SelectTrigger className="h-8 w-[120px] border-none focus:ring-0">
                    <SelectValue placeholder="Select amount" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lt_100">Less than $100</SelectItem>
                    <SelectItem value="100_500">$100 - $500</SelectItem>
                    <SelectItem value="gt_500">More than $500</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {filter.type === "status" && (
              <div className="flex items-center gap-1">
                <Select>
                  <SelectTrigger className="h-8 w-[120px] border-none focus:ring-0">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
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
                  <SelectTrigger className="h-8 w-[120px] border-none focus:ring-0">
                    <SelectValue placeholder="Select payment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Credit Card">Credit Card</SelectItem>
                    <SelectItem value="Cash">Cash</SelectItem>
                    <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                    <SelectItem value="Check">Check</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
            
            <Button
              variant="ghost"
              size="sm"
              className="h-4 w-4 p-0 hover:bg-transparent ml-2"
              onClick={() => removeFilter(filter.type)}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        ))}
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            size="sm"
            className="h-8 px-3 text-sm font-medium"
          >
            Add Filter
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-[180px]">
          {availableFilters
            .filter((filter) => !activeFilters.find(f => f.type === filter.type))
            .map((filter) => (
              <DropdownMenuItem
                key={filter.type}
                onClick={() => addFilter(filter)}
                className="text-sm"
              >
                {filter.label}
              </DropdownMenuItem>
            ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

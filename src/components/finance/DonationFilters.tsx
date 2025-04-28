
import { useState } from "react";
import { X } from "lucide-react";
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

type FilterType = "date" | "payment";
type ActiveFilter = {
  type: FilterType;
  label: string;
};

interface FilterValues {
  startDate?: Date;
  endDate?: Date;
  paymentMethod?: string;
}

interface DonationFiltersProps {
  onFilterChange: (filters: FilterValues) => void;
}

export function DonationFilters({ onFilterChange }: DonationFiltersProps) {
  const [activeFilters, setActiveFilters] = useState<ActiveFilter[]>([]);
  const [filterValues, setFilterValues] = useState<FilterValues>({});

  const availableFilters = [
    { type: "date" as FilterType, label: "Date Range" },
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
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        {activeFilters.map((filter) => (
          <div
            key={filter.type}
            className="flex items-center gap-2 bg-secondary p-2 rounded-lg"
          >
            {filter.type === "date" && (
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Date Range:</span>
                <div className="flex gap-2">
                  <DatePicker
                    date={filterValues.startDate}
                    setDate={(date) =>
                      updateFilterValue("date", { startDate: date })
                    }
                  />
                  <DatePicker
                    date={filterValues.endDate}
                    setDate={(date) => updateFilterValue("date", { endDate: date })}
                  />
                </div>
              </div>
            )}
            
            {filter.type === "payment" && (
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Payment Method:</span>
                <Select 
                  value={filterValues.paymentMethod} 
                  onValueChange={(value) => 
                    updateFilterValue("payment", { paymentMethod: value })
                  }
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select payment method" />
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
              className="h-8 w-8 p-0"
              onClick={() => removeFilter(filter.type)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="ml-auto">
            Add Filter
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
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

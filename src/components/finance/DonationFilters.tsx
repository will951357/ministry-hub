
import React, { useState } from "react";
import { X, Plus, ChevronDown } from "lucide-react";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type FilterType = "date" | "payment" | "amount";

interface FilterOption {
  id: string;
  type: FilterType;
  label: string;
  value: any;
  displayValue?: string;
}

export interface FilterValues {
  startDate?: Date;
  endDate?: Date;
  paymentMethod?: string;
  amount?: string;
  amountCondition?: "lt" | "gt" | "between";
  amountValue?: number;
  amountMax?: number;
}

interface DonationFiltersProps {
  onFilterChange: (filters: FilterValues) => void;
}

export function DonationFilters({ onFilterChange }: DonationFiltersProps) {
  const [activeFilters, setActiveFilters] = useState<FilterOption[]>([]);
  const [filterValues, setFilterValues] = useState<FilterValues>({});

  const availableFilters = [
    { id: "startDate", type: "date" as FilterType, label: "Start Date", description: "Filter donations after this date" },
    { id: "endDate", type: "date" as FilterType, label: "End Date", description: "Filter donations before this date" },
    { id: "payment", type: "payment" as FilterType, label: "Payment Method", description: "Filter by payment method" },
    { id: "amount", type: "amount" as FilterType, label: "Amount", description: "Filter by donation amount" }
  ];
  
  const unusedFilters = availableFilters.filter(
    filter => !activeFilters.some(af => af.id === filter.id)
  );

  const addFilter = (filterId: string) => {
    const filterToAdd = availableFilters.find(f => f.id === filterId);
    if (!filterToAdd) return;
    
    const newFilter: FilterOption = {
      ...filterToAdd,
      value: null
    };
    
    setActiveFilters([...activeFilters, newFilter]);
  };

  const removeFilter = (filterId: string) => {
    setActiveFilters(activeFilters.filter(f => f.id !== filterId));
    
    const newValues = { ...filterValues };
    
    if (filterId === "startDate") delete newValues.startDate;
    if (filterId === "endDate") delete newValues.endDate;
    if (filterId === "payment") delete newValues.paymentMethod;
    if (filterId === "amount") {
      delete newValues.amountCondition;
      delete newValues.amountValue;
      delete newValues.amountMax;
    }
    
    setFilterValues(newValues);
    onFilterChange(newValues);
  };

  const updateFilterValue = (filterId: string, value: any) => {
    // Update active filter display value
    const updatedFilters = activeFilters.map(filter => {
      if (filter.id === filterId) {
        let displayValue = '';
        
        if (filterId === "startDate" || filterId === "endDate") {
          displayValue = format(value, "MMM d, yyyy");
        } else if (filterId === "payment") {
          displayValue = value;
        } else if (filterId === "amount") {
          const { condition, amount, maxAmount } = value;
          if (condition === "lt") {
            displayValue = `< $${amount}`;
          } else if (condition === "gt") {
            displayValue = `> $${amount}`;
          } else if (condition === "between") {
            displayValue = `$${amount} - $${maxAmount}`;
          }
        }
        
        return { ...filter, value, displayValue };
      }
      return filter;
    });
    
    setActiveFilters(updatedFilters);
    
    // Update filter values for filtering data
    const newValues = { ...filterValues };
    
    if (filterId === "startDate") {
      newValues.startDate = value;
    } else if (filterId === "endDate") {
      newValues.endDate = value;
    } else if (filterId === "payment") {
      newValues.paymentMethod = value;
    } else if (filterId === "amount") {
      newValues.amountCondition = value.condition;
      newValues.amountValue = value.amount;
      if (value.condition === "between") {
        newValues.amountMax = value.maxAmount;
      }
    }
    
    setFilterValues(newValues);
    onFilterChange(newValues);
  };

  const renderFilterContent = (filter: FilterOption) => {
    if (filter.type === "date") {
      return (
        <div className="p-2">
          <DatePicker 
            date={filter.id === "startDate" ? filterValues.startDate : filterValues.endDate}
            setDate={(date) => date && updateFilterValue(filter.id, date)} 
          />
        </div>
      );
    }
    
    if (filter.type === "payment") {
      return (
        <div className="p-0">
          <Select 
            value={filterValues.paymentMethod} 
            onValueChange={(value) => updateFilterValue(filter.id, value)}
          >
            <SelectTrigger className="w-[180px] h-9">
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
      );
    }
    
    if (filter.type === "amount") {
      return (
        <div className="p-3 space-y-3">
          <Select 
            value={filterValues.amountCondition || "lt"} 
            onValueChange={(condition: "lt" | "gt" | "between") => {
              const currentValue = filterValues.amountValue || 0;
              const maxValue = filterValues.amountMax || currentValue * 2;
              
              updateFilterValue(filter.id, {
                condition,
                amount: currentValue,
                maxAmount: maxValue
              });
            }}
          >
            <SelectTrigger className="w-[180px] h-9 mb-2">
              <SelectValue placeholder="Condition" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="lt">Less than</SelectItem>
              <SelectItem value="gt">Greater than</SelectItem>
              <SelectItem value="between">Between</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              <span className="text-sm font-medium mr-2">$</span>
              <input 
                type="number" 
                className="w-24 h-9 rounded-md border border-input px-3 py-2 text-sm ring-offset-background"
                value={filterValues.amountValue || ''}
                onChange={(e) => {
                  const amount = parseFloat(e.target.value);
                  updateFilterValue(filter.id, {
                    condition: filterValues.amountCondition || "lt",
                    amount: amount,
                    maxAmount: filterValues.amountMax || amount * 2
                  });
                }}
              />
            </div>
            
            {filterValues.amountCondition === "between" && (
              <>
                <span className="text-sm font-medium">to</span>
                <div className="flex items-center">
                  <span className="text-sm font-medium mr-2">$</span>
                  <input 
                    type="number" 
                    className="w-24 h-9 rounded-md border border-input px-3 py-2 text-sm ring-offset-background"
                    value={filterValues.amountMax || ''}
                    onChange={(e) => {
                      const maxAmount = parseFloat(e.target.value);
                      updateFilterValue(filter.id, {
                        condition: "between",
                        amount: filterValues.amountValue || 0,
                        maxAmount: maxAmount
                      });
                    }}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      );
    }
    
    return null;
  };

  return (
    <div className="flex flex-wrap gap-2 items-center mb-2">
      {activeFilters.map((filter) => (
        <Popover key={filter.id}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="h-7 px-2 py-1 text-xs rounded-full border-muted-foreground/30 bg-background hover:bg-muted"
            >
              <span className="text-muted-foreground mr-1">{filter.label}:</span>
              <span className="font-medium">{filter.displayValue || 'Select...'}</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <div className="p-1">
              <div className="flex items-center justify-between p-2">
                <h4 className="font-medium">{filter.label}</h4>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-6 w-6 p-0"
                  onClick={() => removeFilter(filter.id)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
              {renderFilterContent(filter)}
            </div>
          </PopoverContent>
        </Popover>
      ))}
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            size="sm" 
            className="h-7 border-dashed border-muted-foreground/50 text-muted-foreground hover:text-foreground"
            disabled={unusedFilters.length === 0}
          >
            <Plus className="h-3.5 w-3.5 mr-1" />
            Add filter
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          {unusedFilters.map((filter) => (
            <TooltipProvider key={filter.id}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DropdownMenuItem 
                    className="text-sm cursor-pointer"
                    onClick={() => addFilter(filter.id)}
                  >
                    {filter.label}
                  </DropdownMenuItem>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p className="text-xs">{filter.description}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

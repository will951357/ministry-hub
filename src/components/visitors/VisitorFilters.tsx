
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Filter, Search, Bell } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState } from "react";

type VisitorFiltersProps = {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedCellGroup: string;
  onCellGroupChange: (value: string) => void;
  visitsFilter: number | null;
  onVisitsFilterChange: (value: number | null) => void;
  onSendNotifications: () => void;
  cellGroups: string[];
  selectedVisitorsCount: number;
};

export function VisitorFilters({
  searchTerm,
  onSearchChange,
  selectedCellGroup,
  onCellGroupChange,
  visitsFilter,
  onVisitsFilterChange,
  onSendNotifications,
  cellGroups,
  selectedVisitorsCount
}: VisitorFiltersProps) {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
      <div className="relative flex-1 w-full">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <Input 
          placeholder="Search visitors..." 
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 w-full"
        />
      </div>
      
      <div className="flex gap-2 flex-wrap w-full sm:w-auto">
        <Collapsible 
          open={isFiltersOpen} 
          onOpenChange={setIsFiltersOpen}
          className="w-full sm:w-auto"
        >
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="w-full sm:w-auto">
              <Filter size={16} className="mr-2" />
              Filters
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2 p-4 bg-white border rounded-md shadow-sm w-full sm:w-[300px] absolute z-10">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Cell Group</label>
                <select 
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={selectedCellGroup}
                  onChange={(e) => onCellGroupChange(e.target.value)}
                >
                  {cellGroups.map((group) => (
                    <option key={group} value={group}>{group}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Number of Visits</label>
                <div className="flex flex-wrap gap-2">
                  {[null, 1, 2, 3, 4, 5].map((num) => (
                    <Badge 
                      key={num === null ? 'all' : num}
                      variant={visitsFilter === num ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => onVisitsFilterChange(num)}
                    >
                      {num === null ? 'All' : num}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
        
        <Button 
          onClick={onSendNotifications}
          disabled={selectedVisitorsCount === 0}
          className="w-full sm:w-auto"
        >
          <Bell size={16} className="mr-2" />
          Send Notifications
        </Button>
      </div>
    </div>
  );
}

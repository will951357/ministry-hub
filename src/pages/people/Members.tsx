
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Filter, Plus, Search } from "lucide-react";
import { 
  Popover,
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";

export default function Members() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    status: "all",
    department: "all",
    joinDate: "all"
  });

  // Mock data - in a real app this would come from an API
  const memberStats = {
    total: 247,
    capacity: 500
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-church-primary mb-2">Members</h1>
        <p className="text-church-secondary">
          Manage your church membership - view, add, and update member information.
        </p>
      </div>

      <Card className="p-6 bg-white border-church-border">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-medium text-church-primary">Membership Statistics</h2>
            <div className="mt-2 flex items-center space-x-6">
              <div>
                <p className="text-sm text-church-secondary">Total Members</p>
                <p className="text-2xl font-semibold text-church-primary">{memberStats.total}</p>
              </div>
              <div>
                <p className="text-sm text-church-secondary">Maximum Capacity</p>
                <p className="text-2xl font-semibold text-church-primary">{memberStats.capacity}</p>
              </div>
            </div>
          </div>
          <div className="mt-4 md:mt-0">
            <Button className="bg-church-primary hover:bg-church-accent text-white">
              <Plus className="mr-2 h-4 w-4" />
              Add a new member
            </Button>
          </div>
        </div>
      </Card>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-church-secondary" />
          <Input
            placeholder="Search members..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <span>Filters</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-4">
              <h3 className="font-medium text-church-primary">Filter Members</h3>
              
              <div className="space-y-2">
                <label className="text-sm text-church-secondary">Status</label>
                <select 
                  className="w-full rounded-md border border-church-border p-2 text-church-primary"
                  value={filters.status}
                  onChange={(e) => setFilters({...filters, status: e.target.value})}
                >
                  <option value="all">All</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="pending">Pending</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-church-secondary">Department</label>
                <select 
                  className="w-full rounded-md border border-church-border p-2 text-church-primary"
                  value={filters.department}
                  onChange={(e) => setFilters({...filters, department: e.target.value})}
                >
                  <option value="all">All</option>
                  <option value="worship">Worship</option>
                  <option value="children">Children</option>
                  <option value="youth">Youth</option>
                  <option value="hospitality">Hospitality</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-church-secondary">Joined Date</label>
                <select 
                  className="w-full rounded-md border border-church-border p-2 text-church-primary"
                  value={filters.joinDate}
                  onChange={(e) => setFilters({...filters, joinDate: e.target.value})}
                >
                  <option value="all">All Time</option>
                  <option value="last30">Last 30 Days</option>
                  <option value="last90">Last 90 Days</option>
                  <option value="lastyear">Last Year</option>
                </select>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setFilters({
                  status: "all",
                  department: "all",
                  joinDate: "all"
                })}>
                  Reset
                </Button>
                <Button className="bg-church-primary hover:bg-church-accent text-white">
                  Apply Filters
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Member list table placeholder */}
      <Card className="p-6 bg-white border-church-border">
        <p className="text-church-secondary text-center py-10">
          Member list will be displayed here.
        </p>
      </Card>
    </div>
  );
}

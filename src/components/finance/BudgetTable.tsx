
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit2, Save, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface BudgetTableProps {
  selectedMonth: string;
}

interface BudgetItem {
  id: string;
  category: string;
  ministry: string;
  budgetAmount: number;
  actualAmount: number;
  isEditing?: boolean;
}

export function BudgetTable({ selectedMonth }: BudgetTableProps) {
  const [budgetItems, setBudgetItems] = useState<BudgetItem[]>([
    { 
      id: "1", 
      category: "Worship", 
      ministry: "Worship Team", 
      budgetAmount: 9000, 
      actualAmount: 8430 
    },
    { 
      id: "2", 
      category: "Missions", 
      ministry: "Local Outreach", 
      budgetAmount: 5000, 
      actualAmount: 6200 
    },
    { 
      id: "3", 
      category: "Missions", 
      ministry: "Global Missions", 
      budgetAmount: 5000, 
      actualAmount: 6450 
    },
    { 
      id: "4", 
      category: "Building", 
      ministry: "Facilities", 
      budgetAmount: 12000, 
      actualAmount: 9830 
    },
    { 
      id: "5", 
      category: "Admin", 
      ministry: "Office Expenses", 
      budgetAmount: 5000, 
      actualAmount: 4300 
    },
    { 
      id: "6", 
      category: "Youth", 
      ministry: "Youth Ministry", 
      budgetAmount: 3000, 
      actualAmount: 2800 
    },
    { 
      id: "7", 
      category: "Kids", 
      ministry: "Children's Ministry", 
      budgetAmount: 2500, 
      actualAmount: 2200 
    },
  ]);

  const toggleEdit = (id: string) => {
    setBudgetItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, isEditing: !item.isEditing } : item
      )
    );
  };

  const handleUpdate = (id: string, field: keyof BudgetItem, value: string | number) => {
    setBudgetItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const getVariance = (budgeted: number, actual: number) => {
    const variance = budgeted - actual;
    const percentageUsed = (actual / budgeted) * 100;
    
    return {
      value: variance,
      percent: percentageUsed,
      isOverBudget: variance < 0
    };
  };

  const getTotalBudgeted = () => {
    return budgetItems.reduce((sum, item) => sum + item.budgetAmount, 0);
  };

  const getTotalActual = () => {
    return budgetItems.reduce((sum, item) => sum + item.actualAmount, 0);
  };

  const formatMonth = (monthStr: string) => {
    const [month, year] = monthStr.split('-');
    return `${month.charAt(0).toUpperCase() + month.slice(1)} ${year}`;
  };

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[240px]">Category</TableHead>
              <TableHead className="w-[240px]">Ministry</TableHead>
              <TableHead className="text-right">Budget Amount</TableHead>
              <TableHead className="text-right">Actual Amount</TableHead>
              <TableHead className="text-right">Variance</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {budgetItems.map((item) => {
              const variance = getVariance(item.budgetAmount, item.actualAmount);
              
              return (
                <TableRow key={item.id}>
                  <TableCell>
                    {item.isEditing ? (
                      <Input 
                        value={item.category} 
                        onChange={(e) => handleUpdate(item.id, "category", e.target.value)}
                        className="h-8" 
                      />
                    ) : (
                      <div className="flex items-center">
                        <Badge className={`
                          ${item.category === "Worship" ? "bg-blue-500" : ""}
                          ${item.category === "Missions" ? "bg-green-500" : ""}
                          ${item.category === "Building" ? "bg-orange-500" : ""}
                          ${item.category === "Admin" ? "bg-purple-500" : ""}
                          ${item.category === "Youth" ? "bg-pink-500" : ""}
                          ${item.category === "Kids" ? "bg-yellow-500" : ""}
                        `}>
                          {item.category}
                        </Badge>
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    {item.isEditing ? (
                      <Input 
                        value={item.ministry} 
                        onChange={(e) => handleUpdate(item.id, "ministry", e.target.value)}
                        className="h-8" 
                      />
                    ) : (
                      item.ministry
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    {item.isEditing ? (
                      <Input 
                        type="number"
                        value={item.budgetAmount} 
                        onChange={(e) => handleUpdate(item.id, "budgetAmount", Number(e.target.value))}
                        className="h-8 text-right" 
                      />
                    ) : (
                      `$${item.budgetAmount.toLocaleString()}`
                    )}
                  </TableCell>
                  <TableCell className="text-right">${item.actualAmount.toLocaleString()}</TableCell>
                  <TableCell className="text-right">
                    <div className={cn(
                      "inline-flex items-center",
                      variance.isOverBudget ? "text-red-600" : "text-green-600"
                    )}>
                      <span>${Math.abs(variance.value).toLocaleString()}</span>
                      <span className="ml-2 text-xs">
                        ({variance.percent.toFixed(0)}% used)
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center gap-2">
                      {item.isEditing ? (
                        <Button size="sm" variant="ghost" onClick={() => toggleEdit(item.id)}>
                          <Save className="h-4 w-4" />
                        </Button>
                      ) : (
                        <Button size="sm" variant="ghost" onClick={() => toggleEdit(item.id)}>
                          <Edit2 className="h-4 w-4" />
                        </Button>
                      )}
                      <Button size="sm" variant="ghost" className="text-red-500">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
            <TableRow className="font-medium bg-muted/50">
              <TableCell colSpan={2}>Total for {formatMonth(selectedMonth)}</TableCell>
              <TableCell className="text-right">${getTotalBudgeted().toLocaleString()}</TableCell>
              <TableCell className="text-right">${getTotalActual().toLocaleString()}</TableCell>
              <TableCell className="text-right">
                <div className={cn(
                  "inline-flex items-center",
                  getTotalBudgeted() - getTotalActual() < 0 ? "text-red-600" : "text-green-600"
                )}>
                  ${Math.abs(getTotalBudgeted() - getTotalActual()).toLocaleString()}
                </div>
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-end">
        <Button size="sm" className="ml-auto">
          Save Budget
        </Button>
      </div>
    </div>
  );
}

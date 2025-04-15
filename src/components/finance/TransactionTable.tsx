
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

// Mock data for transactions
const transactions = [
  {
    id: "TR-1234",
    date: "2025-04-12",
    description: "Weekly Tithe - Johnson Family",
    amount: 350.00,
    type: "income",
    category: "Tithes",
  },
  {
    id: "TR-1235",
    date: "2025-04-11",
    description: "Missions Fund Donation",
    amount: 1200.00,
    type: "income",
    category: "Missions",
  },
  {
    id: "TR-1236",
    date: "2025-04-10",
    description: "Salary - Pastor Williams",
    amount: 3200.00,
    type: "expense",
    category: "Admin",
  },
  {
    id: "TR-1237",
    date: "2025-04-09",
    description: "Utility Bill - Electricity",
    amount: 450.00,
    type: "expense",
    category: "Building",
  },
  {
    id: "TR-1238",
    date: "2025-04-08",
    description: "Sound Equipment Purchase",
    amount: 1250.00,
    type: "expense",
    category: "Worship",
  },
  {
    id: "TR-1239",
    date: "2025-04-07",
    description: "Special Offering - Building Fund",
    amount: 2750.00,
    type: "income",
    category: "Building",
  },
  {
    id: "TR-1240",
    date: "2025-04-06",
    description: "Sunday School Materials",
    amount: 320.00,
    type: "expense",
    category: "Education",
  },
  {
    id: "TR-1241",
    date: "2025-04-05",
    description: "Youth Retreat Registration Fees",
    amount: 1500.00,
    type: "income",
    category: "Youth",
  },
];

export function TransactionTable() {
  // Function to format date to a more readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell className="font-medium">{formatDate(transaction.date)}</TableCell>
              <TableCell>{transaction.description}</TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={
                    transaction.category === "Worship" ? "border-blue-500 text-blue-500" :
                    transaction.category === "Missions" ? "border-green-500 text-green-500" :
                    transaction.category === "Building" ? "border-orange-500 text-orange-500" :
                    transaction.category === "Admin" ? "border-purple-500 text-purple-500" :
                    transaction.category === "Tithes" ? "border-teal-500 text-teal-500" :
                    transaction.category === "Education" ? "border-indigo-500 text-indigo-500" :
                    transaction.category === "Youth" ? "border-yellow-500 text-yellow-500" :
                    "border-gray-500 text-gray-500"
                  }
                >
                  {transaction.category}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge
                  className={
                    transaction.type === "income" ? "bg-green-500" : "bg-red-500"
                  }
                >
                  {transaction.type === "income" ? "Income" : "Expense"}
                </Badge>
              </TableCell>
              <TableCell className="text-right font-medium">
                <span className={transaction.type === "income" ? "text-green-600" : "text-red-600"}>
                  {transaction.type === "income" ? "+" : "-"}${transaction.amount.toFixed(2)}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

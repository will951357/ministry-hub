
import { TitheRecord } from "@/data/tithes";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

interface TitheTableProps {
  records: TitheRecord[];
  status?: 'consistent' | 'irregular' | 'new';
}

export function TitheTable({ records, status }: TitheTableProps) {
  const filteredRecords = status 
    ? records.filter(record => record.status === status)
    : records;

  const formatDate = (dateStr: string) => {
    return format(new Date(dateStr), 'MMM d, yyyy');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'consistent':
        return 'bg-green-500';
      case 'irregular':
        return 'bg-yellow-500';
      case 'new':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Member</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Frequency</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Last Tithe</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredRecords.map((record) => (
          <TableRow key={record.id}>
            <TableCell className="font-medium">{record.memberName}</TableCell>
            <TableCell>${record.amount.toFixed(2)}</TableCell>
            <TableCell>{formatDate(record.date)}</TableCell>
            <TableCell className="capitalize">{record.frequency}</TableCell>
            <TableCell>
              <Badge className={getStatusColor(record.status)}>
                {record.status}
              </Badge>
            </TableCell>
            <TableCell>
              {record.lastTithe ? formatDate(record.lastTithe) : 'New Member'}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

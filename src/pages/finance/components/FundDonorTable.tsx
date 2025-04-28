
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FundDonation } from "@/data/fundDonations";

interface FundDonorTableProps {
  donations: FundDonation[];
}

export function FundDonorTable({ donations }: FundDonorTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Donor</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {donations.length === 0 ? (
          <TableRow>
            <TableCell colSpan={3} className="text-center py-4 text-muted-foreground">
              No donations found for this fund.
            </TableCell>
          </TableRow>
        ) : (
          donations.map((donation) => (
            <TableRow key={donation.id}>
              <TableCell>{format(new Date(donation.date), 'MMM d, yyyy')}</TableCell>
              <TableCell className="font-medium">{donation.donorName}</TableCell>
              <TableCell className="text-right">${donation.amount.toLocaleString()}</TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}

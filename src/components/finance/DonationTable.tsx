
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Donation } from "@/data/donations";

interface DonationTableProps {
  donations: Donation[];
}

export function DonationTable({ donations }: DonationTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Donor</TableHead>
          <TableHead>Type</TableHead>
          <TableHead className="text-right">Amount</TableHead>
          <TableHead>Fund</TableHead>
          <TableHead>Payment Method</TableHead>
          <TableHead>Observation</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {donations.map((donation) => (
          <TableRow key={donation.id}>
            <TableCell>{format(new Date(donation.date), 'MMM d, yyyy')}</TableCell>
            <TableCell className="font-medium">{donation.donor}</TableCell>
            <TableCell className="capitalize">{donation.donorType}</TableCell>
            <TableCell className="text-right">${donation.amount.toFixed(2)}</TableCell>
            <TableCell>{donation.fund}</TableCell>
            <TableCell>{donation.paymentMethod}</TableCell>
            <TableCell>{donation.observation || '-'}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

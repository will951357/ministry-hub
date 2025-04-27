
import { format } from "date-fns";

export interface Donation {
  id: string;
  donor: string;
  donorType: 'member' | 'visitor' | 'institution';
  amount: number;
  fund: string;
  paymentMethod: string;
  date: string;
  observation?: string;
}

export const mockDonations: Donation[] = [
  {
    id: '1',
    donor: 'John Smith',
    donorType: 'member',
    amount: 500.00,
    fund: 'General',
    paymentMethod: 'Credit Card',
    date: '2024-04-20',
    observation: 'Monthly donation'
  },
  {
    id: '2',
    donor: 'Grace Community Church',
    donorType: 'institution',
    amount: 2500.00,
    fund: 'Building',
    paymentMethod: 'Bank Transfer',
    date: '2024-04-19'
  },
  {
    id: '3',
    donor: 'Mary Johnson',
    donorType: 'visitor',
    amount: 100.00,
    fund: 'Missions',
    paymentMethod: 'Cash',
    date: '2024-04-18',
    observation: 'First time visitor'
  },
  {
    id: '4',
    donor: 'Robert Wilson',
    donorType: 'member',
    amount: 750.00,
    fund: 'Youth Ministry',
    paymentMethod: 'Credit Card',
    date: '2024-04-17'
  },
  {
    id: '5',
    donor: 'Local Business Association',
    donorType: 'institution',
    amount: 1000.00,
    fund: 'Community Outreach',
    paymentMethod: 'Check',
    date: '2024-04-16'
  }
];

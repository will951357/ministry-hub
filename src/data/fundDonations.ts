
export interface FundDonation {
  id: string;
  fundId: number;
  donorId: string;
  donorName: string;
  amount: number;
  date: string;
}

// Generate some mock data for fund donations
export const mockFundDonations: FundDonation[] = [
  // Building Fund (ID: 1)
  {
    id: "fd-001",
    fundId: 1,
    donorId: "user-001",
    donorName: "John Smith",
    amount: 5000,
    date: "2024-04-20"
  },
  {
    id: "fd-002",
    fundId: 1,
    donorId: "user-002",
    donorName: "Grace Community Church",
    amount: 25000,
    date: "2024-04-15"
  },
  {
    id: "fd-003",
    fundId: 1,
    donorId: "user-003",
    donorName: "Robert Wilson",
    amount: 7500,
    date: "2024-04-10"
  },
  {
    id: "fd-004",
    fundId: 1,
    donorId: "user-004",
    donorName: "Emily Johnson",
    amount: 1000,
    date: "2024-04-05"
  },
  {
    id: "fd-005",
    fundId: 1,
    donorId: "user-005",
    donorName: "Michael Chang",
    amount: 500,
    date: "2024-04-01"
  },
  {
    id: "fd-006",
    fundId: 1,
    donorId: "user-006",
    donorName: "Sarah Williams",
    amount: 2500,
    date: "2024-03-25"
  },
  {
    id: "fd-007",
    fundId: 1,
    donorId: "user-007",
    donorName: "David Rodriguez",
    amount: 10000,
    date: "2024-03-20"
  },
  
  // Mission Trip (ID: 2)
  {
    id: "fd-008",
    fundId: 2,
    donorId: "user-008",
    donorName: "James Wilson",
    amount: 300,
    date: "2024-04-18"
  },
  {
    id: "fd-009",
    fundId: 2,
    donorId: "user-009",
    donorName: "Linda Martinez",
    amount: 500,
    date: "2024-04-12"
  },
  {
    id: "fd-010",
    fundId: 2,
    donorId: "user-010",
    donorName: "Thomas Brown",
    amount: 250,
    date: "2024-04-05"
  },
  {
    id: "fd-011",
    fundId: 2,
    donorId: "user-001",
    donorName: "John Smith",
    amount: 1000,
    date: "2024-03-28"
  },
  
  // Youth Ministry (ID: 3)
  {
    id: "fd-012",
    fundId: 3,
    donorId: "user-012",
    donorName: "Patricia Garcia",
    amount: 750,
    date: "2024-04-19"
  },
  {
    id: "fd-013",
    fundId: 3,
    donorId: "user-013",
    donorName: "Christopher Lee",
    amount: 500,
    date: "2024-04-10"
  },
  {
    id: "fd-014",
    fundId: 3,
    donorId: "user-014",
    donorName: "Jennifer White",
    amount: 250,
    date: "2024-04-03"
  },
  
  // Christmas Outreach (ID: 4)
  {
    id: "fd-015",
    fundId: 4,
    donorId: "user-015",
    donorName: "Elizabeth Taylor",
    amount: 500,
    date: "2024-04-17"
  },
  {
    id: "fd-016",
    fundId: 4,
    donorId: "user-016",
    donorName: "Daniel Martinez",
    amount: 250,
    date: "2024-04-10"
  }
];

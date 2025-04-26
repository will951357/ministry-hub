
export interface TitheRecord {
  id: string;
  memberName: string;
  amount: number;
  date: string;
  frequency: 'weekly' | 'monthly' | 'quarterly' | 'yearly' | 'one-time';
  status: 'consistent' | 'irregular' | 'new';
  lastTithe?: string;
}

export const titheRecords: TitheRecord[] = [
  {
    id: "T1",
    memberName: "John & Sarah Peterson",
    amount: 850.00,
    date: "2025-04-20",
    frequency: "monthly",
    status: "consistent",
    lastTithe: "2025-03-20"
  },
  {
    id: "T2",
    memberName: "Michael Thompson",
    amount: 200.00,
    date: "2025-04-19",
    frequency: "weekly",
    status: "consistent",
    lastTithe: "2025-04-12"
  },
  {
    id: "T3",
    memberName: "Rebecca Wilson",
    amount: 1500.00,
    date: "2025-04-15",
    frequency: "quarterly",
    status: "consistent",
    lastTithe: "2025-01-15"
  },
  {
    id: "T4",
    memberName: "David & Maria Garcia",
    amount: 300.00,
    date: "2025-04-14",
    frequency: "monthly",
    status: "irregular",
    lastTithe: "2025-02-10"
  },
  {
    id: "T5",
    memberName: "Emily Johnson",
    amount: 150.00,
    date: "2025-04-13",
    frequency: "weekly",
    status: "new"
  },
  {
    id: "T6",
    memberName: "Robert & Lisa Anderson",
    amount: 600.00,
    date: "2025-04-12",
    frequency: "monthly",
    status: "consistent",
    lastTithe: "2025-03-12"
  },
  {
    id: "T7",
    memberName: "James Williams",
    amount: 2000.00,
    date: "2025-04-10",
    frequency: "yearly",
    status: "consistent",
    lastTithe: "2024-04-10"
  },
  {
    id: "T8",
    memberName: "Patricia Martinez",
    amount: 250.00,
    date: "2025-04-07",
    frequency: "monthly",
    status: "irregular",
    lastTithe: "2025-02-15"
  },
  {
    id: "T9",
    memberName: "Christopher Lee",
    amount: 175.00,
    date: "2025-04-05",
    frequency: "weekly",
    status: "new"
  },
  {
    id: "T10",
    memberName: "Jennifer & Paul Brown",
    amount: 400.00,
    date: "2025-04-01",
    frequency: "monthly",
    status: "consistent",
    lastTithe: "2025-03-01"
  }
];

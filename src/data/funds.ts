
export interface Fund {
  id: number;
  name: string;
  description?: string;
  current: number;
  goal: number;
  progress: number;
  status: "active" | "upcoming" | "completed" | "archived";
  ministry?: string;
  startDate?: string;
  endDate?: string;
}

export const funds: Fund[] = [
  {
    id: 1,
    name: "Building Fund",
    description: "This fund supports the renovation and expansion of our church facilities to better serve our growing congregation.",
    current: 245600,
    goal: 500000,
    progress: 49,
    status: "active",
    ministry: "General",
    startDate: "2023-12-01"
  },
  {
    id: 2,
    name: "Mission Trip",
    description: "Supporting our international mission trips to serve communities in need around the world.",
    current: 12300,
    goal: 25000,
    progress: 49,
    status: "active",
    ministry: "Missions",
    startDate: "2024-01-15",
    endDate: "2024-08-30"
  },
  {
    id: 3,
    name: "Youth Ministry",
    description: "Resources for youth programs, events, and developing future church leaders.",
    current: 8750,
    goal: 10000,
    progress: 87.5,
    status: "active",
    ministry: "Youth",
    startDate: "2024-02-01"
  },
  {
    id: 4,
    name: "Christmas Outreach",
    description: "Annual holiday outreach program providing meals and gifts to families in need.",
    current: 5000,
    goal: 15000,
    progress: 33.3,
    status: "upcoming",
    ministry: "Outreach",
    startDate: "2024-09-01",
    endDate: "2024-12-25"
  }
];

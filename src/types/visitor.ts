
export type VisitMethod = "app" | "in-person";

export type Visitor = {
  id: string;
  name: string;
  phone: string;
  email: string;
  lastVisit: string;
  visits: number;
  cellGroup: string;
  visitMethod: VisitMethod;
};

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Visitor } from "@/types/visitor";
import { AtSign, Building, Calendar, CheckSquare, Phone, Smartphone, Square } from "lucide-react";
import { Card } from "@/components/ui/card";
type VisitorTableProps = {
  visitors: Visitor[];
  selectedVisitors: string[];
  onSelectVisitor: (id: string) => void;
  onSelectAll: () => void;
};
export function VisitorTable({
  visitors,
  selectedVisitors,
  onSelectVisitor,
  onSelectAll
}: VisitorTableProps) {
  const areAllSelected = visitors.length > 0 && selectedVisitors.length === visitors.length;
  return <>
      

      <Card className="overflow-hidden">
        <div className="w-full overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10">
                  <Button variant="ghost" size="sm" className="p-0 h-6 w-6" onClick={onSelectAll}>
                    {areAllSelected ? <CheckSquare className="h-5 w-5 text-church-primary" /> : <Square className="h-5 w-5 text-gray-400" />}
                  </Button>
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="hidden md:table-cell">Phone</TableHead>
                <TableHead className="hidden md:table-cell">Email</TableHead>
                <TableHead>Last Visit</TableHead>
                <TableHead className="hidden lg:table-cell">Cell Group</TableHead>
                <TableHead className="hidden lg:table-cell">Visits</TableHead>
                <TableHead>Visit Method</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {visitors.length === 0 ? <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                    No visitors found matching your search criteria.
                  </TableCell>
                </TableRow> : visitors.map(visitor => <TableRow key={visitor.id}>
                    <TableCell>
                      <Button variant="ghost" size="sm" className="p-0 h-6 w-6" onClick={() => onSelectVisitor(visitor.id)}>
                        {selectedVisitors.includes(visitor.id) ? <CheckSquare className="h-5 w-5 text-church-primary" /> : <Square className="h-5 w-5 text-gray-400" />}
                      </Button>
                    </TableCell>
                    <TableCell className="font-medium">{visitor.name}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      <span className="flex items-center">
                        <Phone size={14} className="mr-1 text-gray-400" />
                        {visitor.phone}
                      </span>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <span className="flex items-center">
                        <AtSign size={14} className="mr-1 text-gray-400" />
                        {visitor.email}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="flex items-center">
                        <Calendar size={14} className="mr-1 text-gray-400" />
                        {new Date(visitor.lastVisit).toLocaleDateString()}
                      </span>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <Badge variant="outline">{visitor.cellGroup}</Badge>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <Badge>{visitor.visits}</Badge>
                    </TableCell>
                    <TableCell>
                      {visitor.visitMethod === "app" ? <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
                          <Smartphone size={14} className="mr-1" />
                          App
                        </Badge> : <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                          <Building size={14} className="mr-1" />
                          In Person
                        </Badge>}
                    </TableCell>
                  </TableRow>)}
            </TableBody>
          </Table>
        </div>
      </Card>
    </>;
}
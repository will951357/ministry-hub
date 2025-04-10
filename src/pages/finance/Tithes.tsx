
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { BadgeDollarSign, Download, Filter, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

export default function Tithes() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tithes</h1>
          <p className="text-muted-foreground">
            Track and monitor tithe contributions
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button>
            <BadgeDollarSign className="h-4 w-4 mr-2" />
            Record Tithe
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Tithing Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">186</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">+12</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Monthly Tithe Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$18,450.00</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">+5.2%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Yearly Tithe Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$187,320.00</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">+15.8%</span> from last year
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Consistency Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <Progress value={78} className="h-2 mt-2" />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tithe Tracking</CardTitle>
          <CardDescription>Monitor tithe contributions and consistency</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Members</TabsTrigger>
              <TabsTrigger value="consistent">Consistent</TabsTrigger>
              <TabsTrigger value="irregular">Irregular</TabsTrigger>
              <TabsTrigger value="new">New Tithers</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <div className="rounded-md border">
                <div className="p-4">
                  <div className="flex items-center justify-center">
                    <Users className="h-8 w-8 text-muted-foreground mr-2" />
                    <p className="text-center text-muted-foreground">
                      Select filters to view tithe records
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="consistent">
              <div className="rounded-md border">
                <div className="p-4">
                  <p className="text-center text-muted-foreground py-6">
                    No consistent tithers to display.
                  </p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="irregular">
              <div className="rounded-md border">
                <div className="p-4">
                  <p className="text-center text-muted-foreground py-6">
                    No irregular tithers to display.
                  </p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="new">
              <div className="rounded-md border">
                <div className="p-4">
                  <p className="text-center text-muted-foreground py-6">
                    No new tithers to display.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}


import { useState } from "react";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { FileText, QrCode } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface Session {
  title: string;
  description: string;
  sessionDate: Date;
  files: string[];
  qrCodeData?: string;
}

interface ClassSessionsTabProps {
  classId: string;
  sessions: Session[];
  setSessions: React.Dispatch<React.SetStateAction<Session[]>>;
}

export const ClassSessionsTab = ({ classId, sessions, setSessions }: ClassSessionsTabProps) => {
  const [qrDialogOpen, setQrDialogOpen] = useState(false);
  const [currentSessionIndex, setCurrentSessionIndex] = useState<number | null>(null);

  const sessionForm = useForm({
    defaultValues: {
      title: "",
      description: "",
      sessionDate: new Date(),
      files: null as unknown as FileList
    }
  });

  const formatDate = (dateString: string | Date) => {
    return format(new Date(dateString), "PPP");
  };

  const handleAddSession = (data: any) => {
    const sessionDate = data.sessionDate;
    const formattedDate = sessionDate.toISOString().split('T')[0];
    const qrCodeData = `class-${classId}-session-${sessions.length + 1}-${formattedDate}`;
    
    const newSession = {
      title: data.title,
      description: data.description,
      sessionDate: data.sessionDate,
      files: data.files ? Array.from(data.files).map((file: any) => file.name) : [],
      qrCodeData: qrCodeData
    };
    
    setSessions([...sessions, newSession]);
    sessionForm.reset();
    toast.success("Session added successfully");
  };

  const showQRCode = (index: number) => {
    setCurrentSessionIndex(index);
    setQrDialogOpen(true);
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Class Sessions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Form {...sessionForm}>
            <form onSubmit={sessionForm.handleSubmit(handleAddSession)} className="space-y-4 border rounded-md p-4 bg-muted/30">
              <h3 className="font-medium">Add Class Session</h3>
              
              <FormField
                control={sessionForm.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Session Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter session title" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={sessionForm.control}
                name="sessionDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Session Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                          className={cn("p-3 pointer-events-auto")}
                        />
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                )}
              />
              
              <FormField
                control={sessionForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Summary</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Summarize the class session" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={sessionForm.control}
                name="files"
                render={({ field: { value, onChange, ...field } }) => (
                  <FormItem>
                    <FormLabel>Supporting Materials</FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-2">
                        <Input 
                          type="file" 
                          multiple 
                          onChange={(e) => onChange(e.target.files)}
                          {...field}
                        />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <div className="pt-2 flex justify-end">
                <Button type="submit">Add Session</Button>
              </div>
            </form>
          </Form>
          
          {sessions.length > 0 ? (
            <div>
              <h3 className="font-medium mb-3">Scheduled Sessions</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Summary</TableHead>
                    <TableHead>Supporting Files</TableHead>
                    <TableHead>Attendance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sessions.map((session, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{session.title}</TableCell>
                      <TableCell>{formatDate(session.sessionDate)}</TableCell>
                      <TableCell>{session.description}</TableCell>
                      <TableCell>
                        {session.files.length > 0 ? (
                          <div className="flex flex-wrap gap-1">
                            {session.files.map((file, i) => (
                              <Badge key={i} variant="outline" className="flex items-center gap-1">
                                <FileText className="h-3 w-3" />
                                {file}
                              </Badge>
                            ))}
                          </div>
                        ) : (
                          <span className="text-muted-foreground">No files</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => showQRCode(index)}
                          className="flex items-center gap-1"
                        >
                          <QrCode className="h-4 w-4" />
                          QR Attendance
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <p>No sessions added yet.</p>
              <p className="text-sm">Use the form above to schedule a session.</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={qrDialogOpen} onOpenChange={setQrDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Scan for Attendance</DialogTitle>
          </DialogHeader>
          
          {currentSessionIndex !== null && sessions[currentSessionIndex] && (
            <div className="flex flex-col items-center space-y-4">
              <div className="border-4 border-primary p-2 rounded-lg">
                <div className="bg-white p-4 rounded">
                  {/* In a real app, this would be a generated QR code */}
                  <div className="bg-[#000] text-white p-8 text-center">
                    <QrCode className="h-32 w-32 mx-auto" />
                    <p className="mt-2 text-xs">QR code for {sessions[currentSessionIndex].title}</p>
                  </div>
                </div>
              </div>
              <div className="text-center text-sm text-muted-foreground">
                <p>Students can scan this QR code to mark their attendance</p>
                <p className="mt-2">Session: {sessions[currentSessionIndex].title}</p>
                <p>Date: {format(sessions[currentSessionIndex].sessionDate, "PPP")}</p>
              </div>
              <Button 
                className="w-full mt-2" 
                onClick={() => {
                  toast.success("Attendance tracking activated. Students can now scan the QR code.");
                }}
              >
                <QrCode className="h-4 w-4 mr-2" />
                Activate QR Code
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

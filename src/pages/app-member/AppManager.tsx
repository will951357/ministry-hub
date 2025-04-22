import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { 
  Search,
  Save, 
  SendHorizontal, 
  Smartphone, 
  Box, 
  Link as LinkIcon, 
  Video, 
  Music, 
  Image, 
  FileText, 
  Calendar, 
  ListTodo, 
  Crown, 
  BadgeDollarSign,
  SlidersHorizontal,
  MessagesSquare,
  GripVertical,
  Trash2,
  X,
  Edit,
  Check,
  Type
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type WidgetType = 
  | "container"
  | "link"
  | "video"
  | "audio"
  | "photo"
  | "media"
  | "form"
  | "event"
  | "upcomingEvents"
  | "calendar"
  | "article"
  | "text";

interface Widget {
  id: string;
  type: WidgetType;
  content: any;
}

interface Row {
  id: string;
  widgets: Widget[];
}

const widgetTypes: { type: WidgetType; label: string; icon: React.ReactNode; featured?: boolean }[] = [
  { type: "container", label: "Container", icon: <Box size={18} /> },
  { type: "link", label: "Link", icon: <LinkIcon size={18} /> },
  { type: "video", label: "Video", icon: <Video size={18} /> },
  { type: "audio", label: "Audio", icon: <Music size={18} /> },
  { type: "photo", label: "Photos", icon: <Image size={18} /> },
  { type: "media", label: "Media", icon: <FileText size={18} />, featured: true },
  { type: "form", label: "Form", icon: <MessagesSquare size={18} /> },
  { type: "event", label: "Event", icon: <Calendar size={18} /> },
  { type: "upcomingEvents", label: "Upcoming Events", icon: <ListTodo size={18} /> },
  { type: "calendar", label: "Calendar", icon: <Calendar size={18} /> },
  { type: "article", label: "Article", icon: <FileText size={18} /> },
  { type: "text", label: "Text", icon: <Type size={18} /> },
];

const upcomingEvents = [
  {
    id: 1,
    title: "Sunday Worship Service",
    date: "Sun 24 Apr 2025",
    startTime: "09:30 AM",
    endTime: "11:30 AM",
    status: "available",
    spots: 125,
    color: "#9b87f5"
  },
  {
    id: 2,
    title: "Bible Study Group",
    date: "Wed 27 Apr 2025",
    startTime: "06:30 PM",
    endTime: "08:00 PM",
    status: "available",
    spots: 35,
    color: "#0EA5E9"
  },
  {
    id: 3,
    title: "Youth Gathering",
    date: "Fri 29 Apr 2025",
    startTime: "07:00 PM",
    endTime: "09:30 PM",
    status: "booked",
    color: "#F97316"
  }
];

export default function AppManager() {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center bg-church-background">
        <div className="bg-white rounded-lg shadow p-8 text-center max-w-xs w-full">
          <Smartphone size={36} className="mx-auto text-church-accent mb-4" />
          <h2 className="text-xl font-semibold mb-2">Desktop Only</h2>
          <p className="text-muted-foreground">
            This page is only available on desktop.<br />
            Please access it from a larger screen to continue.
          </p>
        </div>
      </div>
    );
  }

  const [rows, setRows] = useState<Row[]>([
    { id: "row-1", widgets: [] },
    { id: "row-2", widgets: [] },
    { id: "row-3", widgets: [] },
  ]);
  
  const { toast } = useToast();
  const [draggingWidget, setDraggingWidget] = useState<WidgetType | null>(null);
  const [activeRow, setActiveRow] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedWidget, setSelectedWidget] = useState<string | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentEditWidget, setCurrentEditWidget] = useState<{rowId: string, widget: Widget} | null>(null);
  const [selectedPage, setSelectedPage] = useState("home");

  const filteredWidgets = searchQuery 
    ? widgetTypes.filter(widget => 
        widget.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : widgetTypes;

  const handleDragStart = (type: WidgetType) => {
    setDraggingWidget(type);
  };

  const handleDragOver = (e: React.DragEvent, rowId: string) => {
    e.preventDefault();
    if (activeRow !== rowId) {
      setActiveRow(rowId);
    }
  };

  const handleDrop = (e: React.DragEvent, rowId: string) => {
    e.preventDefault();
    setActiveRow(null);
    
    if (draggingWidget) {
      const updatedRows = rows.map(row => {
        if (row.id === rowId) {
          return {
            ...row,
            widgets: [...row.widgets, {
              id: `widget-${row.widgets.length + 1}-${Date.now()}`,
              type: draggingWidget,
              content: getDefaultContent(draggingWidget)
            }]
          };
        }
        return row;
      });
      
      setRows(updatedRows);
      setDraggingWidget(null);
      
      toast({
        title: "Widget Added",
        description: `Added ${draggingWidget} widget to the layout.`,
      });
    }
  };

  const getDefaultContent = (type: WidgetType) => {
    switch (type) {
      case "text":
        return { title: "Welcome", text: "Add your text here. This text can be edited to display important information to your members." };
      case "container":
        return { title: "New Container" };
      case "link":
        return { text: "Learn More", url: "#" };
      case "upcomingEvents":
        return { events: upcomingEvents, title: "Upcoming Events" };
      default:
        return { title: `New ${type}` };
    }
  };

  const handleSaveLayout = () => {
    console.log("Saving layout:", rows);
    toast({
      title: "Layout Saved",
      description: "Your app layout has been saved as a draft.",
    });
  };

  const handlePublishLayout = () => {
    console.log("Publishing layout:", rows);
    toast({
      title: "Layout Published",
      description: "Your app layout is now live for all members!",
    });
  };

  const handleDeleteWidget = (rowId: string, widgetId: string) => {
    const updatedRows = rows.map(row => {
      if (row.id === rowId) {
        return {
          ...row,
          widgets: row.widgets.filter(widget => widget.id !== widgetId)
        };
      }
      return row;
    });
    
    setRows(updatedRows);
    setSelectedWidget(null);
    
    toast({
      title: "Widget Removed",
      description: "The widget has been removed from the layout.",
    });
  };

  const handleWidgetClick = (widgetId: string) => {
    setSelectedWidget(widgetId === selectedWidget ? null : widgetId);
  };

  const handleEditWidget = (rowId: string, widget: Widget) => {
    setCurrentEditWidget({ rowId, widget });
    setEditDialogOpen(true);
  };

  const handleUpdateWidget = (updatedContent: any) => {
    if (!currentEditWidget) return;

    const { rowId, widget } = currentEditWidget;
    
    const updatedRows = rows.map(row => {
      if (row.id === rowId) {
        return {
          ...row,
          widgets: row.widgets.map(w => {
            if (w.id === widget.id) {
              return {
                ...w,
                content: updatedContent
              };
            }
            return w;
          })
        };
      }
      return row;
    });
    
    setRows(updatedRows);
    setEditDialogOpen(false);
    setCurrentEditWidget(null);
    
    toast({
      title: "Widget Updated",
      description: "Your widget content has been updated.",
    });
  };

  const renderEventCard = (event: any) => (
    <div key={event.id} className="mb-4 border-l-4 rounded-md bg-white shadow-sm" style={{ borderLeftColor: event.color }}>
      <div className="p-3">
        <div className="flex justify-between items-start">
          <div>
            <h4 className="font-medium text-sm">{event.title}</h4>
            <div className="text-xs text-gray-600 mt-1">
              {event.date}
            </div>
            <div className="text-xs text-gray-600">
              {event.startTime} - {event.endTime}
            </div>
          </div>
          <div>
            {event.status === "available" ? (
              <Button size="sm" className="text-xs bg-church-accent hover:bg-church-accent/90 mt-1">
                Register
                <span className="text-xs ml-1 opacity-75">{event.spots}</span>
              </Button>
            ) : (
              <Button size="sm" variant="outline" className="text-xs mt-1" disabled>
                Fully Booked
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderWidget = (widget: Widget, isPreview = false) => {
    switch (widget.type) {
      case "text":
        return (
          <div className="p-4 bg-white rounded border">
            {widget.content.title && <h3 className="text-lg font-semibold text-church-primary mb-2">{widget.content.title}</h3>}
            {widget.content.text && <p className="text-gray-700">{widget.content.text}</p>}
          </div>
        );
      case "upcomingEvents":
        return (
          <div className="p-4 bg-white rounded border">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold text-church-primary">{widget.content.title || "Upcoming Events"}</h3>
              <Button variant="link" size="sm" className="text-church-accent p-0">View All</Button>
            </div>
            <div className="space-y-1">
              {widget.content.events.map((event: any) => renderEventCard(event))}
            </div>
          </div>
        );
      default:
        return <div className="p-4 bg-gray-100 rounded border">Widget: {widget.type}</div>;
    }
  };

  const renderEditDialogContent = () => {
    if (!currentEditWidget) return null;

    const { widget } = currentEditWidget;

    switch (widget.type) {
      case "text":
        return (
          <>
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium mb-1">Title</label>
              <Input 
                id="title" 
                defaultValue={widget.content.title} 
                onChange={(e) => {
                  if (currentEditWidget) {
                    setCurrentEditWidget({
                      ...currentEditWidget,
                      widget: {
                        ...currentEditWidget.widget,
                        content: {
                          ...currentEditWidget.widget.content,
                          title: e.target.value
                        }
                      }
                    });
                  }
                }}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="text" className="block text-sm font-medium mb-1">Text Content</label>
              <Textarea 
                id="text" 
                className="min-h-[150px]"
                defaultValue={widget.content.text}
                onChange={(e) => {
                  if (currentEditWidget) {
                    setCurrentEditWidget({
                      ...currentEditWidget,
                      widget: {
                        ...currentEditWidget.widget,
                        content: {
                          ...currentEditWidget.widget.content,
                          text: e.target.value
                        }
                      }
                    });
                  }
                }}
              />
            </div>
          </>
        );
      case "upcomingEvents":
        return (
          <>
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium mb-1">Section Title</label>
              <Input 
                id="title" 
                defaultValue={widget.content.title} 
                onChange={(e) => {
                  if (currentEditWidget) {
                    setCurrentEditWidget({
                      ...currentEditWidget,
                      widget: {
                        ...currentEditWidget.widget,
                        content: {
                          ...currentEditWidget.widget.content,
                          title: e.target.value
                        }
                      }
                    });
                  }
                }}
              />
            </div>
            <div className="mb-4">
              <p className="text-sm font-medium mb-2">Events</p>
              <div className="border rounded-md p-2 space-y-2 max-h-[300px] overflow-y-auto">
                {widget.content.events.map((event: any, index: number) => (
                  <div key={event.id} className="border-b pb-2 last:border-b-0 last:pb-0">
                    <p className="font-medium text-sm">{event.title}</p>
                    <p className="text-xs text-gray-600">{event.date}, {event.startTime} - {event.endTime}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-2">Events are managed in the Events section of the admin panel.</p>
            </div>
          </>
        );
      default:
        return <p>Edit options not available for this widget type.</p>;
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)]">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-church-primary">App Builder</h1>
        <p className="text-muted-foreground text-sm mb-4">
          Create and customize pages for your church app
        </p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Select value={selectedPage} onValueChange={setSelectedPage}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select page" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="home">Home Page</SelectItem>
                <SelectItem value="events">Events Page</SelectItem>
                <SelectItem value="about">About Us</SelectItem>
                <SelectItem value="contact">Contact</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={handleSaveLayout}>
              <Save className="mr-2 h-4 w-4" /> Save
            </Button>
            <Button onClick={handlePublishLayout} className="bg-church-accent hover:bg-church-accent/90">
              <SendHorizontal className="mr-2 h-4 w-4" /> Publish
            </Button>
          </div>
          
          <Tabs defaultValue="editor" className="w-auto">
            <TabsList>
              <TabsTrigger value="editor">Editor</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
      
      <ResizablePanelGroup direction="horizontal" className="h-[calc(100vh-12rem)] border rounded-md bg-muted/20">
        <ResizablePanel defaultSize={25} minSize={15}>
          <div className="h-full p-4 bg-white">
            <h2 className="font-semibold mb-3">Add Cards</h2>
            <p className="text-xs text-muted-foreground mb-4">Drag cards to the Edit section.</p>
            
            <div className="relative mb-4">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search"
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="space-y-0.5 overflow-y-auto h-[calc(100%-7rem)]">
              {filteredWidgets.map((widget) => (
                <div 
                  key={widget.type}
                  draggable
                  onDragStart={() => handleDragStart(widget.type)}
                  className="flex items-center justify-between p-3 cursor-grab hover:bg-gray-50 rounded border-b"
                >
                  <div className="flex items-center gap-2">
                    {widget.icon}
                    <span className="text-sm">{widget.label}</span>
                  </div>
                  <div className={`flex ${widget.featured ? "text-amber-500" : "text-church-accent"}`}>
                    <GripVertical size={18} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ResizablePanel>
        
        <ResizableHandle withHandle />
        
        <ResizablePanel defaultSize={35}>
          <div className="h-full overflow-auto bg-gray-50 p-4">
            <h2 className="font-semibold mb-3">Edit</h2>
            <p className="text-xs text-muted-foreground mb-4">Move cards around by holding and dragging up or down. Click a card to edit or delete it.</p>
            
            <div className="border border-dashed border-gray-300 p-4 bg-white min-h-[500px] rounded-md space-y-4">
              {rows.map((row) => (
                <div 
                  key={row.id}
                  className={`border ${activeRow === row.id ? 'border-church-accent border-2 border-dashed' : 'border-gray-200'} rounded p-2 min-h-[80px] transition-colors`}
                  onDragOver={(e) => handleDragOver(e, row.id)}
                  onDrop={(e) => handleDrop(e, row.id)}
                >
                  {row.widgets.length === 0 ? (
                    <div className="flex items-center justify-center h-full text-muted-foreground text-sm border-2 border-dashed border-gray-200 rounded-md p-4">
                      Drop widgets here
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {row.widgets.map((widget) => (
                        <div 
                          key={widget.id} 
                          className={`py-1 relative group ${selectedWidget === widget.id ? 'ring-2 ring-church-accent' : ''}`}
                          onClick={() => handleWidgetClick(widget.id)}
                        >
                          {renderWidget(widget)}
                          
                          {selectedWidget === widget.id && (
                            <div className="absolute top-2 right-2 flex gap-1 z-10">
                              <Button 
                                size="sm" 
                                variant="destructive" 
                                className="h-7 w-7 p-0"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteWidget(row.id, widget.id);
                                }}
                              >
                                <Trash2 size={14} />
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="h-7 w-7 p-0 bg-white"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleEditWidget(row.id, widget);
                                }}
                              >
                                <Edit size={14} />
                              </Button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </ResizablePanel>
        
        <ResizableHandle withHandle />
        
        <ResizablePanel defaultSize={40}>
          <div className="h-full p-4 bg-white flex flex-col">
            <h2 className="font-semibold mb-3">Preview</h2>
            <p className="text-xs text-muted-foreground mb-3">This is what your page will look like</p>
            
            <div className="flex gap-2 mb-3">
              <Button variant="outline" size="sm" className="rounded-full">Guest</Button>
              <Button variant="default" size="sm" className="rounded-full bg-church-accent hover:bg-church-accent/90">Member</Button>
            </div>
            
            <div className="flex-1 relative flex items-center justify-center bg-gray-50 rounded-lg p-2">
              <div className="rounded-3xl border-8 border-gray-800 h-[95%] w-[280px] overflow-hidden relative shadow-2xl bg-white">
                <div className="absolute inset-0 flex flex-col">
                  <div className="bg-church-primary text-white p-2 text-xs flex justify-between items-center">
                    <div>12:01 AM</div>
                    <div className="flex items-center gap-1">
                      <div className="h-2 w-2 rounded-full bg-white"></div>
                      <div className="h-2 w-2 rounded-full bg-white"></div>
                      <div className="h-2 w-2 rounded-full bg-white"></div>
                    </div>
                  </div>
                  
                  <div className="bg-church-primary text-white p-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-white"></div>
                      <div className="text-sm font-medium">Amado Coração de Jesus</div>
                    </div>
                    <div className="flex gap-2">
                      <button className="text-white">
                        <Crown size={16} />
                      </button>
                      <button className="text-white">
                        <Smartphone size={16} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto bg-gray-50 p-3 space-y-3">
                    <div className="text-xl font-semibold text-church-primary">Hello Jorge,</div>
                    
                    {rows.flatMap(row => 
                      row.widgets.map(widget => (
                        <div key={widget.id} className="py-1">
                          {renderWidget(widget, true)}
                        </div>
                      ))
                    )}
                    
                    {rows.every(row => row.widgets.length === 0) && (
                      <div className="p-4 border border-dashed rounded-md bg-white text-center">
                        <p className="text-muted-foreground">Add widgets in the editor to see them here</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="bg-white border-t p-2 flex justify-around">
                    <Button variant="ghost" size="sm" className="flex flex-col items-center h-auto py-1 text-xs text-church-primary">
                      <Box size={18} />
                      <span>Home</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="flex flex-col items-center h-auto py-1 text-xs">
                      <Smartphone size={18} />
                      <span>My Profile</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="flex flex-col items-center h-auto py-1 text-xs">
                      <FileText size={18} />
                      <span>Directory</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="flex flex-col items-center h-auto py-1 text-xs">
                      <Calendar size={18} />
                      <span>Events</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="flex flex-col items-center h-auto py-1 text-xs">
                      <SlidersHorizontal size={18} />
                      <span>More</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>

      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              Edit {currentEditWidget?.widget.type.charAt(0).toUpperCase() + currentEditWidget?.widget.type.slice(1)} Widget
            </DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            {renderEditDialogContent()}
          </div>
          
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button 
              onClick={() => currentEditWidget && handleUpdateWidget(currentEditWidget.widget.content)}
              className="bg-church-accent hover:bg-church-accent/90"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

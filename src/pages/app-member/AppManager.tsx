
import { useState } from "react";
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
  Check
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

// Define widget types
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

// Widget definitions with their icons and labels
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
  { type: "text", label: "Text", icon: <FileText size={18} /> },
];

// Sample upcoming events data
const upcomingEvents = [
  {
    id: 1,
    title: "Event 1",
    date: "Mon 15 Aug 2022",
    startTime: "07:00 PM",
    endTime: "10:30 PM",
    status: "available",
    spots: 45,
    color: "#F2994A"
  },
  {
    id: 2,
    title: "Event 2",
    date: "Mon 15 Aug 2022",
    endDate: "Wed 17 Aug 2022",
    startTime: "10:00 AM",
    endTime: "11:30 PM",
    status: "booked",
    color: "#56CCF2"
  }
];

export default function AppManager() {
  // Start with empty rows for the edit section
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

  // Filter widgets based on search query
  const filteredWidgets = searchQuery 
    ? widgetTypes.filter(widget => 
        widget.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : widgetTypes;

  // Handle widget drag start
  const handleDragStart = (type: WidgetType) => {
    setDraggingWidget(type);
  };

  // Handle allowing a row to receive dropped widgets
  const handleDragOver = (e: React.DragEvent, rowId: string) => {
    e.preventDefault();
    if (activeRow !== rowId) {
      setActiveRow(rowId);
    }
  };

  // Handle widget drop into a row
  const handleDrop = (e: React.DragEvent, rowId: string) => {
    e.preventDefault();
    setActiveRow(null);
    
    if (draggingWidget) {
      // Add the new widget to the row
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

  // Generate default content based on widget type
  const getDefaultContent = (type: WidgetType) => {
    switch (type) {
      case "text":
        return { title: "New Text", text: "Add your text here" };
      case "container":
        return { title: "New Container" };
      case "link":
        return { text: "Learn More", url: "#" };
      case "upcomingEvents":
        return { events: upcomingEvents };
      default:
        return { title: `New ${type}` };
    }
  };

  // Handle saving the layout
  const handleSaveLayout = () => {
    console.log("Saving layout:", rows);
    toast({
      title: "Layout Saved",
      description: "Your app layout has been saved as a draft.",
    });
  };

  // Handle publishing the layout
  const handlePublishLayout = () => {
    console.log("Publishing layout:", rows);
    toast({
      title: "Layout Published",
      description: "Your app layout is now live for all members!",
    });
  };

  // Delete a widget from a row
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

  // Handle widget selection
  const handleWidgetClick = (widgetId: string) => {
    setSelectedWidget(widgetId === selectedWidget ? null : widgetId);
  };

  // Render event cards in the preview
  const renderEventCard = (event: any) => (
    <div key={event.id} className="mb-4 border-l-4 rounded-md bg-white shadow-sm" style={{ borderLeftColor: event.color }}>
      <div className="p-3">
        <div className="flex justify-between">
          <div>
            <h4 className="font-medium text-sm">{event.title}</h4>
            <div className="text-xs text-gray-600">
              {event.date} {event.endDate ? `- ${event.endDate}` : ''}
            </div>
            <div className="text-xs text-gray-600">
              {event.startTime} To {event.endTime}
            </div>
          </div>
          <div>
            {event.status === "available" ? (
              <Button size="sm" className="text-xs bg-church-accent hover:bg-church-accent/90">
                Register
                <span className="text-xs ml-1 opacity-75">{event.spots} Available</span>
              </Button>
            ) : (
              <Button size="sm" variant="outline" className="text-xs" disabled>
                Fully Booked
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  // Render widget in the layout based on its type
  const renderWidget = (widget: Widget, isPreview = false) => {
    switch (widget.type) {
      case "text":
        if (typeof widget.content === "string") {
          return <div className="p-4 bg-white rounded border text-center font-medium">{widget.content}</div>;
        } else {
          return (
            <div className="p-4 bg-white rounded border">
              {widget.content.title && <h3 className="text-lg font-medium text-center mb-2">{widget.content.title}</h3>}
              {widget.content.text && <p>{widget.content.text}</p>}
            </div>
          );
        }
      case "upcomingEvents":
        return (
          <div className="p-4 bg-white rounded border">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-medium">Upcoming events in 30 days</h3>
              <Button variant="link" size="sm" className="text-church-accent">View All</Button>
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

  // Find the row and widget given a widget ID
  const findWidgetAndRow = (widgetId: string) => {
    for (const row of rows) {
      const widget = row.widgets.find(w => w.id === widgetId);
      if (widget) {
        return { row, widget };
      }
    }
    return null;
  };

  return (
    <div className="h-[calc(100vh-8rem)]">
      <Tabs defaultValue="editor" className="w-full mb-6">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="editor">Editor</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
          <div className="space-x-2">
            <Button variant="outline" onClick={handleSaveLayout}>
              <Save className="mr-2 h-4 w-4" /> Save
            </Button>
            <Button onClick={handlePublishLayout} className="bg-church-accent hover:bg-church-accent/90">
              <SendHorizontal className="mr-2 h-4 w-4" /> Publish
            </Button>
          </div>
        </div>
      </Tabs>
      
      <ResizablePanelGroup direction="horizontal" className="h-[calc(100vh-12rem)] border rounded-md bg-muted/20">
        {/* Left Panel - Widget Library */}
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
        
        {/* Center Panel - App Layout Editor */}
        <ResizablePanel defaultSize={40}>
          <div className="h-full overflow-auto bg-gray-50 p-4">
            <h2 className="font-semibold mb-3">Edit</h2>
            <p className="text-xs text-muted-foreground mb-4">Move cards around by holding and dragging up or down. Click a card to edit or delete it.</p>
            
            <div className="border border-dashed border-gray-300 p-4 bg-white min-h-[500px] rounded-md space-y-4">
              {/* Editable Rows */}
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
                          
                          {/* Widget Controls - Show on selection */}
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
                                  // Future edit functionality
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
        
        {/* Right Panel - Mobile Preview */}
        <ResizablePanel defaultSize={35}>
          <div className="h-full p-4 bg-white flex flex-col">
            <h2 className="font-semibold mb-3">Preview</h2>
            <p className="text-xs text-muted-foreground mb-3">This is what your page will look like</p>
            
            <div className="flex gap-2 mb-3">
              <Button variant="outline" size="sm" className="rounded-full">Guest</Button>
              <Button variant="default" size="sm" className="rounded-full bg-church-accent hover:bg-church-accent/90">Member</Button>
            </div>
            
            {/* Larger Mobile Preview with adjusted sizing */}
            <div className="flex-1 relative flex items-center justify-center bg-gray-50 rounded-lg p-2">
              <div className="rounded-3xl border-8 border-gray-800 h-[calc(100%-1.5rem)] aspect-[9/19] overflow-hidden relative shadow-xl bg-white">
                <div className="absolute inset-0 flex flex-col">
                  {/* Phone Status Bar */}
                  <div className="bg-church-primary text-white p-2 text-xs flex justify-between items-center">
                    <div>12:01 AM</div>
                    <div className="flex items-center gap-1">
                      <div className="h-2 w-2 rounded-full bg-white"></div>
                      <div className="h-2 w-2 rounded-full bg-white"></div>
                      <div className="h-2 w-2 rounded-full bg-white"></div>
                    </div>
                  </div>
                  
                  {/* App Header */}
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
                  
                  {/* Scrollable Content */}
                  <div className="flex-1 overflow-y-auto bg-gray-50 p-3 space-y-3">
                    <div className="text-xl font-semibold text-church-primary">Hello Jorge,</div>
                    
                    {/* Render widgets in preview */}
                    {rows.flatMap(row => 
                      row.widgets.map(widget => (
                        <div key={widget.id} className="py-1">
                          {renderWidget(widget, true)}
                        </div>
                      ))
                    )}
                  </div>
                  
                  {/* Bottom Nav */}
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
    </div>
  );
}

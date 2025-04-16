
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { Smartphone, Grab, Save, SendHorizontal } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

// Define widget types
type WidgetType = 
  | "text" 
  | "image" 
  | "button" 
  | "link" 
  | "video" 
  | "calendar" 
  | "eventList" 
  | "contactForm"
  | "scripture" 
  | "donationButton" 
  | "carousel" 
  | "socialMedia"
  | "audio";

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
const widgetTypes: { type: WidgetType; label: string; icon: React.ReactNode }[] = [
  { type: "text", label: "Text Box", icon: <Textarea className="h-8 w-full pointer-events-none" disabled /> },
  { type: "image", label: "Image", icon: <div className="bg-muted h-12 w-full flex items-center justify-center text-muted-foreground text-xs">Image</div> },
  { type: "button", label: "Button", icon: <Button size="sm" className="w-full pointer-events-none">Button</Button> },
  { type: "link", label: "Link", icon: <div className="text-blue-500 underline cursor-pointer">Link</div> },
  { type: "video", label: "Video", icon: <div className="bg-muted h-12 w-full flex items-center justify-center text-muted-foreground text-xs">Video</div> },
  { type: "calendar", label: "Calendar", icon: <div className="bg-muted h-12 w-full flex items-center justify-center text-muted-foreground text-xs">Calendar</div> },
  { type: "eventList", label: "Event List", icon: <div className="space-y-1 w-full"><div className="h-2 bg-muted rounded w-full"></div><div className="h-2 bg-muted rounded w-3/4"></div></div> },
  { type: "contactForm", label: "Contact Form", icon: <div className="space-y-1 w-full"><Input className="h-6 pointer-events-none" disabled /><Input className="h-6 pointer-events-none" disabled /></div> },
  { type: "scripture", label: "Scripture", icon: <div className="italic text-xs">"For God so loved the world..."</div> },
  { type: "donationButton", label: "Donation", icon: <Button size="sm" variant="outline" className="w-full pointer-events-none">Donate</Button> },
  { type: "carousel", label: "Carousel", icon: <div className="bg-muted h-12 w-full flex items-center justify-center text-muted-foreground text-xs">Image Slider</div> },
  { type: "socialMedia", label: "Social Media", icon: <div className="flex space-x-1"><div className="w-4 h-4 rounded-full bg-blue-500"></div><div className="w-4 h-4 rounded-full bg-pink-500"></div></div> },
  { type: "audio", label: "Audio", icon: <div className="bg-muted h-6 w-full flex items-center justify-center text-muted-foreground text-xs">Audio Player</div> },
];

export default function AppManager() {
  const [rows, setRows] = useState<Row[]>([
    { id: "row-1", widgets: [] },
    { id: "row-2", widgets: [] },
    { id: "row-3", widgets: [] },
  ]);
  const { toast } = useToast();
  const [draggingWidget, setDraggingWidget] = useState<WidgetType | null>(null);
  const [activeRow, setActiveRow] = useState<string | null>(null);

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
    }
  };

  // Generate default content based on widget type
  const getDefaultContent = (type: WidgetType) => {
    switch (type) {
      case "text":
        return "Add your text here";
      case "button":
        return { label: "Click Me", action: "none" };
      case "link":
        return { text: "Learn More", url: "#" };
      case "image":
        return { src: "/placeholder.svg", alt: "Placeholder image" };
      case "scripture":
        return "John 3:16 - For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.";
      default:
        return {};
    }
  };

  // Render widget in the layout based on its type
  const renderWidget = (widget: Widget) => {
    switch (widget.type) {
      case "text":
        return <div className="p-2 bg-white rounded border">{widget.content}</div>;
      case "button":
        return <Button className="w-full">{widget.content.label}</Button>;
      case "link":
        return <a href={widget.content.url} className="text-blue-500 underline">{widget.content.text}</a>;
      case "image":
        return <img src={widget.content.src} alt={widget.content.alt} className="w-full h-32 object-cover" />;
      case "video":
        return <div className="bg-muted h-32 w-full flex items-center justify-center">Video Player</div>;
      case "scripture":
        return <div className="p-2 bg-white rounded border italic">{widget.content}</div>;
      default:
        return <div className="p-2 bg-gray-100 rounded">Widget: {widget.type}</div>;
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

  return (
    <div className="h-[calc(100vh-8rem)]">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Member App Manager</h1>
        <p className="text-muted-foreground">Customize your church's mobile app layout using drag and drop</p>
      </div>
      
      <ResizablePanelGroup direction="horizontal" className="h-[calc(100vh-12rem)]">
        {/* Left Panel - Widget Library */}
        <ResizablePanel defaultSize={25} minSize={20}>
          <div className="h-full p-4 border rounded-l bg-card">
            <h2 className="font-semibold mb-3">Widget Library</h2>
            <p className="text-xs text-muted-foreground mb-4">Drag widgets to the app layout</p>
            
            <div className="space-y-3 overflow-y-auto h-[calc(100%-3rem)]">
              {widgetTypes.map((widget) => (
                <Card 
                  key={widget.type}
                  draggable
                  onDragStart={() => handleDragStart(widget.type)}
                  className="cursor-grab hover:border-primary transition-colors"
                >
                  <CardContent className="p-3 flex items-center gap-2">
                    <Grab className="h-4 w-4 text-muted-foreground" />
                    <div className="flex-1">
                      {widget.icon}
                    </div>
                    <span className="text-xs">{widget.label}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </ResizablePanel>
        
        <ResizableHandle withHandle />
        
        {/* Center Panel - App Layout Editor */}
        <ResizablePanel defaultSize={50}>
          <div className="h-full p-4 border-y bg-muted/30">
            <h2 className="font-semibold mb-3">App Layout</h2>
            <p className="text-xs text-muted-foreground mb-4">Drag widgets from the library into rows below</p>
            
            <div className="bg-white rounded-lg border p-4 space-y-4 h-[calc(100%-4rem)] overflow-y-auto">
              {/* Fixed Header */}
              <div className="bg-church-accent text-white p-3 rounded-t-lg text-center font-bold">
                Church Name
              </div>
              
              {/* Editable Rows */}
              {rows.map((row) => (
                <div 
                  key={row.id}
                  className={`border-2 rounded p-4 min-h-[100px] transition-colors ${activeRow === row.id ? 'border-primary border-dashed' : 'border-transparent'}`}
                  onDragOver={(e) => handleDragOver(e, row.id)}
                  onDrop={(e) => handleDrop(e, row.id)}
                >
                  {row.widgets.length === 0 ? (
                    <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
                      Drop widgets here
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {row.widgets.map((widget) => (
                        <div key={widget.id} className="py-1">
                          {renderWidget(widget)}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              {/* Fixed Bottom Nav */}
              <div className="bg-white border-t mt-auto p-2 rounded-b-lg flex justify-around">
                <Button variant="ghost" size="sm">Home</Button>
                <Button variant="ghost" size="sm">Events</Button>
                <Button variant="ghost" size="sm">Giving</Button>
                <Button variant="ghost" size="sm">Connect</Button>
              </div>
            </div>
          </div>
        </ResizablePanel>
        
        <ResizableHandle withHandle />
        
        {/* Right Panel - Mobile Preview */}
        <ResizablePanel defaultSize={25} minSize={20}>
          <div className="h-full p-4 border rounded-r bg-card flex flex-col">
            <h2 className="font-semibold mb-3">App Preview</h2>
            <p className="text-xs text-muted-foreground mb-4">Live preview of your app</p>
            
            <div className="relative flex-1 flex flex-col items-center justify-center">
              <div className="rounded-[2rem] border-8 border-black h-[70%] aspect-[9/16] overflow-hidden relative shadow-lg">
                <div className="absolute inset-0 bg-white p-2 flex flex-col">
                  {/* Phone Notch */}
                  <div className="w-1/3 h-5 mx-auto bg-black rounded-b-lg mb-1"></div>
                  
                  {/* Content Preview */}
                  <div className="flex-1 overflow-hidden flex flex-col">
                    {/* Header */}
                    <div className="bg-church-accent text-white p-2 text-center font-bold text-sm">
                      Church Name
                    </div>
                    
                    {/* Scrollable Content */}
                    <div className="flex-1 overflow-y-auto p-2 space-y-2">
                      {rows.flatMap(row => 
                        row.widgets.map(widget => (
                          <div key={widget.id} className="py-1 transform scale-90">
                            {renderWidget(widget)}
                          </div>
                        ))
                      )}
                    </div>
                    
                    {/* Bottom Nav */}
                    <div className="bg-white border-t p-1 flex justify-around text-[0.6rem]">
                      <Button variant="ghost" size="sm" className="h-8 text-[0.6rem]">Home</Button>
                      <Button variant="ghost" size="sm" className="h-8 text-[0.6rem]">Events</Button>
                      <Button variant="ghost" size="sm" className="h-8 text-[0.6rem]">Giving</Button>
                      <Button variant="ghost" size="sm" className="h-8 text-[0.6rem]">Connect</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-2 mt-4">
              <Button 
                className="w-full" 
                variant="outline" 
                onClick={handleSaveLayout}
              >
                <Save className="mr-2 h-4 w-4" /> Save Layout
              </Button>
              <Button 
                className="w-full" 
                onClick={handlePublishLayout}
              >
                <SendHorizontal className="mr-2 h-4 w-4" /> Publish Layout
              </Button>
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

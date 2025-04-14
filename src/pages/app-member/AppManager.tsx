
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { 
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle
} from "@/components/ui/resizable";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Smartphone,
  Text,
  Image,
  List,
  Video,
  Link,
  MenuSquare,
  Calendar,
  Map,
  FileSpreadsheet,
  Save,
  BookOpen,
  DollarSign,
  Images,
  Share2,
  Podcast,
  Send
} from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

type WidgetType = {
  id: string;
  type: string;
  title: string;
  icon: React.ReactNode;
  content?: any;
};

type AppLayoutItem = {
  id: string;
  widgetType: string;
  content: any;
};

export default function AppManager() {
  const { toast } = useToast();
  const [layoutItems, setLayoutItems] = useState<AppLayoutItem[]>([]);
  const [activeWidget, setActiveWidget] = useState<AppLayoutItem | null>(null);
  const [textContent, setTextContent] = useState("");
  const [churchName, setChurchName] = useState("Grace Community Church");
  const [isPublishing, setIsPublishing] = useState(false);
  
  const availableWidgets: WidgetType[] = [
    { id: 'text', type: 'text', title: 'Text Box', icon: <Text className="h-5 w-5" /> },
    { id: 'image', type: 'image', title: 'Image', icon: <Image className="h-5 w-5" /> },
    { id: 'button', type: 'button', title: 'Button', icon: <MenuSquare className="h-5 w-5" /> },
    { id: 'link', type: 'link', title: 'Link', icon: <Link className="h-5 w-5" /> },
    { id: 'video', type: 'video', title: 'Video', icon: <Video className="h-5 w-5" /> },
    { id: 'calendar', type: 'calendar', title: 'Calendar', icon: <Calendar className="h-5 w-5" /> },
    { id: 'event-list', type: 'event-list', title: 'Event List', icon: <List className="h-5 w-5" /> },
    { id: 'contact-form', type: 'contact-form', title: 'Contact Form', icon: <FileSpreadsheet className="h-5 w-5" /> },
    { id: 'scripture', type: 'scripture', title: 'Scripture of the Day', icon: <BookOpen className="h-5 w-5" /> },
    { id: 'donation', type: 'donation', title: 'Donation Button', icon: <DollarSign className="h-5 w-5" /> },
    { id: 'carousel', type: 'carousel', title: 'Carousel', icon: <Images className="h-5 w-5" /> },
    { id: 'social-media', type: 'social-media', title: 'Social Media Links', icon: <Share2 className="h-5 w-5" /> },
    { id: 'podcast', type: 'podcast', title: 'Podcast/Audio', icon: <Podcast className="h-5 w-5" /> },
    { id: 'map', type: 'map', title: 'Map', icon: <Map className="h-5 w-5" /> },
  ];

  const onDragEnd = (result: any) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    if (source.droppableId === 'WIDGETS' && destination.droppableId === 'LAYOUT') {
      const widgetType = availableWidgets.find(widget => widget.id === result.draggableId)?.type;
      
      if (widgetType) {
        const newItem: AppLayoutItem = {
          id: `layout-item-${Date.now()}`,
          widgetType: widgetType,
          content: null
        };
        
        const newItems = [...layoutItems];
        newItems.splice(destination.index, 0, newItem);
        setLayoutItems(newItems);
        setActiveWidget(newItem);
        
        toast({
          title: "Widget Added",
          description: `${widgetType.charAt(0).toUpperCase() + widgetType.slice(1)} widget added to layout.`,
        });
      }
    } else if (source.droppableId === 'LAYOUT' && destination.droppableId === 'LAYOUT') {
      const items = Array.from(layoutItems);
      const [reorderedItem] = items.splice(source.index, 1);
      items.splice(destination.index, 0, reorderedItem);
      setLayoutItems(items);
    }
  };

  const saveTextContent = () => {
    if (activeWidget) {
      setLayoutItems(items => 
        items.map(item => 
          item.id === activeWidget.id 
            ? { ...item, content: textContent } 
            : item
        )
      );
      
      setActiveWidget(null);
      setTextContent("");
      
      toast({
        title: "Content Saved",
        description: "Your widget content has been updated.",
      });
    }
  };

  const saveAppLayout = () => {
    console.log("Saving app layout:", layoutItems);
    
    toast({
      title: "Layout Saved",
      description: "Your app layout has been saved as a draft.",
    });
  };

  const publishAppLayout = () => {
    setIsPublishing(true);
    
    // Simulate publishing delay
    setTimeout(() => {
      setIsPublishing(false);
      
      toast({
        title: "Layout Published",
        description: "Your app layout has been published successfully and is now live to users.",
      });
    }, 1500);
  };

  const renderWidgetEditor = () => {
    if (!activeWidget) return null;

    switch (activeWidget.widgetType) {
      case 'text':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Text Widget</h3>
            <div className="space-y-2">
              <Label htmlFor="text-content">Content</Label>
              <Textarea 
                id="text-content"
                value={textContent}
                onChange={(e) => setTextContent(e.target.value)}
                placeholder="Enter your text here..."
                className="min-h-[150px]"
              />
            </div>
            <Button onClick={saveTextContent}>Save Text</Button>
          </div>
        );
      case 'image':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Image Widget</h3>
            <div className="space-y-2">
              <Label htmlFor="image-url">Image URL</Label>
              <Input 
                id="image-url"
                placeholder="Enter image URL or upload"
              />
              <div className="mt-2">
                <Button variant="outline" className="w-full">
                  Upload Image
                </Button>
              </div>
            </div>
            <Button onClick={() => setActiveWidget(null)}>Add Image</Button>
          </div>
        );
      case 'button':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Button Widget</h3>
            <div className="space-y-2">
              <Label htmlFor="button-text">Button Text</Label>
              <Input 
                id="button-text"
                placeholder="Enter button text"
                value={textContent}
                onChange={(e) => setTextContent(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="button-url">Button URL (optional)</Label>
              <Input 
                id="button-url"
                placeholder="Enter URL or leave blank for action"
              />
            </div>
            <Button onClick={saveTextContent}>Save Button</Button>
          </div>
        );
      default:
        return (
          <div className="p-4 text-center text-muted-foreground">
            Widget configuration for {activeWidget.widgetType} is coming soon.
          </div>
        );
    }
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Member App Manager</h1>
          <p className="text-muted-foreground">
            Design and customize your church member app layout
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={saveAppLayout}>
            <Save className="h-4 w-4 mr-2" />
            Save Draft
          </Button>
          <Button 
            onClick={publishAppLayout}
            disabled={isPublishing}
          >
            <Send className="h-4 w-4 mr-2" />
            Publish Layout
          </Button>
        </div>
      </div>
      
      <DragDropContext onDragEnd={onDragEnd}>
        <ResizablePanelGroup direction="horizontal" className="h-[calc(100vh-200px)] min-h-[500px] rounded-lg border">
          <ResizablePanel defaultSize={20} minSize={15}>
            <div className="h-full p-4 bg-muted/20">
              <h2 className="text-xl font-semibold mb-4">Widget Library</h2>
              <Droppable droppableId="WIDGETS" isDropDisabled={true}>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="space-y-2"
                  >
                    {availableWidgets.map((widget, index) => (
                      <Draggable 
                        key={widget.id} 
                        draggableId={widget.id} 
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="p-3 bg-card shadow rounded-md flex items-center gap-3 cursor-grab hover:bg-accent/10"
                          >
                            <div className="flex items-center justify-center p-2 bg-primary/10 rounded text-primary">
                              {widget.icon}
                            </div>
                            <span>{widget.title}</span>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </ResizablePanel>
          
          <ResizableHandle withHandle />
          
          <ResizablePanel defaultSize={50}>
            <div className="h-full p-4 flex flex-col">
              <h2 className="text-xl font-semibold mb-4">Layout Builder</h2>
              
              <div className="flex-1 flex">
                <div className="flex-1 overflow-y-auto border rounded-md p-4">
                  <Droppable droppableId="LAYOUT">
                    {(provided, snapshot) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className={`min-h-full space-y-2 ${
                          snapshot.isDraggingOver ? "bg-accent/10" : ""
                        }`}
                      >
                        {layoutItems.length === 0 && !snapshot.isDraggingOver && (
                          <div className="h-full flex items-center justify-center text-muted-foreground">
                            <p>Drag widgets here to build your app layout</p>
                          </div>
                        )}
                        
                        {layoutItems.map((item, index) => (
                          <Draggable key={item.id} draggableId={item.id} index={index}>
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`p-4 border rounded-md bg-background cursor-grab hover:bg-accent/5 ${
                                  activeWidget?.id === item.id ? "ring-2 ring-primary" : ""
                                }`}
                                onClick={() => {
                                  setActiveWidget(item);
                                  if (item.content) {
                                    setTextContent(item.content);
                                  } else {
                                    setTextContent("");
                                  }
                                }}
                              >
                                <div className="flex items-center gap-2">
                                  {availableWidgets.find(widget => widget.type === item.widgetType)?.icon}
                                  <span className="font-medium capitalize">{item.widgetType}</span>
                                </div>
                                {item.content && (
                                  <div className="mt-2 text-sm text-muted-foreground">
                                    {typeof item.content === 'string' 
                                      ? (item.content.length > 100 
                                          ? `${item.content.substring(0, 100)}...` 
                                          : item.content)
                                      : 'Custom content'}
                                  </div>
                                )}
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
                
                {activeWidget && (
                  <Sheet defaultOpen>
                    <SheetContent className="w-80">
                      <SheetHeader>
                        <SheetTitle>Edit Widget</SheetTitle>
                        <SheetDescription>
                          Configure your {activeWidget.widgetType} widget
                        </SheetDescription>
                      </SheetHeader>
                      <div className="mt-6">
                        {renderWidgetEditor()}
                      </div>
                    </SheetContent>
                  </Sheet>
                )}
              </div>
            </div>
          </ResizablePanel>
          
          <ResizableHandle withHandle />
          
          <ResizablePanel defaultSize={30}>
            <div className="h-full p-4 bg-muted/20 flex flex-col">
              <h2 className="text-xl font-semibold mb-4">Preview</h2>
              
              <div className="flex-1 flex items-center justify-center">
                <div className="w-[340px] h-[680px] bg-background border-8 border-gray-800 rounded-[40px] shadow-xl overflow-hidden relative">
                  <div className="absolute top-0 left-0 right-0 h-6 bg-gray-800 flex justify-center items-end">
                    <div className="w-20 h-4 bg-black rounded-b-xl"></div>
                  </div>
                  
                  {/* Fixed App Header */}
                  <div className="sticky top-0 z-10 bg-primary text-white p-4 shadow-md">
                    <div className="flex justify-between items-center">
                      <input
                        type="text"
                        value={churchName}
                        onChange={(e) => setChurchName(e.target.value)}
                        className="bg-transparent text-lg font-bold w-full outline-none focus:border-b border-white/30"
                      />
                      <Button size="sm" variant="ghost" className="text-white">
                        <MenuSquare className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                  
                  {/* App Content */}
                  <div className="p-4 h-[calc(100%-6rem)] overflow-y-auto">
                    {layoutItems.length === 0 ? (
                      <div className="h-full flex items-center justify-center text-muted-foreground">
                        <p>Your app preview will appear here</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {layoutItems.map((item) => (
                          <Card key={item.id}>
                            <CardHeader className="py-2">
                              <CardTitle className="text-sm capitalize">{item.widgetType}</CardTitle>
                            </CardHeader>
                            <CardContent>
                              {item.widgetType === 'text' && item.content ? (
                                <p>{item.content}</p>
                              ) : item.widgetType === 'image' ? (
                                <div className="bg-muted h-40 flex items-center justify-center">
                                  <Image className="h-8 w-8 text-muted-foreground" />
                                </div>
                              ) : item.widgetType === 'button' && item.content ? (
                                <Button className="w-full">{item.content}</Button>
                              ) : (
                                <div className="h-20 flex items-center justify-center text-muted-foreground">
                                  <p className="text-xs">{item.widgetType} placeholder</p>
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {/* Fixed Bottom Navigation */}
                  <div className="fixed bottom-0 left-0 right-0 border-t bg-background">
                    <div className="grid grid-cols-4 h-14">
                      {['Home', 'Events', 'Donate', 'Profile'].map((item) => (
                        <button 
                          key={item} 
                          className="flex flex-col items-center justify-center text-xs p-1 hover:bg-muted/30"
                        >
                          <span className="text-primary mb-1">
                            {item === 'Home' && <Home className="h-4 w-4" />}
                            {item === 'Events' && <Calendar className="h-4 w-4" />}
                            {item === 'Donate' && <DollarSign className="h-4 w-4" />}
                            {item === 'Profile' && <Smartphone className="h-4 w-4" />}
                          </span>
                          <span>{item}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </DragDropContext>
    </div>
  );
}

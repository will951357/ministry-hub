
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
  Form,
  Save
} from "lucide-react";

type WidgetType = {
  id: string;
  type: 'text' | 'image' | 'list' | 'video' | 'link' | 'menu' | 'calendar' | 'map' | 'form';
  title: string;
  icon: React.ReactNode;
  content?: any;
};

type AppLayoutItem = {
  id: string;
  widgetType: WidgetType['type'];
  content: any;
};

export default function AppManager() {
  const { toast } = useToast();
  const [layoutItems, setLayoutItems] = useState<AppLayoutItem[]>([]);
  const [activeWidget, setActiveWidget] = useState<AppLayoutItem | null>(null);
  const [textContent, setTextContent] = useState("");
  
  // Available widgets for the sidebar
  const availableWidgets: WidgetType[] = [
    { id: 'widget-text', type: 'text', title: 'Text', icon: <Text className="h-5 w-5" /> },
    { id: 'widget-image', type: 'image', title: 'Image', icon: <Image className="h-5 w-5" /> },
    { id: 'widget-list', type: 'list', title: 'List', icon: <List className="h-5 w-5" /> },
    { id: 'widget-video', type: 'video', title: 'Video', icon: <Video className="h-5 w-5" /> },
    { id: 'widget-link', type: 'link', title: 'Link', icon: <Link className="h-5 w-5" /> },
    { id: 'widget-menu', type: 'menu', title: 'Menu', icon: <MenuSquare className="h-5 w-5" /> },
    { id: 'widget-calendar', type: 'calendar', title: 'Calendar', icon: <Calendar className="h-5 w-5" /> },
    { id: 'widget-map', type: 'map', title: 'Map', icon: <Map className="h-5 w-5" /> },
    { id: 'widget-form', type: 'form', title: 'Form', icon: <Form className="h-5 w-5" /> },
  ];

  // Handle drag end event
  const onDragEnd = (result: any) => {
    const { source, destination } = result;

    // Dropped outside the list
    if (!destination) {
      return;
    }

    // Dropped in the same place
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // If dragging from the widget panel to the layout
    if (source.droppableId === 'WIDGETS' && destination.droppableId === 'LAYOUT') {
      const widgetType = availableWidgets.find(widget => `widget-${widget.id}` === result.draggableId)?.type;
      
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
      // Reordering within the layout
      const items = Array.from(layoutItems);
      const [reorderedItem] = items.splice(source.index, 1);
      items.splice(destination.index, 0, reorderedItem);
      setLayoutItems(items);
    }
  };

  // Save text content to a widget
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

  // Handler to save the final app layout
  const saveAppLayout = () => {
    // Here you would typically send this data to a backend
    console.log("Saving app layout:", layoutItems);
    
    toast({
      title: "Layout Saved",
      description: "Your app layout has been saved successfully.",
    });
  };

  // Render the widget editor based on the active widget type
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
          <h1 className="text-3xl font-bold tracking-tight">App Manager</h1>
          <p className="text-muted-foreground">
            Design and customize your church app layout
          </p>
        </div>
        <Button onClick={saveAppLayout}>
          <Save className="h-4 w-4 mr-2" />
          Save Layout
        </Button>
      </div>
      
      <DragDropContext onDragEnd={onDragEnd}>
        <ResizablePanelGroup direction="horizontal" className="h-[calc(100vh-200px)] min-h-[500px] rounded-lg border">
          {/* Widgets Panel */}
          <ResizablePanel defaultSize={20} minSize={15}>
            <div className="h-full p-4 bg-muted/20">
              <h2 className="text-xl font-semibold mb-4">Widgets</h2>
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
                        draggableId={`widget-${widget.id}`} 
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
          
          {/* Layout Builder */}
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
                                onClick={() => setActiveWidget(item)}
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
                
                {/* Widget Editor */}
                {activeWidget && (
                  <div className="w-64 ml-4 p-4 border rounded-md">
                    {renderWidgetEditor()}
                  </div>
                )}
              </div>
            </div>
          </ResizablePanel>
          
          <ResizableHandle withHandle />
          
          {/* Preview Panel */}
          <ResizablePanel defaultSize={30}>
            <div className="h-full p-4 bg-muted/20 flex flex-col">
              <h2 className="text-xl font-semibold mb-4">Preview</h2>
              
              <div className="flex-1 flex items-center justify-center">
                <div className="w-[340px] h-[680px] bg-background border-8 border-gray-800 rounded-[40px] shadow-xl overflow-hidden relative">
                  <div className="absolute top-0 left-0 right-0 h-6 bg-gray-800 flex justify-center items-end">
                    <div className="w-20 h-4 bg-black rounded-b-xl"></div>
                  </div>
                  <div className="p-4 h-full overflow-y-auto">
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
                </div>
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </DragDropContext>
    </div>
  );
}

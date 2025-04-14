
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { DragDropContext } from "react-beautiful-dnd";
import { 
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle
} from "@/components/ui/resizable";
import { Button } from "@/components/ui/button";
import { Save, Send } from "lucide-react";
import WidgetLibrary from "@/components/app-member/WidgetLibrary";
import LayoutBuilder from "@/components/app-member/LayoutBuilder";
import AppPreview from "@/components/app-member/AppPreview";
import { getAvailableWidgets } from "@/components/app-member/widgetData";
import { type AppLayoutItem } from "@/components/app-member/LayoutBuilder";

export default function AppManager() {
  const { toast } = useToast();
  const [layoutItems, setLayoutItems] = useState<AppLayoutItem[]>([]);
  const [activeWidget, setActiveWidget] = useState<AppLayoutItem | null>(null);
  const [textContent, setTextContent] = useState("");
  const [churchName, setChurchName] = useState("Grace Community Church");
  const [isPublishing, setIsPublishing] = useState(false);
  
  const availableWidgets = getAvailableWidgets();

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
            <WidgetLibrary availableWidgets={availableWidgets} />
          </ResizablePanel>
          
          <ResizableHandle withHandle />
          
          <ResizablePanel defaultSize={50}>
            <LayoutBuilder 
              layoutItems={layoutItems}
              activeWidget={activeWidget}
              textContent={textContent}
              setTextContent={setTextContent}
              setActiveWidget={setActiveWidget}
              saveTextContent={saveTextContent}
              availableWidgets={availableWidgets}
            />
          </ResizablePanel>
          
          <ResizableHandle withHandle />
          
          <ResizablePanel defaultSize={30}>
            <AppPreview 
              layoutItems={layoutItems}
              churchName={churchName}
              setChurchName={setChurchName}
              isPublishing={isPublishing}
              saveAppLayout={saveAppLayout}
              publishAppLayout={publishAppLayout}
            />
          </ResizablePanel>
        </ResizablePanelGroup>
      </DragDropContext>
    </div>
  );
}

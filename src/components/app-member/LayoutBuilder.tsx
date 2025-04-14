
import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { type WidgetType } from "./WidgetLibrary";

export type AppLayoutItem = {
  id: string;
  widgetType: string;
  content: any;
};

interface LayoutBuilderProps {
  layoutItems: AppLayoutItem[];
  activeWidget: AppLayoutItem | null;
  textContent: string;
  setTextContent: (content: string) => void;
  setActiveWidget: (widget: AppLayoutItem | null) => void;
  saveTextContent: () => void;
  availableWidgets: WidgetType[];
}

const LayoutBuilder: React.FC<LayoutBuilderProps> = ({
  layoutItems,
  activeWidget,
  textContent,
  setTextContent,
  setActiveWidget,
  saveTextContent,
  availableWidgets
}) => {
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
  );
};

export default LayoutBuilder;

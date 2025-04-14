
import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { 
  Text, 
  Image, 
  Link, 
  MenuSquare, 
  Video, 
  Calendar, 
  List, 
  FileSpreadsheet, 
  BookOpen, 
  DollarSign, 
  Images, 
  Share2, 
  Podcast, 
  Map 
} from "lucide-react";

export type WidgetType = {
  id: string;
  type: string;
  title: string;
  icon: React.ReactNode;
  content?: any;
};

interface WidgetLibraryProps {
  availableWidgets: WidgetType[];
}

const WidgetLibrary: React.FC<WidgetLibraryProps> = ({ availableWidgets }) => {
  return (
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
  );
};

export default WidgetLibrary;

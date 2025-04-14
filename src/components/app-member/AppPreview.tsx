
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Home, Calendar, DollarSign, Smartphone, MenuSquare, Image } from "lucide-react";
import { type AppLayoutItem } from "./LayoutBuilder";

interface AppPreviewProps {
  layoutItems: AppLayoutItem[];
  churchName: string;
  setChurchName: (name: string) => void;
  isPublishing: boolean;
  saveAppLayout: () => void;
  publishAppLayout: () => void;
}

const AppPreview: React.FC<AppPreviewProps> = ({
  layoutItems,
  churchName,
  setChurchName,
  isPublishing,
  saveAppLayout,
  publishAppLayout
}) => {
  return (
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
  );
};

export default AppPreview;

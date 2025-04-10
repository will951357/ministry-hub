
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardFooter,
  CardHeader, 
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  MessageSquare, 
  Heart, 
  ArrowLeft, 
  Bold, 
  Italic, 
  Underline, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  List, 
  ListOrdered,
  Image,
  Calendar as CalendarIcon,
  Save,
  Send
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export default function NewPost() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [allowComments, setAllowComments] = useState(true);
  const [allowReactions, setAllowReactions] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFont, setSelectedFont] = useState("default");
  const [publishOption, setPublishOption] = useState("now");
  const [scheduledDate, setScheduledDate] = useState<Date | undefined>(undefined);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Rich text editor controls
  const [textFormatting, setTextFormatting] = useState({
    bold: false,
    italic: false,
    underline: false,
    alignment: "left"
  });
  
  const handleFormatText = (format: keyof typeof textFormatting) => {
    if (format === "bold" || format === "italic" || format === "underline") {
      setTextFormatting(prev => ({
        ...prev,
        [format]: !prev[format]
      }));
    } else if (format === "alignment") {
      // This is handled separately since it has multiple values
    }
  };

  const handleAlignment = (alignment: string) => {
    setTextFormatting(prev => ({
      ...prev,
      alignment
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create a preview URL for the image
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
      
      // Add image markdown to the content
      setContent(prev => `${prev}\n\n![${file.name}](${imageUrl})\n`);
      
      toast({
        title: "Image added",
        description: "Your image has been added to the post.",
      });
    }
  };

  const handleSaveDraft = () => {
    if (!title.trim()) {
      toast({
        title: "Missing title",
        description: "Please provide a title for your blog post",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate saving to API
    setTimeout(() => {
      toast({
        title: "Draft saved",
        description: "Your blog post has been saved as a draft",
      });
      setIsSubmitting(false);
    }, 800);
  };

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast({
        title: "Missing title",
        description: "Please provide a title for your blog post",
        variant: "destructive"
      });
      return;
    }
    
    if (!content.trim()) {
      toast({
        title: "Missing content",
        description: "Please provide content for your blog post",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Construct the publishing message based on the option
    const publishMessage = publishOption === "schedule" && scheduledDate
      ? `Your blog post has been scheduled for ${format(scheduledDate, "PPP")}`
      : "Your blog post has been published successfully";
    
    // Simulate posting to API
    setTimeout(() => {
      toast({
        title: publishOption === "schedule" ? "Post scheduled" : "Post published",
        description: publishMessage,
      });
      setIsSubmitting(false);
      navigate("/app-member/blog");
    }, 1000);
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate("/app-member/blog")}
          className="mr-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Blog
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">New Blog Post</h1>
      </div>
      
      <form onSubmit={handlePublish}>
        <Card>
          <CardHeader>
            <CardTitle>Create a New Post</CardTitle>
            <CardDescription>
              Create content for your church app. Add text, images, and format your post.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Post Title</Label>
              <Input 
                id="title" 
                placeholder="Enter post title" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor="editor">Post Content</Label>
                <div className="flex items-center space-x-2">
                  <Select value={selectedFont} onValueChange={setSelectedFont}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Font" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Default</SelectItem>
                      <SelectItem value="serif">Serif</SelectItem>
                      <SelectItem value="sans">Sans-serif</SelectItem>
                      <SelectItem value="mono">Monospace</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="border rounded-md p-1 bg-background">
                <div className="flex flex-wrap items-center gap-1 border-b p-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn(textFormatting.bold && "bg-muted")}
                    onClick={() => handleFormatText("bold")}
                    type="button"
                  >
                    <Bold className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn(textFormatting.italic && "bg-muted")}
                    onClick={() => handleFormatText("italic")}
                    type="button"
                  >
                    <Italic className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn(textFormatting.underline && "bg-muted")}
                    onClick={() => handleFormatText("underline")}
                    type="button"
                  >
                    <Underline className="h-4 w-4" />
                  </Button>
                  <div className="border-l h-6 mx-1"></div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn(textFormatting.alignment === "left" && "bg-muted")}
                    onClick={() => handleAlignment("left")}
                    type="button"
                  >
                    <AlignLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn(textFormatting.alignment === "center" && "bg-muted")}
                    onClick={() => handleAlignment("center")}
                    type="button"
                  >
                    <AlignCenter className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn(textFormatting.alignment === "right" && "bg-muted")}
                    onClick={() => handleAlignment("right")}
                    type="button"
                  >
                    <AlignRight className="h-4 w-4" />
                  </Button>
                  <div className="border-l h-6 mx-1"></div>
                  <Button
                    variant="ghost"
                    size="sm"
                    type="button"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    type="button"
                  >
                    <ListOrdered className="h-4 w-4" />
                  </Button>
                  <div className="border-l h-6 mx-1"></div>
                  <div className="relative">
                    <Input
                      type="file"
                      id="image-upload"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                    <Label htmlFor="image-upload" className="cursor-pointer">
                      <Button
                        variant="ghost"
                        size="sm"
                        type="button"
                        asChild
                      >
                        <span>
                          <Image className="h-4 w-4" />
                        </span>
                      </Button>
                    </Label>
                  </div>
                </div>
                
                <Textarea 
                  id="editor" 
                  placeholder="Write your post content here..." 
                  className={cn(
                    "min-h-[300px] border-0 focus-visible:ring-0 resize-none p-3",
                    selectedFont === "serif" && "font-serif",
                    selectedFont === "mono" && "font-mono",
                    selectedFont === "sans" && "font-sans",
                    textFormatting.bold && "font-bold",
                    textFormatting.italic && "italic",
                    textFormatting.underline && "underline",
                    textFormatting.alignment === "center" && "text-center",
                    textFormatting.alignment === "right" && "text-right"
                  )}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>
              
              {previewImage && (
                <div className="mt-4 p-2 border rounded-md">
                  <p className="text-sm font-medium mb-2">Image Preview:</p>
                  <img src={previewImage} alt="Preview" className="max-h-40 rounded" />
                </div>
              )}
            </div>
            
            <div className="flex flex-col space-y-4 pt-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="comments">Allow Comments</Label>
                  <div className="text-sm text-muted-foreground">
                    Let readers comment on this post
                  </div>
                </div>
                <Switch 
                  id="comments"
                  checked={allowComments}
                  onCheckedChange={setAllowComments}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="reactions">Enable Reactions</Label>
                  <div className="text-sm text-muted-foreground">
                    Allow readers to react to this post
                  </div>
                </div>
                <Switch 
                  id="reactions"
                  checked={allowReactions}
                  onCheckedChange={setAllowReactions}
                />
              </div>
            </div>
            
            <div className="pt-4 border-t">
              <Label className="mb-2 block">Publishing Options</Label>
              <Tabs defaultValue="now" value={publishOption} onValueChange={setPublishOption}>
                <TabsList className="mb-4">
                  <TabsTrigger value="now">Publish Now</TabsTrigger>
                  <TabsTrigger value="schedule">Schedule</TabsTrigger>
                </TabsList>
                <TabsContent value="now">
                  <p className="text-sm text-muted-foreground">The post will be published immediately after submission.</p>
                </TabsContent>
                <TabsContent value="schedule">
                  <div className="flex flex-col gap-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "justify-start text-left font-normal w-full",
                            !scheduledDate && "text-muted-foreground"
                          )}
                          type="button"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {scheduledDate ? format(scheduledDate, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={scheduledDate}
                          onSelect={setScheduledDate}
                          initialFocus
                          disabled={(date) => date < new Date()}
                        />
                      </PopoverContent>
                    </Popover>
                    <p className="text-sm text-muted-foreground">
                      The post will be published automatically on the selected date.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t p-6">
            <div className="flex items-center gap-4">
              {allowComments && <MessageSquare className="h-5 w-5 text-muted-foreground" />}
              {allowReactions && <Heart className="h-5 w-5 text-muted-foreground" />}
              <span className="text-sm text-muted-foreground">
                {allowComments && allowReactions 
                  ? "Comments and reactions enabled" 
                  : allowComments 
                    ? "Only comments enabled" 
                    : allowReactions 
                      ? "Only reactions enabled" 
                      : "No engagement features enabled"}
              </span>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => navigate("/app-member/blog")}>
                Cancel
              </Button>
              <Button 
                variant="outline" 
                type="button"
                onClick={handleSaveDraft}
                disabled={isSubmitting}
              >
                <Save className="h-4 w-4 mr-2" />
                {isSubmitting ? "Saving..." : "Save Draft"}
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {publishOption === "schedule" ? (
                  <>
                    <CalendarIcon className="h-4 w-4 mr-2" />
                    {isSubmitting ? "Scheduling..." : "Schedule"}
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    {isSubmitting ? "Publishing..." : "Publish"}
                  </>
                )}
              </Button>
            </div>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}

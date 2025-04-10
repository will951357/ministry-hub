
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardFooter,
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { MessageSquare, Heart, ArrowLeft } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function NewPost() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [allowComments, setAllowComments] = useState(true);
  const [allowReactions, setAllowReactions] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
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
    
    // Simulate posting to API
    setTimeout(() => {
      toast({
        title: "Post created",
        description: "Your blog post has been created successfully",
      });
      setIsSubmitting(false);
      navigate("/app-member/blog");
    }, 1500);
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
      
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Create a New Post</CardTitle>
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
              <Label htmlFor="content">Post Content</Label>
              <Textarea 
                id="content" 
                placeholder="Write your post content here..." 
                className="min-h-[200px]"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
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
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Publishing..." : "Publish Post"}
              </Button>
            </div>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}

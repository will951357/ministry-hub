
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  MessageSquare, 
  Heart, 
  ThumbsUp, 
  Filter, 
  Plus,
  CalendarDays,
  Clock,
  CalendarX
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

export default function Blog() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("all");
  const [showScheduled, setShowScheduled] = useState(false);

  // Sample blog posts data
  const [blogPosts, setBlogPosts] = useState([
    {
      id: 1,
      title: "Easter Service Special Announcement",
      content: "Join us for our special Easter service this Sunday at 10 AM. We'll have a special program for children and a community lunch after the service.",
      author: "Pastor John",
      date: "2025-04-05",
      commentsEnabled: true,
      reactionsEnabled: true,
      comments: 12,
      likes: 24,
      status: "published"
    },
    {
      id: 2,
      title: "Youth Group Mission Trip",
      content: "Our youth group will be going on a mission trip to Mexico this summer. Please keep them in your prayers and consider supporting them financially.",
      author: "Youth Pastor Mike",
      date: "2025-04-03",
      commentsEnabled: true,
      reactionsEnabled: false,
      comments: 5,
      likes: 0,
      status: "published"
    },
    {
      id: 3,
      title: "New Sunday School Curriculum",
      content: "We're excited to announce our new Sunday School curriculum starting next month. It's designed to engage children of all ages and help them grow in their faith.",
      author: "Education Director Sarah",
      date: "2025-04-01",
      commentsEnabled: false,
      reactionsEnabled: true,
      comments: 0,
      likes: 18,
      status: "published"
    },
    {
      id: 4,
      title: "Church Retreat Planning",
      content: "We're planning our annual church retreat for the fall. This year we'll be focusing on community building and spiritual growth through interactive workshops.",
      author: "Pastor John",
      date: "2025-04-20",
      commentsEnabled: true,
      reactionsEnabled: true,
      comments: 0,
      likes: 0,
      status: "scheduled",
      publishDate: "2025-05-15T09:00:00"
    },
    {
      id: 5,
      title: "Summer Bible Study Series",
      content: "Join us this summer for a special Bible study series on the book of Romans. We'll dive deep into Paul's theology and its implications for our lives today.",
      author: "Bible Study Coordinator Tim",
      date: "2025-04-08",
      commentsEnabled: true,
      reactionsEnabled: true,
      comments: 0,
      likes: 0,
      status: "scheduled",
      publishDate: "2025-05-01T14:30:00"
    }
  ]);

  // Function to handle canceling a scheduled post
  const handleCancelScheduled = (postId) => {
    setBlogPosts(posts => 
      posts.map(post => 
        post.id === postId 
          ? { ...post, status: "draft", publishDate: null } 
          : post
      )
    );
    
    toast({
      title: "Schedule canceled",
      description: "Post has been moved to drafts",
    });
  };

  // Filter posts based on current filters
  const getFilteredPosts = () => {
    let filtered = [...blogPosts];
    
    if (activeTab !== "all") {
      filtered = filtered.filter(post => {
        if (activeTab === "published") return post.status === "published";
        if (activeTab === "drafts") return post.status === "draft";
        if (activeTab === "archived") return post.status === "archived";
        return true;
      });
    }
    
    // Filter for scheduled posts if the toggle is on
    if (showScheduled && activeTab === "all") {
      filtered = filtered.filter(post => post.status === "scheduled");
    }
    
    return filtered;
  };

  const filteredPosts = getFilteredPosts();

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Church Blog</h1>
          <p className="text-muted-foreground">
            Manage and publish blog posts for your church app
          </p>
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setShowScheduled(!showScheduled)}>
                {showScheduled ? "✓ " : ""} Show Scheduled Posts
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button onClick={() => navigate("/app-member/blog/new")}>
            <Plus className="h-4 w-4 mr-2" />
            New Post
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Views</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,245</div>
            <p className="text-xs text-muted-foreground">+15% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Engagement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42%</div>
            <p className="text-xs text-muted-foreground">Comments & reactions</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" onValueChange={setActiveTab} className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Posts</TabsTrigger>
          <TabsTrigger value="published">Published</TabsTrigger>
          <TabsTrigger value="drafts">Drafts</TabsTrigger>
          <TabsTrigger value="archived">Archived</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-6 space-y-4">
          {filteredPosts.length > 0 ? (
            filteredPosts.map(post => (
              <Card key={post.id} className="cursor-pointer hover:bg-muted/50 transition-colors">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col">
                      <CardTitle>{post.title}</CardTitle>
                      {post.status === "scheduled" && (
                        <div className="flex items-center mt-1 text-amber-600 text-sm">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>Scheduled for {new Date(post.publishDate).toLocaleString()}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {post.status === "scheduled" && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCancelScheduled(post.id);
                          }}
                        >
                          <CalendarX className="h-4 w-4 mr-1 text-destructive" />
                          <span className="text-destructive">Cancel</span>
                        </Button>
                      )}
                      <div className="flex items-center text-muted-foreground text-sm">
                        <CalendarDays className="h-4 w-4 mr-1" />
                        {new Date(post.date).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <CardDescription>By {post.author}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-2 mb-4">{post.content}</p>
                  <div className="flex gap-4 text-muted-foreground">
                    {post.commentsEnabled && (
                      <div className="flex items-center">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        <span className="text-sm">{post.comments} comments</span>
                      </div>
                    )}
                    {post.reactionsEnabled && (
                      <div className="flex items-center">
                        <Heart className="h-4 w-4 mr-1" />
                        <span className="text-sm">{post.likes} likes</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="p-4 border rounded-md">
              <p className="text-center text-muted-foreground py-8">
                No blog posts to display. Create a new post to get started.
              </p>
            </div>
          )}
        </TabsContent>
        <TabsContent value="published" className="mt-6">
          <div className="p-4 border rounded-md">
            <p className="text-center text-muted-foreground py-8">
              All published posts will appear here.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="drafts" className="mt-6">
          <div className="p-4 border rounded-md">
            <p className="text-center text-muted-foreground py-8">
              Your draft posts will appear here.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="archived" className="mt-6">
          <div className="p-4 border rounded-md">
            <p className="text-center text-muted-foreground py-8">
              Your archived posts will appear here.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

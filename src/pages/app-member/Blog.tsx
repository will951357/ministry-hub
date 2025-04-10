
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  CalendarDays
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Blog() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");

  // Sample blog posts data
  const blogPosts = [
    {
      id: 1,
      title: "Easter Service Special Announcement",
      content: "Join us for our special Easter service this Sunday at 10 AM. We'll have a special program for children and a community lunch after the service.",
      author: "Pastor John",
      date: "2025-04-05",
      commentsEnabled: true,
      reactionsEnabled: true,
      comments: 12,
      likes: 24
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
      likes: 0
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
      likes: 18
    }
  ];

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
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
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
          {blogPosts.length > 0 ? (
            blogPosts.map(post => (
              <Card key={post.id} className="cursor-pointer hover:bg-muted/50 transition-colors">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle>{post.title}</CardTitle>
                    <div className="flex items-center text-muted-foreground text-sm">
                      <CalendarDays className="h-4 w-4 mr-1" />
                      {new Date(post.date).toLocaleDateString()}
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

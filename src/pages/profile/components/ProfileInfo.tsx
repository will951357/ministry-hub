
import React from 'react';
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Info } from "lucide-react";

export const ProfileInfo = () => {
  const { toast } = useToast();
  
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profile updated",
      description: "Your church profile information has been updated successfully.",
    });
  };
  
  return (
    <>
      <CardHeader>
        <CardTitle>Church Information</CardTitle>
        <CardDescription>
          Update your church profile details and public information.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSave}>
          <div className="space-y-6">
            {/* Church Logo */}
            <div className="flex flex-col items-center sm:flex-row gap-4 pt-2">
              <Avatar className="h-24 w-24">
                <AvatarImage src="https://github.com/shadcn.png" alt="Church logo" />
                <AvatarFallback className="text-xl">GC</AvatarFallback>
              </Avatar>
              <div className="flex flex-col space-y-2">
                <h3 className="text-lg font-medium">Church Logo</h3>
                <p className="text-sm text-muted-foreground">
                  Upload your church logo to be displayed throughout the application.
                </p>
                <div className="flex gap-2">
                  <Button type="button" variant="outline" size="sm">
                    Upload new logo
                  </Button>
                  <Button type="button" variant="ghost" size="sm">
                    Remove
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="grid gap-4 sm:grid-cols-2">
              {/* Church Name */}
              <div className="space-y-2">
                <Label htmlFor="churchName">Church Name</Label>
                <Input id="churchName" defaultValue="Grace Community Church" />
              </div>
              
              {/* Denomination */}
              <div className="space-y-2">
                <Label htmlFor="denomination">Denomination</Label>
                <Select defaultValue="nondenominational">
                  <SelectTrigger id="denomination">
                    <SelectValue placeholder="Select a denomination" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nondenominational">Non-denominational</SelectItem>
                    <SelectItem value="baptist">Baptist</SelectItem>
                    <SelectItem value="catholic">Catholic</SelectItem>
                    <SelectItem value="methodist">Methodist</SelectItem>
                    <SelectItem value="lutheran">Lutheran</SelectItem>
                    <SelectItem value="presbyterian">Presbyterian</SelectItem>
                    <SelectItem value="anglican">Anglican/Episcopalian</SelectItem>
                    <SelectItem value="pentecostal">Pentecostal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid gap-4 sm:grid-cols-2">
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="churchEmail">Contact Email</Label>
                <Input id="churchEmail" type="email" defaultValue="info@gracecommunity.org" />
              </div>
              
              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="churchPhone">Contact Phone</Label>
                <Input id="churchPhone" type="tel" defaultValue="(555) 123-4567" />
              </div>
            </div>
            
            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">About Your Church</Label>
              <Textarea 
                id="description" 
                rows={4}
                defaultValue="Grace Community Church is a vibrant congregation dedicated to spreading God's love through worship, fellowship, and service to the community."
              />
              <p className="text-sm text-muted-foreground">
                This description appears on your public profile and member app.
              </p>
            </div>
            
            {/* Address */}
            <div>
              <h3 className="text-lg font-medium mb-4">Location Information</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="address">Street Address</Label>
                  <Input id="address" defaultValue="123 Faith Avenue" />
                </div>
                
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" defaultValue="Graceville" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input id="state" defaultValue="California" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="zipCode">Zip Code</Label>
                    <Input id="zipCode" defaultValue="95123" />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Church Service Times */}
            <div>
              <h3 className="text-lg font-medium mb-4">Service Information</h3>
              <div className="space-y-2">
                <Label htmlFor="serviceTimes">Service Times</Label>
                <Textarea 
                  id="serviceTimes" 
                  rows={3}
                  defaultValue="Sunday: 9:00 AM, 11:00 AM\nWednesday: 7:00 PM Prayer Meeting"
                />
                <p className="text-sm text-muted-foreground">
                  Enter your regular service times. This information will be displayed to members and visitors.
                </p>
              </div>
            </div>
            
            {/* Social Media */}
            <div>
              <h3 className="text-lg font-medium mb-4">Social Media</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="website">Church Website</Label>
                  <Input id="website" type="url" defaultValue="https://gracecommunity.org" />
                </div>
                
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="facebook">Facebook</Label>
                    <Input id="facebook" defaultValue="facebook.com/gracecommunity" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="instagram">Instagram</Label>
                    <Input id="instagram" defaultValue="@gracecommunity" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between border-t p-6">
        <div className="flex items-center text-sm text-muted-foreground">
          <Info className="h-4 w-4 mr-1" />
          Last updated: May 1, 2025
        </div>
        <Button type="submit" onClick={handleSave}>Save Changes</Button>
      </CardFooter>
    </>
  );
};


import React, { useState } from 'react';
import { MainLayout } from "@/components/layout/MainLayout";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { ProfileInfo } from './components/ProfileInfo';
import { PlanInfo } from './components/PlanInfo';
import { AdminAccess } from './components/AdminAccess';

const ChurchProfile: React.FC = () => {
  const [activeTab, setActiveTab] = useState("profile");
  
  return (
    <MainLayout>
      <div className="container max-w-5xl mx-auto py-6">
        <h1 className="text-3xl font-bold mb-6">Church Profile Settings</h1>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="profile">Profile Information</TabsTrigger>
            <TabsTrigger value="plan">Plan Information</TabsTrigger>
            <TabsTrigger value="admins">System Administrators</TabsTrigger>
          </TabsList>
          
          <Card className="border-t-0 rounded-t-none shadow-md">
            <TabsContent value="profile" className="mt-0">
              <ProfileInfo />
            </TabsContent>
            
            <TabsContent value="plan" className="mt-0">
              <PlanInfo />
            </TabsContent>
            
            <TabsContent value="admins" className="mt-0">
              <AdminAccess />
            </TabsContent>
          </Card>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default ChurchProfile;

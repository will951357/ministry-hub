
import React from 'react';
import { MainLayout } from "@/components/layout/MainLayout";

const Events = () => {
  return (
    <MainLayout>
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-bold">Events</h1>
        <p className="text-muted-foreground mt-1">View and manage church events</p>
        
        <div className="mt-6">
          {/* Events list will go here */}
        </div>
      </div>
    </MainLayout>
  );
};

export default Events;

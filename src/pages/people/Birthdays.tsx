
import React from 'react';
import { MainLayout } from "@/components/layout/MainLayout";

const Birthdays = () => {
  return (
    <MainLayout>
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-bold">Birthdays</h1>
        <p className="text-muted-foreground mt-1">View and manage member birthdays</p>
        
        <div className="mt-6">
          {/* Birthdays list will go here */}
        </div>
      </div>
    </MainLayout>
  );
};

export default Birthdays;

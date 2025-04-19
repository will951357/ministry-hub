
import React from 'react';
import { MainLayout } from "@/components/layout/MainLayout";

const Appointments = () => {
  return (
    <MainLayout>
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-bold">Appointments</h1>
        <p className="text-muted-foreground mt-1">View and manage appointments</p>
        
        <div className="mt-6">
          {/* Appointments list will go here */}
        </div>
      </div>
    </MainLayout>
  );
};

export default Appointments;

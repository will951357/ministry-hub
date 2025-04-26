
import { Outlet } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { Toaster } from "@/components/ui/toaster";

export default function People() {
  return (
    <MainLayout>
      <div className="w-full min-w-0 overflow-x-auto">
        <Outlet />
      </div>
      <Toaster />
    </MainLayout>
  );
}

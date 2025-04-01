
import { Outlet } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { Toaster } from "@/components/ui/toaster";

export default function People() {
  return (
    <MainLayout>
      <Outlet />
      <Toaster />
    </MainLayout>
  );
}

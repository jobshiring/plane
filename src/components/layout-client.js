"use client";

import { Stack } from "@mui/material";
import { usePathname } from "next/navigation";
import { Toaster } from "react-hot-toast";
import Topbar from "@/layout/_main/topbar";
import Navbar from "@/layout/_main/navbar";
import Footer from "@/layout/_main/footer";
import { _currencies } from '@/_mock/currencies';

export default function LayoutClient({ children }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <>
      <Toaster position="top-center" />

      {!isAdminRoute && <Topbar currencies={_currencies} />}

      <Stack gap={2}>
        {!isAdminRoute && <Navbar />}
        {children}
        {!isAdminRoute && <Footer />}
      </Stack>
    </>
  );
}

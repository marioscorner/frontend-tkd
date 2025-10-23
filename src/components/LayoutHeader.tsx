"use client";

import { usePathname } from "next/navigation";
import HeaderPublic from "@/components/HeaderPublic";
import HeaderPrivate from "@/components/HeaderPrivate";

export default function LayoutHeader() {
  const pathname = usePathname();

  // Ajusta este prefijo si cambias tu zona privada
  const isPrivate = pathname.startsWith("/dashboard");

  return isPrivate ? <HeaderPrivate /> : <HeaderPublic />;
}

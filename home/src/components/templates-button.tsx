"use client";

import Link from "next/link";
import { LayoutGrid } from "lucide-react";

export function TemplatesButton() {
  return (
    <Link
      href="/templates"
      className="fixed bottom-8 right-8 z-50 flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all font-medium"
    >
      <LayoutGrid className="size-5" />
      <span>View All Templates</span>
    </Link>
  );
}

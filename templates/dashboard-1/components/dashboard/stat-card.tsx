"use client";

import { Users, Clipboard, Wallet, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

const iconMap = {
  users: Users,
  clipboard: Clipboard,
  wallet: Wallet,
  invoice: FileText,
};

interface StatCardProps {
  titleKey: string;
  value: string;
  icon: keyof typeof iconMap;
}

export function StatCard({ titleKey, value, icon }: StatCardProps) {
  const Icon = iconMap[icon];
  const t = useTranslations();

  // Extract the translation key (e.g., "stats.totalClients" -> ["stats", "totalClients"])
  const [namespace, key] = titleKey.split('.');
  const title = t(`${namespace}.${key}`);

  return (
    <div className="relative overflow-hidden rounded-xl border border-border bg-card p-4">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-medium text-foreground">{value}</p>
        </div>
        <div className="flex size-16 items-center justify-center rounded-lg bg-muted border border-border">
          <Icon className="size-8 text-muted-foreground" />
        </div>
      </div>
    </div>
  );
}


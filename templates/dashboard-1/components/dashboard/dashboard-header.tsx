"use client";

import { Download, Plus, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSwitcher } from "@/components/language-switcher";
import Link from "next/link";
import { useTranslations } from "next-intl";

export function DashboardHeader() {
  const t = useTranslations('header');

  return (
    <div className="w-full sticky top-0 z-10 flex items-center justify-between border-b border-border bg-background px-3 py-2.5 sm:px-4 sm:py-3 md:px-7">
      <div className="flex items-center gap-2 min-w-0 flex-1">
        <SidebarTrigger className="shrink-0" />
        <h1 className="text-base sm:text-xl md:text-2xl font-medium text-foreground truncate">
          {t('welcome')}
        </h1>
      </div>

      <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 shrink-0">
        <div className="hidden lg:flex items-center gap-3">
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="size-4" />
            <span className="hidden xl:inline">{t('export')}</span>
          </Button>
          <Button size="sm" className="gap-2">
            <Plus className="size-4" />
            <span className="hidden xl:inline">{t('newProject')}</span>
          </Button>
        </div>
        <Button variant="ghost" size="icon-sm" className="shrink-0" asChild>
          <Link
            href="https://github.com/Thimote147/square-ui/tree/master/templates/dashboard-1"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="size-4" />
          </Link>
        </Button>
        <LanguageSwitcher />
        <ThemeToggle />
      </div>
    </div>
  );
}

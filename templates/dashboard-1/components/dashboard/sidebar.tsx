"use client";

import { useState } from "react";
import {
  Search,
  Bell,
  Sparkles,
  LayoutDashboard,
  Calendar,
  Library,
  Users,
  Link as LinkIcon,
  Folder,
  ChevronDown,
  MessageSquare,
  Settings,
  HelpCircle,
  Check,
  Plus,
} from "lucide-react";
import { useTranslations } from "next-intl";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Kbd } from "@/components/ui/kbd";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function DashboardSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const [favoritesOpen, setFavoritesOpen] = useState(true);
  const t = useTranslations('sidebar');

  return (
    <Sidebar className="lg:border-r-0!" collapsible="offcanvas" {...props}>
      <SidebarHeader className="pb-0">
        <div className="px-2 py-3">
          <div className="flex items-center justify-between">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center justify-between gap-3 h-auto p-0 hover:bg-transparent w-full"
                >
                  <div className="flex items-center gap-2">
                    <div className="size-6 bg-linear-to-br from-purple-500 to-pink-600 rounded-sm shadow flex items-center justify-center text-white text-xs font-semibold">
                      SU
                    </div>
                    <span className="font-semibold">Square UI</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Image
                      src="/.png"
                      alt="thimotefetu.be"
                      className="size-5 object-cover rounded-full"
                      width={20}
                      height={20}
                    />
                    <ChevronDown className="size-3 text-muted-foreground" />
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="start">
                <DropdownMenuItem>
                  <div className="flex items-center gap-3 w-full">
                    <div className="size-6 bg-linear-to-br from-purple-500 to-pink-600 rounded-sm shadow flex items-center justify-center text-white text-xs font-semibold">
                      SU
                    </div>
                    <span className="font-semibold">Square UI</span>
                    <Check className="size-4 ml-auto" />
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <div className="flex items-center gap-3 w-full">
                    <div className="size-6 bg-linear-to-br from-blue-500 to-cyan-600 rounded-sm shadow flex items-center justify-center text-white text-xs font-semibold">
                      CI
                    </div>
                    <span>Circle</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <div className="flex items-center gap-3 w-full">
                    <div className="size-6 bg-linear-to-br from-orange-500 to-red-600 rounded-sm shadow flex items-center justify-center text-white text-xs font-semibold">
                      
                    </div>
                    <span>dev-ui</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Plus className="size-4" />
                  <span>{t('addNewTeam')}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="mt-4 relative">
            <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground z-10" />
            <Input
              type="search"
              placeholder={t('search')}
              className="pl-8 pr-8 h-8 text-sm text-muted-foreground placeholder:text-muted-foreground tracking-[-0.42px] bg-background"
            />
            <div className="flex items-center gap-0.5 rounded border border-border bg-sidebar px-1.5 py-0.5 shrink-0 absolute right-2 top-1/2 -translate-y-1/2">
              <span className="text-[10px] font-medium text-muted-foreground leading-none tracking-[-0.1px]">
                ⌘
              </span>
              <Kbd className="h-auto min-w-0 px-0 py-0 text-[10px] leading-none tracking-[-0.1px] bg-transparent border-0">
                K
              </Kbd>
            </div>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton className="h-7 text-sm text-muted-foreground">
                  <Bell className="size-4" />
                  <span>{t('notifications')}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="h-7 text-sm text-muted-foreground">
                  <Sparkles className="size-4" />
                  <span>{t('aiAssistant')}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive
                  className="h-7 text-sm text-muted-foreground"
                >
                  <LayoutDashboard className="size-4" />
                  <span>{t('dashboard')}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="h-7 text-sm text-muted-foreground">
                  <Calendar className="size-4" />
                  <span>{t('schedule')}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="h-7 text-sm text-muted-foreground">
                  <Library className="size-4" />
                  <span>{t('resources')}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="h-7 text-sm text-muted-foreground">
                  <Users className="size-4" />
                  <span>{t('clients')}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="h-7 text-sm text-muted-foreground">
                  <LinkIcon className="size-4" />
                  <span>{t('integrations')}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <Collapsible open={favoritesOpen} onOpenChange={setFavoritesOpen}>
            <CollapsibleTrigger asChild>
              <SidebarGroupLabel className="h-4 pb-4 pt-2 text-xs text-muted-foreground hover:text-foreground hover:bg-transparent cursor-pointer">
                <span>{t('favorites')}</span>
                <ChevronDown
                  className={cn(
                    "size-3 transition-transform ml-auto",
                    favoritesOpen && "rotate-180"
                  )}
                />
              </SidebarGroupLabel>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton className="h-7 text-sm text-muted-foreground">
                      <Folder className="size-4" />
                      <span>{t('contracts')}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton className="h-7 text-sm text-muted-foreground">
                      <Folder className="size-4" />
                      <span>{t('content')}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton className="h-7 text-sm text-muted-foreground">
                      <Folder className="size-4" />
                      <span>{t('summaries')}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </Collapsible>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <div className="space-y-1 mb-4">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton className="h-7 text-sm text-muted-foreground">
                <MessageSquare className="size-4" />
                <span>{t('feedback')}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton className="h-7 text-sm text-muted-foreground">
                <Settings className="size-4" />
                <span>{t('settings')}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton className="h-7 text-sm text-muted-foreground">
                <HelpCircle className="size-4" />
                <span>{t('helpCenter')}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>

      </SidebarFooter>
    </Sidebar>
  );
}

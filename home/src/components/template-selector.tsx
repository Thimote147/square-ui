"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Calendar,
  MessageSquare,
  Mail,
  LayoutDashboard,
  CheckSquare,
  CalendarClock,
  ChevronDown,
} from "lucide-react";

const templates = [
  {
    id: "calendar",
    name: "Calendar",
    icon: Calendar,
    path: "/templates/calendar",
    description: "Week view with event management",
  },
  {
    id: "chat",
    name: "Chat",
    icon: MessageSquare,
    path: "/templates/chat",
    description: "AI chat interface",
  },
  {
    id: "emails",
    name: "Emails",
    icon: Mail,
    path: "/templates/emails",
    description: "Email client interface",
  },
  {
    id: "dashboard",
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/templates/dashboard",
    description: "Statistics and charts",
  },
  {
    id: "task-management",
    name: "Task Management",
    icon: CheckSquare,
    path: "/templates/task-management",
    description: "Board interface for tasks",
  },
  {
    id: "projects-timeline",
    name: "Projects Timeline",
    icon: CalendarClock,
    path: "/templates/projects-timeline",
    description: "Timeline for projects",
  },
];

export function TemplateSelector() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const currentTemplate = templates.find((t) => pathname.startsWith(t.path));

  return (
    <div className="fixed top-4 left-4 z-50">
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-4 py-2 bg-background border border-border rounded-lg shadow-lg hover:bg-accent transition-colors"
        >
          {currentTemplate ? (
            <>
              <currentTemplate.icon className="size-4" />
              <span className="font-medium">{currentTemplate.name}</span>
            </>
          ) : (
            <span className="font-medium">Select Template</span>
          )}
          <ChevronDown
            className={cn(
              "size-4 transition-transform",
              isOpen && "rotate-180"
            )}
          />
        </button>

        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <div className="absolute top-full left-0 mt-2 w-64 bg-background border border-border rounded-lg shadow-xl z-50 overflow-hidden">
              <div className="p-2">
                <Link
                  href="/"
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md hover:bg-accent transition-colors",
                    pathname === "/" && "bg-accent"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  <LayoutDashboard className="size-4" />
                  <div>
                    <div className="font-medium text-sm">Home</div>
                    <div className="text-xs text-muted-foreground">
                      All templates
                    </div>
                  </div>
                </Link>
              </div>
              <div className="border-t border-border" />
              <div className="p-2 space-y-1">
                {templates.map((template) => (
                  <Link
                    key={template.id}
                    href={template.path}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-md hover:bg-accent transition-colors",
                      pathname.startsWith(template.path) && "bg-accent"
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    <template.icon className="size-4" />
                    <div>
                      <div className="font-medium text-sm">{template.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {template.description}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

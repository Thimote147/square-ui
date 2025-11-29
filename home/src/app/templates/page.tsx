"use client";

import Link from "next/link";
import {
  Calendar,
  MessageSquare,
  Mail,
  LayoutDashboard,
  CheckSquare,
  CalendarClock,
  Github,
  ExternalLink,
} from "lucide-react";

const templates = [
  {
    id: "calendar",
    name: "Calendar",
    icon: Calendar,
    port: 3001,
    description: "Modern calendar interface with week view, event management, and scheduling.",
    image: "/images/calendar.png",
    designer: { name: "Ryco", link: "https://x.com/_heyrico" },
    github: "https://github.com/ln-dev7/square-ui/tree/master/templates/calendar",
  },
  {
    id: "chat",
    name: "Chat",
    icon: MessageSquare,
    port: 3002,
    description: "Modern AI chat interface with conversation history and intelligent assistant.",
    image: "/images/chat.png",
    designer: { name: "Rico", link: "https://x.com/_heyrico" },
    github: "https://github.com/ln-dev7/square-ui/tree/master/templates/chat",
  },
  {
    id: "emails",
    name: "Emails",
    icon: Mail,
    port: 3003,
    description: "Modern email client interface with inbox, folders, and email details.",
    image: "/images/emails.png",
    designer: { name: "Rico", link: "https://x.com/_heyrico" },
    github: "https://github.com/ln-dev7/square-ui/tree/master/templates/emails",
  },
  {
    id: "dashboard-1",
    name: "Dashboard",
    icon: LayoutDashboard,
    port: 3004,
    description: "Modern dashboard interface with statistics, charts, people table, and recent documents.",
    image: "/images/dashboard-1.png",
    designer: { name: "Augustas", link: "https://x.com/AugustasDesign" },
    github: "https://github.com/ln-dev7/square-ui/tree/master/templates/dashboard-1",
  },
  {
    id: "task-management",
    name: "Task Management",
    icon: CheckSquare,
    port: 3005,
    description: "Simple board interface for managing tasks.",
    image: "/images/task-management.png",
    designer: { name: "Rico", link: "https://x.com/_heyrico" },
    github: "https://github.com/ln-dev7/square-ui/tree/master/templates/task-management",
  },
  {
    id: "projects-timeline",
    name: "Projects Timeline",
    icon: CalendarClock,
    port: 3006,
    description: "Timeline interface for managing projects.",
    image: "/images/projects-timeline.png",
    designer: { name: "Ryco", link: "https://x.com/_heyrico" },
    github: "https://github.com/ln-dev7/square-ui/tree/master/templates/projects-timeline",
  },
];

export default function TemplatesPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Square UI Templates
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Collection of beautifully crafted open-source layouts UI built with Next.js and shadcn/ui.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <div
              key={template.id}
              className="group relative overflow-hidden rounded-lg border border-border bg-card hover:shadow-lg transition-all"
            >
              <div className="aspect-video overflow-hidden bg-muted">
                {template.image && (
                  <img
                    src={template.image}
                    alt={template.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                )}
              </div>

              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-md bg-primary/10">
                    <template.icon className="size-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">{template.name}</h3>
                </div>

                <p className="text-sm text-muted-foreground mb-4">
                  {template.description}
                </p>

                <div className="text-xs text-muted-foreground mb-4">
                  Design by{" "}
                  <a
                    href={template.designer.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {template.designer.name}
                  </a>
                </div>

                <div className="flex gap-2">
                  <a
                    href={`http://localhost:${template.port}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors text-sm font-medium"
                  >
                    <ExternalLink className="size-4" />
                    Live Demo
                  </a>
                  <a
                    href={template.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-4 py-2 border border-border rounded-md hover:bg-accent transition-colors"
                  >
                    <Github className="size-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

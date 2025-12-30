'use client'

import { Image, Link } from 'next/link'
import {
  Calendar,
  MessageSquare,
  Mail,
  LayoutDashboard,
  CheckSquare,
  CalendarClock,
  Github,
  ExternalLink,
} from 'lucide-react'

const templates = [
  {
    id: 'calendar',
    name: 'Calendar',
    icon: Calendar,
    port: 3001,
    description:
      'Modern calendar interface with week view, event management, and scheduling.',
    image: '/images/calendar.png',
    designer: { name: 'Ryco', link: 'https://x.com/_heyrico' },
    github:
      'https://github.com/Thimote147/square-ui/tree/master/templates/calendar',
  },
  {
    id: 'chat',
    name: 'Chat',
    icon: MessageSquare,
    port: 3002,
    description:
      'Modern AI chat interface with conversation history and intelligent assistant.',
    image: '/images/chat.png',
    designer: { name: 'Rico', link: 'https://x.com/_heyrico' },
    github:
      'https://github.com/Thimote147/square-ui/tree/master/templates/chat',
  },
  {
    id: 'emails',
    name: 'Emails',
    icon: Mail,
    port: 3003,
    description:
      'Modern email client interface with inbox, folders, and email details.',
    image: '/images/emails.png',
    designer: { name: 'Rico', link: 'https://x.com/_heyrico' },
    github:
      'https://github.com/Thimote147/square-ui/tree/master/templates/emails',
  },
  {
    id: 'dashboard-1',
    name: 'Dashboard',
    icon: LayoutDashboard,
    port: 3004,
    description:
      'Modern dashboard interface with statistics, charts, people table, and recent documents.',
    image: '/images/dashboard-1.png',
    designer: { name: 'Augustas', link: 'https://x.com/AugustasDesign' },
    github:
      'https://github.com/Thimote147/square-ui/tree/master/templates/dashboard-1',
  },
  {
    id: 'task-management',
    name: 'Task Management',
    icon: CheckSquare,
    port: 3005,
    description: 'Simple board interface for managing tasks.',
    image: '/images/task-management.png',
    designer: { name: 'Rico', link: 'https://x.com/_heyrico' },
    github:
      'https://github.com/Thimote147/square-ui/tree/master/templates/task-management',
  },
  {
    id: 'projects-timeline',
    name: 'Projects Timeline',
    icon: CalendarClock,
    port: 3006,
    description: 'Timeline interface for managing projects.',
    image: '/images/projects-timeline.png',
    designer: { name: 'Ryco', link: 'https://x.com/_heyrico' },
    github:
      'https://github.com/Thimote147/square-ui/tree/master/templates/projects-timeline',
  },
]

export default function TemplatesPage() {
  return (
    <div className="bg-background min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight">
            Square UI Templates
          </h1>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            Collection of beautifully crafted open-source layouts UI built with
            Next.js and shadcn/ui.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {templates.map((template) => (
            <div
              key={template.id}
              className="group border-border bg-card relative overflow-hidden rounded-lg border transition-all hover:shadow-lg"
            >
              <div className="bg-muted aspect-video overflow-hidden">
                {template.image && (
                  <Image
                    src={template.image}
                    alt={template.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                )}
              </div>

              <div className="p-6">
                <div className="mb-3 flex items-center gap-3">
                  <div className="bg-primary/10 rounded-md p-2">
                    <template.icon className="text-primary size-5" />
                  </div>
                  <h3 className="text-xl font-semibold">{template.name}</h3>
                </div>

                <p className="text-muted-foreground mb-4 text-sm">
                  {template.description}
                </p>

                <div className="text-muted-foreground mb-4 text-xs">
                  Design by{' '}
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
                    className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex flex-1 items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors"
                  >
                    <ExternalLink className="size-4" />
                    Live Demo
                  </a>
                  <a
                    href={template.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-border hover:bg-accent inline-flex items-center justify-center rounded-md border px-4 py-2 transition-colors"
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
            className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-sm transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

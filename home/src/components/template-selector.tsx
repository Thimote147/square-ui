'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  Calendar,
  MessageSquare,
  Mail,
  LayoutDashboard,
  CheckSquare,
  CalendarClock,
  ChevronDown,
} from 'lucide-react'

const templates = [
  {
    id: 'calendar',
    name: 'Calendar',
    icon: Calendar,
    path: '/templates/calendar',
    description: 'Week view with event management',
  },
  {
    id: 'chat',
    name: 'Chat',
    icon: MessageSquare,
    path: '/templates/chat',
    description: 'AI chat interface',
  },
  {
    id: 'emails',
    name: 'Emails',
    icon: Mail,
    path: '/templates/emails',
    description: 'Email client interface',
  },
  {
    id: 'dashboard',
    name: 'Dashboard',
    icon: LayoutDashboard,
    path: '/templates/dashboard',
    description: 'Statistics and charts',
  },
  {
    id: 'task-management',
    name: 'Task Management',
    icon: CheckSquare,
    path: '/templates/task-management',
    description: 'Board interface for tasks',
  },
  {
    id: 'projects-timeline',
    name: 'Projects Timeline',
    icon: CalendarClock,
    path: '/templates/projects-timeline',
    description: 'Timeline for projects',
  },
]

export function TemplateSelector() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const currentTemplate = templates.find((t) => pathname.startsWith(t.path))

  return (
    <div className="fixed top-4 left-4 z-50">
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-background border-border hover:bg-accent flex items-center gap-2 rounded-lg border px-4 py-2 shadow-lg transition-colors"
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
              'size-4 transition-transform',
              isOpen && 'rotate-180',
            )}
          />
        </button>

        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <div className="bg-background border-border absolute top-full left-0 z-50 mt-2 w-64 overflow-hidden rounded-lg border shadow-xl">
              <div className="p-2">
                <Link
                  href="/"
                  className={cn(
                    'hover:bg-accent flex items-center gap-3 rounded-md px-3 py-2 transition-colors',
                    pathname === '/' && 'bg-accent',
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  <LayoutDashboard className="size-4" />
                  <div>
                    <div className="text-sm font-medium">Home</div>
                    <div className="text-muted-foreground text-xs">
                      All templates
                    </div>
                  </div>
                </Link>
              </div>
              <div className="border-border border-t" />
              <div className="space-y-1 p-2">
                {templates.map((template) => (
                  <Link
                    key={template.id}
                    href={template.path}
                    className={cn(
                      'hover:bg-accent flex items-center gap-3 rounded-md px-3 py-2 transition-colors',
                      pathname.startsWith(template.path) && 'bg-accent',
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    <template.icon className="size-4" />
                    <div>
                      <div className="text-sm font-medium">{template.name}</div>
                      <div className="text-muted-foreground text-xs">
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
  )
}

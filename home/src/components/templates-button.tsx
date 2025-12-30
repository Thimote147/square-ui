'use client'

import Link from 'next/link'
import { LayoutGrid } from 'lucide-react'

export function TemplatesButton() {
  return (
    <Link
      href="/templates"
      className="bg-primary text-primary-foreground fixed right-8 bottom-8 z-50 flex items-center gap-2 rounded-full px-6 py-3 font-medium shadow-lg transition-all hover:scale-105 hover:shadow-xl"
    >
      <LayoutGrid className="size-5" />
      <span>View All Templates</span>
    </Link>
  )
}

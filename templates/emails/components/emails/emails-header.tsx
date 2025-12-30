"use client";

import {
  MailIcon,
  Link2Icon,
  WandSparklesIcon,
  MoreVerticalIcon,
  MenuIcon,
  Github,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEmailsStore } from "@/store/emails-store";
import Link from "next/link";

interface EmailsHeaderProps {
  onMobileMenuClick?: () => void;
}

export function EmailsHeader({ onMobileMenuClick }: EmailsHeaderProps) {
  const { emails } = useEmailsStore();
  return (
    <div className="flex h-14 items-center justify-between border-b border-border bg-background px-3 md:px-6">
      <div className="flex flex-1 items-center gap-2 md:gap-4">
        <Button
          variant="ghost"
          size="icon-sm"
          className="md:hidden"
          onClick={onMobileMenuClick}
        >
          <MenuIcon className="size-5" />
        </Button>

        <div className="flex items-center gap-2 md:gap-2.5">
          <MailIcon className="size-4 text-foreground" />
          <p className="text-sm md:text-base font-normal tracking-tight text-foreground">
            Emails
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-2.5">
          <div className="size-1 rounded-full bg-muted-foreground/20" />
          <p className="text-sm md:text-base font-normal tracking-tight text-foreground">
            {emails.length} emails
          </p>
        </div>
      </div>

      <div className="hidden md:flex items-center gap-4">
        <div className="flex items-center gap-2">
          <p className="text-[13px] text-muted-foreground">
            Last update 3 days ago
          </p>
          <div className="flex items-center">
            {[1, 2, 3, 4].map((i) => (
              <Avatar
                key={i}
                className="-ml-2 size-5 border-2 border-background first:ml-0"
              >
                <AvatarImage
                  src={`https://api.dicebear.com/9.x/glass/svg?seed=User${i}`}
                />
                <AvatarFallback>U{i}</AvatarFallback>
              </Avatar>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button variant="secondary" size="sm" className="h-[30px]" asChild>
            <Link
              href="https://github.com/Thimote147/square-ui/tree/master/templates/emails"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github />
              GitHub
            </Link>
          </Button>
        </div>
      </div>

      <div className="flex md:hidden items-center gap-2">
        <Button variant="ghost" size="icon-sm" asChild>
          <Link
            href="https://github.com/Thimote147/square-ui/tree/master/templates/emails"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="size-4" />
          </Link>
        </Button>

        <ThemeToggle />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon-sm">
              <MoreVerticalIcon className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem>
              <Link2Icon className="size-4" />
              <span>Share</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <div className="px-2 py-1.5">
              <p className="text-xs text-muted-foreground">
                {emails.length} emails
              </p>
              <p className="text-xs text-muted-foreground">
                Last update 3 days ago
              </p>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

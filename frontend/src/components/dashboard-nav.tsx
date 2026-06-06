"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface Tab { id: string; label: string; icon: string; href: string; }

export function DashboardNav({
  tabs,
  accentColor,
  theme = "light",
}: {
  tabs: Tab[];
  accentColor: string;
  theme?: "light" | "dark";
}) {
  const pathname = usePathname();

  return (
    <div
      className="flex gap-1 overflow-x-auto pb-1"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      {tabs.map(tab => {
        const active = pathname === tab.href || (tab.href.length > 20 && pathname.startsWith(tab.href));
        return (
          <Link
            key={tab.id}
            href={tab.href}
            className="flex-shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200"
            style={
              active
                ? { background: `${accentColor}18`, color: accentColor, border: `1px solid ${accentColor}35` }
                : {
                    background: theme === "dark" ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)",
                    color: theme === "dark" ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.35)",
                    border: "1px solid transparent",
                  }
            }
          >
            <span>{tab.icon}</span>
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}

"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"
import { Menu, X } from "lucide-react"

const navItems = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Transactions", href: "/transactions" },
  { name: "Budgets", href: "/budgets" },
]

export function Navbar() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <nav className="bg-card/80 backdrop-blur-md border-b border-border/40 shadow-lg sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent animate-fade-in">
              <span className="hidden sm:inline">Dev Money Metrics</span>
              <span className="sm:hidden">Finance App</span>
            </h1>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <div className="flex space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "relative inline-flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-300 group",
                    pathname === item.href
                      ? "text-primary bg-primary/10 shadow-lg shadow-primary/20"
                      : "text-muted-foreground hover:text-primary hover:bg-primary/5 hover:shadow-md hover:shadow-primary/10",
                  )}
                >
                  {item.name}
                  <span
                    className={cn(
                      "absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-accent transform transition-transform duration-300",
                      pathname === item.href ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                    )}
                  />
                </Link>
              ))}
            </div>
            <ThemeToggle />
          </div>

          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all duration-300"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-card/95 backdrop-blur-md border-t border-border/40 shadow-lg animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "block px-3 py-2 text-base font-medium rounded-lg transition-all duration-300",
                  pathname === item.href
                    ? "text-primary bg-primary/10 shadow-lg shadow-primary/20"
                    : "text-muted-foreground hover:text-primary hover:bg-primary/5",
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}

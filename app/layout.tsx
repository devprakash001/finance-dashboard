import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"
import { FinanceProvider } from "@/context/finance-context"
import { ThemeProvider } from "@/components/theme-provider"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Personal Finance Dashboard",
  description: "Track your income, expenses, and budgets",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body className="min-h-screen flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange={false}>
          <FinanceProvider>
            <div className="flex-1">{children}</div>
            <Footer />
          </FinanceProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

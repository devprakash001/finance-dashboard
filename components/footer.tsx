import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-card/50 backdrop-blur-sm mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center justify-center space-y-2">
          <p className="text-sm text-muted-foreground">
            Built by{" "}
            <Link
              href="https://devprakash001.github.io/Portfolio/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-primary hover:text-accent transition-colors duration-300 hover:underline decoration-2 underline-offset-4"
            >
              Dev Prakash Singh
            </Link>
          </p>
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <span>© 2025 Personal Finance Dashboard</span>
            <span>•</span>
            <span>Futuristic Design</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

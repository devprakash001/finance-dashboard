import { Navbar } from "@/components/navbar"
import { SummaryCards } from "@/components/summary-cards"
import { SpendingLineChart } from "@/components/charts/spending-line-chart"
import { ExpensePieChart } from "@/components/charts/expense-pie-chart"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-7xl mx-auto py-4 sm:py-6 lg:py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8 sm:mb-12 animate-fade-in">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mb-2">
            Financial Command Center
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base lg:text-lg">
            Real-time overview of your digital assets
          </p>
          <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-primary to-accent rounded-full mt-3 sm:mt-4"></div>
        </div>

        <div className="mb-8 sm:mb-12 animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <SummaryCards />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          <Card
            className="glass-morphism border-border/20 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 animate-slide-up group"
            style={{ animationDelay: "0.4s" }}
          >
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="text-lg sm:text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                Spending Trajectory
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 sm:p-6">
              <SpendingLineChart />
            </CardContent>
          </Card>

          <Card
            className="glass-morphism border-border/20 hover:shadow-2xl hover:shadow-accent/10 transition-all duration-500 animate-slide-up group"
            style={{ animationDelay: "0.6s" }}
          >
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="text-lg sm:text-xl font-semibold text-foreground group-hover:text-accent transition-colors duration-300">
                Category Distribution
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 sm:p-6">
              <ExpensePieChart />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

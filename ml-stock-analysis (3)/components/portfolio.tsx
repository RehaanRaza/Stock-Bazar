"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Wallet, PieChart, Target, IndianRupee } from "lucide-react"

interface PortfolioProps {
  portfolio: any[]
  liveData: any
  balance: number
}

export default function Portfolio({ portfolio, liveData, balance }: PortfolioProps) {
  const totalInvestment = portfolio.reduce((sum, stock) => sum + stock.quantity * stock.avgPrice, 0)
  const currentValue = portfolio.reduce((sum, stock) => {
    const currentPrice = liveData[stock.symbol]?.price || stock.avgPrice
    return sum + stock.quantity * currentPrice
  }, 0)
  const totalPnL = currentValue - totalInvestment
  const totalPnLPercent = totalInvestment > 0 ? (totalPnL / totalInvestment) * 100 : 0

  const portfolioWithCurrentData = portfolio.map((stock) => {
    const liveStock = liveData[stock.symbol]
    const currentPrice = liveStock?.price || stock.avgPrice
    const currentValue = stock.quantity * currentPrice
    const pnl = currentValue - stock.quantity * stock.avgPrice
    const pnlPercent = ((currentPrice - stock.avgPrice) / stock.avgPrice) * 100

    return {
      ...stock,
      currentPrice,
      currentValue,
      pnl,
      pnlPercent,
      name: liveStock?.name || stock.symbol,
    }
  })

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="bg-gradient-to-r from-white/95 to-emerald-50/95 backdrop-blur-xl border-emerald-200 shadow-2xl">
        <CardHeader>
          <CardTitle className="text-gray-900 flex items-center">
            <PieChart className="h-5 w-5 mr-2" />
            Portfolio Overview
          </CardTitle>
          <CardDescription className="text-gray-800">Your current holdings and performance</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Portfolio Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200">
              <div className="flex items-center space-x-2 mb-2">
                <Wallet className="h-4 w-4 text-emerald-600" />
                <span className="text-sm text-gray-700">Available Balance</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">₹{balance.toLocaleString()}</div>
            </div>

            <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
              <div className="flex items-center space-x-2 mb-2">
                <Target className="h-4 w-4 text-blue-600" />
                <span className="text-sm text-gray-700">Invested</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">₹{totalInvestment.toLocaleString()}</div>
            </div>

            <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
              <div className="flex items-center space-x-2 mb-2">
                <IndianRupee className="h-4 w-4 text-purple-600" />
                <span className="text-sm text-purple-600">Current Value</span>
              </div>
              <div className="text-2xl font-bold text-purple-800">₹{currentValue.toLocaleString()}</div>
            </div>

            <div
              className={`p-4 rounded-xl border ${
                totalPnL >= 0 ? "bg-emerald-50 border-emerald-200" : "bg-red-50 border-red-200"
              }`}
            >
              <div className="flex items-center space-x-2 mb-2">
                {totalPnL >= 0 ? (
                  <TrendingUp className="h-4 w-4 text-emerald-600" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-600" />
                )}
                <span className={`text-sm ${totalPnL >= 0 ? "text-emerald-600" : "text-red-600"}`}>Total P&L</span>
              </div>
              <div className={`text-2xl font-bold ${totalPnL >= 0 ? "text-emerald-800" : "text-red-800"}`}>
                {totalPnL >= 0 ? "+" : ""}₹{totalPnL.toLocaleString()}
              </div>
              <div className={`text-sm ${totalPnL >= 0 ? "text-emerald-600" : "text-red-600"}`}>
                {totalPnLPercent >= 0 ? "+" : ""}
                {totalPnLPercent.toFixed(2)}%
              </div>
            </div>
          </div>

          {/* Holdings */}
          {portfolio.length > 0 ? (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Holdings</h3>
              <div className="space-y-3">
                {portfolioWithCurrentData.map((stock, index) => (
                  <motion.div
                    key={stock.symbol}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/80 p-4 rounded-xl border border-emerald-200 hover:bg-white/95 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold text-sm">{stock.symbol.slice(0, 2)}</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{stock.symbol}</h4>
                          <p className="text-sm text-gray-800">{stock.name}</p>
                          <div className="flex items-center space-x-4 text-xs text-emerald-500 mt-1">
                            <span>Qty: {stock.quantity}</span>
                            <span>Avg: ₹{stock.avgPrice.toFixed(2)}</span>
                            <span>LTP: ₹{stock.currentPrice.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-900">₹{stock.currentValue.toLocaleString()}</div>
                        <div
                          className={`flex items-center justify-end text-sm ${
                            stock.pnl >= 0 ? "text-emerald-600" : "text-red-600"
                          }`}
                        >
                          {stock.pnl >= 0 ? (
                            <TrendingUp className="h-3 w-3 mr-1" />
                          ) : (
                            <TrendingDown className="h-3 w-3 mr-1" />
                          )}
                          {stock.pnl >= 0 ? "+" : ""}₹{stock.pnl.toFixed(2)}
                        </div>
                        <Badge
                          variant={stock.pnl >= 0 ? "default" : "destructive"}
                          className={`text-xs ${
                            stock.pnl >= 0
                              ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                              : "bg-red-100 text-red-700 border-red-200"
                          }`}
                        >
                          {stock.pnlPercent >= 0 ? "+" : ""}
                          {stock.pnlPercent.toFixed(2)}%
                        </Badge>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <PieChart className="h-16 w-16 text-emerald-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Holdings Yet</h3>
              <p className="text-gray-800">Start trading to build your portfolio</p>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}

"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ShoppingCart, TrendingDown, AlertTriangle, CheckCircle } from "lucide-react"

interface TradingPanelProps {
  stockData: any
  onTrade: (type: "BUY" | "SELL", symbol: string, quantity: number, price: number) => void
  balance: number
  portfolio: any[]
}

export default function TradingPanel({ stockData, onTrade, balance, portfolio }: TradingPanelProps) {
  const [quantity, setQuantity] = useState(1)
  const [orderType, setOrderType] = useState("MARKET")
  const [limitPrice, setLimitPrice] = useState(stockData?.price || 0)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [pendingOrder, setPendingOrder] = useState(null)

  const currentHolding = portfolio.find((stock) => stock.symbol === stockData?.symbol)
  const currentPrice = stockData?.price || 0
  const totalAmount = quantity * currentPrice
  const brokerage = totalAmount * 0.0005 // 0.05% brokerage
  const totalCost = totalAmount + brokerage

  const handleBuy = () => {
    if (balance >= totalCost) {
      setPendingOrder({ type: "BUY", symbol: stockData.symbol, quantity, price: currentPrice })
      setShowConfirmation(true)
    }
  }

  const handleSell = () => {
    if (currentHolding && currentHolding.quantity >= quantity) {
      setPendingOrder({ type: "SELL", symbol: stockData.symbol, quantity, price: currentPrice })
      setShowConfirmation(true)
    }
  }

  const confirmTrade = () => {
    if (pendingOrder) {
      onTrade(pendingOrder.type, pendingOrder.symbol, pendingOrder.quantity, pendingOrder.price)
      setShowConfirmation(false)
      setPendingOrder(null)
      setQuantity(1)
    }
  }

  const maxBuyQuantity = Math.floor(balance / (currentPrice + currentPrice * 0.0005))
  const maxSellQuantity = currentHolding?.quantity || 0

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
      <Card className="bg-gradient-to-br from-white/95 to-emerald-50/95 backdrop-blur-xl border-emerald-200 shadow-2xl">
        <CardHeader>
          <CardTitle className="text-gray-900 flex items-center">
            <ShoppingCart className="h-5 w-5 mr-2" />
            Quick Trade
          </CardTitle>
          <CardDescription className="text-gray-800">Buy or sell {stockData?.symbol} instantly</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Current Holdings */}
          {currentHolding && (
            <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200">
              <h4 className="font-semibold text-gray-900 mb-2">Current Holdings</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-gray-700">Quantity:</span>
                  <span className="font-bold text-gray-900 ml-2">{currentHolding.quantity}</span>
                </div>
                <div>
                  <span className="text-gray-700">Avg Price:</span>
                  <span className="font-bold text-gray-900 ml-2">₹{currentHolding.avgPrice.toFixed(2)}</span>
                </div>
                <div>
                  <span className="text-emerald-600">Current Value:</span>
                  <span className="font-bold text-emerald-800 ml-2">
                    ₹{(currentHolding.quantity * currentPrice).toLocaleString()}
                  </span>
                </div>
                <div>
                  <span className="text-emerald-600">P&L:</span>
                  <span
                    className={`font-bold ml-2 ${
                      currentPrice > currentHolding.avgPrice ? "text-emerald-600" : "text-red-600"
                    }`}
                  >
                    ₹{((currentPrice - currentHolding.avgPrice) * currentHolding.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Order Form */}
          <Tabs defaultValue="buy" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2 bg-emerald-100">
              <TabsTrigger value="buy" className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white">
                BUY
              </TabsTrigger>
              <TabsTrigger value="sell" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
                SELL
              </TabsTrigger>
            </TabsList>

            <TabsContent value="buy" className="space-y-4">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-900">Quantity</label>
                  <div className="flex items-center space-x-2 mt-1">
                    <Input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, Number.parseInt(e.target.value) || 1))}
                      min="1"
                      max={maxBuyQuantity}
                      className="border-emerald-200 focus:border-emerald-400"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setQuantity(maxBuyQuantity)}
                      className="text-emerald-600 border-emerald-300"
                    >
                      Max
                    </Button>
                  </div>
                  <p className="text-xs text-gray-700 mt-1">Max: {maxBuyQuantity} shares</p>
                </div>

                <div className="bg-emerald-50 p-4 rounded-lg space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-700">Price per share:</span>
                    <span className="font-semibold text-gray-900">₹{currentPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-700">Total amount:</span>
                    <span className="font-semibold text-gray-900">₹{totalAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-emerald-600">Brokerage (0.05%):</span>
                    <span className="font-semibold text-emerald-800">₹{brokerage.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-base font-bold border-t border-emerald-200 pt-2">
                    <span className="text-emerald-700">Total cost:</span>
                    <span className="text-emerald-800">₹{totalCost.toLocaleString()}</span>
                  </div>
                </div>

                <Button
                  onClick={handleBuy}
                  disabled={balance < totalCost || quantity <= 0}
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-3"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  BUY {quantity} shares
                </Button>

                {balance < totalCost && (
                  <div className="flex items-center space-x-2 text-red-600 text-sm">
                    <AlertTriangle className="h-4 w-4" />
                    <span>Insufficient balance</span>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="sell" className="space-y-4">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-900">Quantity</label>
                  <div className="flex items-center space-x-2 mt-1">
                    <Input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, Number.parseInt(e.target.value) || 1))}
                      min="1"
                      max={maxSellQuantity}
                      className="border-emerald-200 focus:border-emerald-400"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setQuantity(maxSellQuantity)}
                      className="text-red-600 border-red-300"
                      disabled={maxSellQuantity === 0}
                    >
                      Max
                    </Button>
                  </div>
                  <p className="text-xs text-gray-700 mt-1">Available: {maxSellQuantity} shares</p>
                </div>

                <div className="bg-red-50 p-4 rounded-lg space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-red-600">Price per share:</span>
                    <span className="font-semibold text-red-800">₹{currentPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-red-600">Total amount:</span>
                    <span className="font-semibold text-red-800">₹{totalAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-red-600">Brokerage (0.05%):</span>
                    <span className="font-semibold text-red-800">₹{brokerage.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-base font-bold border-t border-red-200 pt-2">
                    <span className="text-red-700">You'll receive:</span>
                    <span className="text-red-800">₹{(totalAmount - brokerage).toLocaleString()}</span>
                  </div>
                </div>

                <Button
                  onClick={handleSell}
                  disabled={maxSellQuantity < quantity || quantity <= 0}
                  className="w-full bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-semibold py-3"
                >
                  <TrendingDown className="h-4 w-4 mr-2" />
                  SELL {quantity} shares
                </Button>

                {maxSellQuantity === 0 && (
                  <div className="flex items-center space-x-2 text-red-600 text-sm">
                    <AlertTriangle className="h-4 w-4" />
                    <span>No shares to sell</span>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>

          {/* Market Info */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-emerald-200">
            <div className="text-center">
              <div className="text-sm text-gray-700">Day High</div>
              <div className="font-bold text-gray-900">₹{stockData?.high?.toFixed(2)}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-700">Day Low</div>
              <div className="font-bold text-gray-900">₹{stockData?.low?.toFixed(2)}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Confirmation Modal */}
      {showConfirmation && pendingOrder && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl p-6 max-w-md mx-4 shadow-2xl"
          >
            <div className="text-center mb-6">
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                  pendingOrder.type === "BUY" ? "bg-emerald-100" : "bg-red-100"
                }`}
              >
                {pendingOrder.type === "BUY" ? (
                  <ShoppingCart className="h-8 w-8 text-emerald-600" />
                ) : (
                  <TrendingDown className="h-8 w-8 text-red-600" />
                )}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Confirm Order</h3>
              <p className="text-gray-600">
                {pendingOrder.type} {pendingOrder.quantity} shares of {pendingOrder.symbol}
              </p>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Quantity:</span>
                <span className="font-semibold">{pendingOrder.quantity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Price:</span>
                <span className="font-semibold">₹{pendingOrder.price.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Amount:</span>
                <span className="font-semibold">₹{(pendingOrder.quantity * pendingOrder.price).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Brokerage:</span>
                <span className="font-semibold">
                  ₹{(pendingOrder.quantity * pendingOrder.price * 0.0005).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-2">
                <span>{pendingOrder.type === "BUY" ? "Total Cost:" : "You'll Receive:"}</span>
                <span>
                  ₹
                  {pendingOrder.type === "BUY"
                    ? (pendingOrder.quantity * pendingOrder.price * 1.0005).toLocaleString()
                    : (pendingOrder.quantity * pendingOrder.price * 0.9995).toLocaleString()}
                </span>
              </div>
            </div>

            <div className="flex space-x-3">
              <Button variant="outline" onClick={() => setShowConfirmation(false)} className="flex-1 border-gray-300">
                Cancel
              </Button>
              <Button
                onClick={confirmTrade}
                className={`flex-1 ${
                  pendingOrder.type === "BUY" ? "bg-emerald-600 hover:bg-emerald-700" : "bg-red-600 hover:bg-red-700"
                } text-white`}
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Confirm {pendingOrder.type}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  )
}

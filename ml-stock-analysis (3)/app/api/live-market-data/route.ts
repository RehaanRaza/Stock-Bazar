import { type NextRequest, NextResponse } from "next/server"

// Indian stock exchanges with real company data
const exchangeData = {
  NSE: {
    name: "National Stock Exchange",
    country: "India",
    currency: "₹",
    timezone: "IST",
    companies: [
      {
        symbol: "RELIANCE",
        name: "Reliance Industries Ltd",
        sector: "Oil & Gas",
        basePrice: 2450.75,
        marketCap: 16500000000000,
      },
      {
        symbol: "TCS",
        name: "Tata Consultancy Services",
        sector: "IT Services",
        basePrice: 3650.4,
        marketCap: 13500000000000,
      },
      {
        symbol: "HDFCBANK",
        name: "HDFC Bank Limited",
        sector: "Banking",
        basePrice: 1580.25,
        marketCap: 12000000000000,
      },
      { symbol: "INFY", name: "Infosys Limited", sector: "IT Services", basePrice: 1420.8, marketCap: 5900000000000 },
      {
        symbol: "HINDUNILVR",
        name: "Hindustan Unilever Ltd",
        sector: "FMCG",
        basePrice: 2380.5,
        marketCap: 5600000000000,
      },
      {
        symbol: "ICICIBANK",
        name: "ICICI Bank Limited",
        sector: "Banking",
        basePrice: 950.3,
        marketCap: 6700000000000,
      },
      {
        symbol: "BHARTIARTL",
        name: "Bharti Airtel Limited",
        sector: "Telecom",
        basePrice: 1180.6,
        marketCap: 6500000000000,
      },
      { symbol: "ITC", name: "ITC Limited", sector: "FMCG", basePrice: 420.75, marketCap: 5200000000000 },
      { symbol: "SBIN", name: "State Bank of India", sector: "Banking", basePrice: 580.4, marketCap: 5200000000000 },
      {
        symbol: "LT",
        name: "Larsen & Toubro Ltd",
        sector: "Construction",
        basePrice: 3250.8,
        marketCap: 4600000000000,
      },
      {
        symbol: "KOTAKBANK",
        name: "Kotak Mahindra Bank",
        sector: "Banking",
        basePrice: 1750.25,
        marketCap: 3500000000000,
      },
      {
        symbol: "HCLTECH",
        name: "HCL Technologies Ltd",
        sector: "IT Services",
        basePrice: 1280.6,
        marketCap: 3400000000000,
      },
      {
        symbol: "ASIANPAINT",
        name: "Asian Paints Limited",
        sector: "Paints",
        basePrice: 3150.4,
        marketCap: 3000000000000,
      },
      {
        symbol: "MARUTI",
        name: "Maruti Suzuki India Ltd",
        sector: "Automobile",
        basePrice: 10800.75,
        marketCap: 3300000000000,
      },
      {
        symbol: "BAJFINANCE",
        name: "Bajaj Finance Limited",
        sector: "NBFC",
        basePrice: 6850.25,
        marketCap: 4200000000000,
      },
      { symbol: "WIPRO", name: "Wipro Limited", sector: "IT Services", basePrice: 420.8, marketCap: 2300000000000 },
      {
        symbol: "NESTLEIND",
        name: "Nestle India Limited",
        sector: "FMCG",
        basePrice: 22500.4,
        marketCap: 2200000000000,
      },
      {
        symbol: "ULTRACEMCO",
        name: "UltraTech Cement Ltd",
        sector: "Cement",
        basePrice: 8950.6,
        marketCap: 2600000000000,
      },
      {
        symbol: "TITAN",
        name: "Titan Company Limited",
        sector: "Jewellery",
        basePrice: 3180.25,
        marketCap: 2800000000000,
      },
      {
        symbol: "POWERGRID",
        name: "Power Grid Corp of India",
        sector: "Power",
        basePrice: 220.75,
        marketCap: 2100000000000,
      },
      { symbol: "NTPC", name: "NTPC Limited", sector: "Power", basePrice: 280.4, marketCap: 2700000000000 },
      {
        symbol: "TECHM",
        name: "Tech Mahindra Limited",
        sector: "IT Services",
        basePrice: 1150.8,
        marketCap: 1100000000000,
      },
      {
        symbol: "SUNPHARMA",
        name: "Sun Pharmaceutical Ind",
        sector: "Pharma",
        basePrice: 1680.25,
        marketCap: 4000000000000,
      },
      { symbol: "JSWSTEEL", name: "JSW Steel Limited", sector: "Steel", basePrice: 850.6, marketCap: 2100000000000 },
      {
        symbol: "TATAMOTORS",
        name: "Tata Motors Limited",
        sector: "Automobile",
        basePrice: 780.4,
        marketCap: 2900000000000,
      },
      {
        symbol: "INDUSINDBK",
        name: "IndusInd Bank Limited",
        sector: "Banking",
        basePrice: 1280.75,
        marketCap: 1000000000000,
      },
      {
        symbol: "BAJAJFINSV",
        name: "Bajaj Finserv Limited",
        sector: "Financial Services",
        basePrice: 1650.25,
        marketCap: 2600000000000,
      },
      {
        symbol: "ONGC",
        name: "Oil & Natural Gas Corp",
        sector: "Oil & Gas",
        basePrice: 180.8,
        marketCap: 2300000000000,
      },
      { symbol: "AXISBANK", name: "Axis Bank Limited", sector: "Banking", basePrice: 1080.4, marketCap: 3300000000000 },
      {
        symbol: "DRREDDY",
        name: "Dr Reddys Laboratories",
        sector: "Pharma",
        basePrice: 1250.6,
        marketCap: 2100000000000,
      },
    ],
  },
  BSE: {
    name: "Bombay Stock Exchange",
    country: "India",
    currency: "₹",
    timezone: "IST",
    companies: [
      {
        symbol: "500325",
        name: "Reliance Industries",
        sector: "Oil & Gas",
        basePrice: 2450.75,
        marketCap: 16500000000000,
      },
      {
        symbol: "532540",
        name: "Tata Consultancy Services",
        sector: "IT Services",
        basePrice: 3650.4,
        marketCap: 13500000000000,
      },
      { symbol: "500180", name: "HDFC Bank", sector: "Banking", basePrice: 1580.25, marketCap: 12000000000000 },
      { symbol: "500209", name: "Infosys", sector: "IT Services", basePrice: 1420.8, marketCap: 5900000000000 },
      { symbol: "500696", name: "Hindustan Unilever", sector: "FMCG", basePrice: 2380.5, marketCap: 5600000000000 },
      { symbol: "532174", name: "ICICI Bank", sector: "Banking", basePrice: 950.3, marketCap: 6700000000000 },
      { symbol: "532454", name: "Bharti Airtel", sector: "Telecom", basePrice: 1180.6, marketCap: 6500000000000 },
      { symbol: "500875", name: "ITC", sector: "FMCG", basePrice: 420.75, marketCap: 5200000000000 },
      { symbol: "500112", name: "State Bank of India", sector: "Banking", basePrice: 580.4, marketCap: 5200000000000 },
      {
        symbol: "500510",
        name: "Larsen & Toubro",
        sector: "Construction",
        basePrice: 3250.8,
        marketCap: 4600000000000,
      },
      {
        symbol: "500247",
        name: "Kotak Mahindra Bank",
        sector: "Banking",
        basePrice: 1750.25,
        marketCap: 3500000000000,
      },
      {
        symbol: "532281",
        name: "HCL Technologies",
        sector: "IT Services",
        basePrice: 1280.6,
        marketCap: 3400000000000,
      },
      { symbol: "500820", name: "Asian Paints", sector: "Paints", basePrice: 3150.4, marketCap: 3000000000000 },
      {
        symbol: "532500",
        name: "Maruti Suzuki India",
        sector: "Automobile",
        basePrice: 10800.75,
        marketCap: 3300000000000,
      },
      { symbol: "500034", name: "Bajaj Finance", sector: "NBFC", basePrice: 6850.25, marketCap: 4200000000000 },
    ],
  },
  MCX: {
    name: "Multi Commodity Exchange",
    country: "India",
    currency: "₹",
    timezone: "IST",
    companies: [
      { symbol: "GOLD", name: "Gold", sector: "Precious Metals", basePrice: 62500.0, marketCap: 0 },
      { symbol: "SILVER", name: "Silver", sector: "Precious Metals", basePrice: 72800.0, marketCap: 0 },
      { symbol: "CRUDE", name: "Crude Oil", sector: "Energy", basePrice: 6850.0, marketCap: 0 },
      { symbol: "NATURALGAS", name: "Natural Gas", sector: "Energy", basePrice: 285.5, marketCap: 0 },
      { symbol: "COPPER", name: "Copper", sector: "Base Metals", basePrice: 785.2, marketCap: 0 },
      { symbol: "ZINC", name: "Zinc", sector: "Base Metals", basePrice: 265.8, marketCap: 0 },
      { symbol: "ALUMINIUM", name: "Aluminium", sector: "Base Metals", basePrice: 225.4, marketCap: 0 },
      { symbol: "LEAD", name: "Lead", sector: "Base Metals", basePrice: 185.6, marketCap: 0 },
      { symbol: "NICKEL", name: "Nickel", sector: "Base Metals", basePrice: 1850.2, marketCap: 0 },
      { symbol: "COTTON", name: "Cotton", sector: "Agri Commodities", basePrice: 58500.0, marketCap: 0 },
    ],
  },
  NCDEX: {
    name: "National Commodity Exchange",
    country: "India",
    currency: "₹",
    timezone: "IST",
    companies: [
      { symbol: "WHEAT", name: "Wheat", sector: "Agri Commodities", basePrice: 2650.0, marketCap: 0 },
      { symbol: "RICE", name: "Rice", sector: "Agri Commodities", basePrice: 3850.0, marketCap: 0 },
      { symbol: "SUGAR", name: "Sugar", sector: "Agri Commodities", basePrice: 4250.0, marketCap: 0 },
      { symbol: "TURMERIC", name: "Turmeric", sector: "Spices", basePrice: 15800.0, marketCap: 0 },
      { symbol: "CORIANDER", name: "Coriander", sector: "Spices", basePrice: 7850.0, marketCap: 0 },
      { symbol: "JEERA", name: "Cumin Seeds", sector: "Spices", basePrice: 28500.0, marketCap: 0 },
      { symbol: "CHANA", name: "Chana", sector: "Pulses", basePrice: 5850.0, marketCap: 0 },
      { symbol: "SOYBEAN", name: "Soybean", sector: "Oilseeds", basePrice: 4650.0, marketCap: 0 },
      { symbol: "MUSTARD", name: "Mustard Seeds", sector: "Oilseeds", basePrice: 5250.0, marketCap: 0 },
      { symbol: "CASTOR", name: "Castor Seeds", sector: "Oilseeds", basePrice: 6850.0, marketCap: 0 },
    ],
  },
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const exchange = searchParams.get("exchange") || "NSE"

    const exchangeInfo = exchangeData[exchange]
    if (!exchangeInfo) {
      return NextResponse.json({ error: "Exchange not found" }, { status: 404 })
    }

    // Indian market hours: 9:15 AM - 3:30 PM IST
    const now = new Date()
    const istTime = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }))
    const istHour = istTime.getHours()
    const istMinute = istTime.getMinutes()
    const isMarketOpen =
      ((istHour > 9 || (istHour === 9 && istMinute >= 15)) && istHour < 15) || (istHour === 15 && istMinute <= 30)

    const stocks = {}
    const volatility = isMarketOpen ? 0.025 : 0.005

    exchangeInfo.companies.forEach((company) => {
      const priceChange = (Math.random() - 0.5) * 2 * volatility
      const currentPrice = company.basePrice * (1 + priceChange)
      const change = currentPrice - company.basePrice
      const changePercent = (change / company.basePrice) * 100

      // Generate realistic volume based on market cap
      let baseVolume = 1000000
      if (company.marketCap > 10000000000000) baseVolume = 5000000
      else if (company.marketCap > 5000000000000) baseVolume = 3000000
      else if (company.marketCap > 1000000000000) baseVolume = 2000000
      else if (company.marketCap > 0) baseVolume = 1500000
      else baseVolume = 500000 // For commodities

      const volumeMultiplier = isMarketOpen ? 0.7 + Math.random() * 1.3 : 0.1 + Math.random() * 0.3
      const volume = Math.floor(baseVolume * volumeMultiplier)

      // Format volume display
      const volumeDisplay = `${(volume / 100000).toFixed(1)}L`

      // Generate OHLC data
      const dayRange = company.basePrice * 0.04
      const high = currentPrice + Math.random() * dayRange * 0.5
      const low = currentPrice - Math.random() * dayRange * 0.5
      const open = company.basePrice + (Math.random() - 0.5) * dayRange * 0.3

      stocks[company.symbol] = {
        symbol: company.symbol,
        name: company.name,
        sector: company.sector,
        exchange: exchange,
        country: exchangeInfo.country,
        currency: exchangeInfo.currency,
        price: currentPrice,
        change: change,
        changePercent: changePercent,
        volume: volume,
        volumeDisplay: volumeDisplay,
        high: high,
        low: low,
        open: open,
        previousClose: company.basePrice,
        marketCap: company.marketCap,

        // Technical indicators
        rsi: 30 + Math.random() * 40,
        pe: company.marketCap > 0 ? 15 + Math.random() * 25 : 0,

        // Market depth
        bid: currentPrice - (0.5 + Math.random() * 1.5),
        ask: currentPrice + (0.5 + Math.random() * 1.5),

        timestamp: new Date().toISOString(),
        lastUpdated: Date.now(),
      }
    })

    const response = {
      exchange: exchange,
      exchangeInfo: {
        name: exchangeInfo.name,
        country: exchangeInfo.country,
        currency: exchangeInfo.currency,
        timezone: exchangeInfo.timezone,
      },
      marketStatus: isMarketOpen ? "OPEN" : "CLOSED",
      timestamp: new Date().toISOString(),
      totalStocks: exchangeInfo.companies.length,
      stocks: stocks,

      // Market statistics
      marketStats: {
        totalTurnover: Math.floor(Math.random() * 50000000000),
        advancers: Math.floor(Math.random() * 20) + 15,
        decliners: Math.floor(Math.random() * 15) + 10,
        unchanged: Math.floor(Math.random() * 5) + 2,
      },
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Error fetching live market data:", error)
    return NextResponse.json({ error: "Failed to fetch live market data" }, { status: 500 })
  }
}

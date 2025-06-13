
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DollarSign, TrendingUp, ArrowUpDown, Bitcoin } from "lucide-react";

const revenueData = [
  { month: 'Jan', streaming: 2400, sync: 800, merchandise: 400 },
  { month: 'Feb', streaming: 3200, sync: 1200, merchandise: 600 },
  { month: 'Mar', streaming: 4100, sync: 900, merchandise: 800 },
  { month: 'Apr', streaming: 3800, sync: 1400, merchandise: 700 },
  { month: 'May', streaming: 5200, sync: 1100, merchandise: 900 },
  { month: 'Jun', streaming: 6100, sync: 1600, merchandise: 1200 },
];

const transactions = [
  { id: 1, date: "2024-06-15", amount: 2450.00, currency: "USD", type: "Streaming Revenue", status: "Completed" },
  { id: 2, date: "2024-06-14", amount: 0.25, currency: "BTC", type: "Crypto Payment", status: "Completed" },
  { id: 3, date: "2024-06-13", amount: 850.00, currency: "USD", type: "Sync License", status: "Pending" },
  { id: 4, date: "2024-06-12", amount: 1.5, currency: "ETH", type: "NFT Sale", status: "Completed" },
];

export const Finance = () => {
  const [cryptoPrices, setCryptoPrices] = useState({ BTC: 0, ETH: 0 });
  const [cryptoAmount, setCryptoAmount] = useState("");
  const [selectedCrypto, setSelectedCrypto] = useState("BTC");
  const [convertedAmount, setConvertedAmount] = useState(0);

  // Simulate crypto price fetching
  useEffect(() => {
    const fetchCryptoPrices = () => {
      // Simulated prices - in real app, would fetch from API
      setCryptoPrices({
        BTC: 43250.00 + (Math.random() - 0.5) * 1000,
        ETH: 2340.00 + (Math.random() - 0.5) * 100
      });
    };

    fetchCryptoPrices();
    const interval = setInterval(fetchCryptoPrices, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (cryptoAmount && cryptoPrices[selectedCrypto]) {
      setConvertedAmount(parseFloat(cryptoAmount) * cryptoPrices[selectedCrypto]);
    } else {
      setConvertedAmount(0);
    }
  }, [cryptoAmount, selectedCrypto, cryptoPrices]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Finance & Crypto</h1>
        <Button className="bg-green-600 hover:bg-green-700">
          <DollarSign className="w-4 h-4 mr-2" />
          Generate Report
        </Button>
      </div>

      {/* Financial Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Total Revenue</p>
                <p className="text-2xl font-bold text-white">$47,850.00</p>
                <p className="text-green-400 text-sm">+15.3% this month</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Crypto Holdings</p>
                <p className="text-2xl font-bold text-white">$12,450.00</p>
                <p className="text-yellow-400 text-sm">Portfolio value</p>
              </div>
              <Bitcoin className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Pending Payments</p>
                <p className="text-2xl font-bold text-white">$3,200.00</p>
                <p className="text-blue-400 text-sm">5 transactions</p>
              </div>
              <ArrowUpDown className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Revenue Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#F9FAFB'
                  }} 
                />
                <Line type="monotone" dataKey="streaming" stroke="#8B5CF6" strokeWidth={2} name="Streaming" />
                <Line type="monotone" dataKey="sync" stroke="#10B981" strokeWidth={2} name="Sync Licenses" />
                <Line type="monotone" dataKey="merchandise" stroke="#F59E0B" strokeWidth={2} name="Merchandise" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Crypto Widget */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Crypto Calculator</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-slate-700/30 rounded-lg">
                <div className="text-slate-400 text-sm">Bitcoin (BTC)</div>
                <div className="text-white font-bold text-lg">${cryptoPrices.BTC.toLocaleString()}</div>
                <div className="text-green-400 text-sm">+2.4%</div>
              </div>
              <div className="p-4 bg-slate-700/30 rounded-lg">
                <div className="text-slate-400 text-sm">Ethereum (ETH)</div>
                <div className="text-white font-bold text-lg">${cryptoPrices.ETH.toLocaleString()}</div>
                <div className="text-red-400 text-sm">-1.2%</div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="Amount"
                  value={cryptoAmount}
                  onChange={(e) => setCryptoAmount(e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white"
                />
                <Select value={selectedCrypto} onValueChange={setSelectedCrypto}>
                  <SelectTrigger className="w-24 bg-slate-700 border-slate-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-700 border-slate-600">
                    <SelectItem value="BTC">BTC</SelectItem>
                    <SelectItem value="ETH">ETH</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="p-3 bg-slate-700/50 rounded-lg">
                <div className="text-slate-400 text-sm">USD Equivalent</div>
                <div className="text-white font-bold text-xl">
                  ${convertedAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-700/50">
                <tr>
                  <th className="text-left p-4 text-slate-300">Date</th>
                  <th className="text-left p-4 text-slate-300">Amount</th>
                  <th className="text-left p-4 text-slate-300">Currency</th>
                  <th className="text-left p-4 text-slate-300">Type</th>
                  <th className="text-left p-4 text-slate-300">Status</th>
                  <th className="text-left p-4 text-slate-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className="border-t border-slate-700 hover:bg-slate-700/30">
                    <td className="p-4 text-slate-300">{transaction.date}</td>
                    <td className="p-4 text-white font-medium">{transaction.amount}</td>
                    <td className="p-4 text-slate-300">{transaction.currency}</td>
                    <td className="p-4 text-slate-300">{transaction.type}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        transaction.status === "Completed" ? "bg-green-600" : "bg-yellow-600"
                      }`}>
                        {transaction.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

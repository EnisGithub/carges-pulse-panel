
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TrendingUp, Users, DollarSign, Music } from "lucide-react";

const metricsData = [
  { name: 'Jan', streams: 125000, revenue: 2400 },
  { name: 'Feb', streams: 185000, revenue: 3200 },
  { name: 'Mar', streams: 215000, revenue: 4100 },
  { name: 'Apr', streams: 195000, revenue: 3800 },
  { name: 'May', streams: 275000, revenue: 5200 },
  { name: 'Jun', streams: 310000, revenue: 6100 },
];

const topArtists = [
  { name: "Luna Star", streams: "2.4M", revenue: "$12,400" },
  { name: "Echo Wave", streams: "1.8M", revenue: "$9,200" },
  { name: "Neon Dreams", streams: "1.2M", revenue: "$6,800" },
  { name: "Crystal Sound", streams: "980K", revenue: "$4,900" },
];

export const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <div className="text-slate-400">Welcome back to Carges Records</div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Total Streams</p>
                <p className="text-2xl font-bold text-white">12.4M</p>
                <p className="text-green-400 text-sm">+15.3% this month</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Monthly Listeners</p>
                <p className="text-2xl font-bold text-white">847K</p>
                <p className="text-green-400 text-sm">+8.2% this month</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Revenue</p>
                <p className="text-2xl font-bold text-white">$64,200</p>
                <p className="text-green-400 text-sm">+22.1% this month</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">New Releases</p>
                <p className="text-2xl font-bold text-white">24</p>
                <p className="text-yellow-400 text-sm">+4 this week</p>
              </div>
              <Music className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Streams Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={metricsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#F9FAFB'
                  }} 
                />
                <Line type="monotone" dataKey="streams" stroke="#8B5CF6" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={metricsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#F9FAFB'
                  }} 
                />
                <Bar dataKey="revenue" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top Artists */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Top Performing Artists</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topArtists.map((artist, index) => (
              <div key={artist.name} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-white font-medium">{artist.name}</h3>
                    <p className="text-slate-400 text-sm">{artist.streams} streams</p>
                  </div>
                </div>
                <div className="text-green-400 font-medium">{artist.revenue}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

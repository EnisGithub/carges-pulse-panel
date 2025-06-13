
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const streamingData = [
  { month: 'Jan', streams: 125000, revenue: 2400, listeners: 45000 },
  { month: 'Feb', streams: 185000, revenue: 3200, listeners: 52000 },
  { month: 'Mar', streams: 215000, revenue: 4100, listeners: 61000 },
  { month: 'Apr', streams: 195000, revenue: 3800, listeners: 58000 },
  { month: 'May', streams: 275000, revenue: 5200, listeners: 72000 },
  { month: 'Jun', streams: 310000, revenue: 6100, listeners: 85000 },
];

const platformData = [
  { name: 'Spotify', value: 45, color: '#1DB954' },
  { name: 'Apple Music', value: 25, color: '#FC3C44' },
  { name: 'YouTube Music', value: 15, color: '#FF0000' },
  { name: 'Others', value: 15, color: '#8B5CF6' },
];

const genreData = [
  { genre: 'Electronic', streams: 850000, percentage: 35 },
  { genre: 'Pop', streams: 680000, percentage: 28 },
  { genre: 'Ambient', streams: 490000, percentage: 20 },
  { genre: 'Synthwave', streams: 410000, percentage: 17 },
];

export const Analytics = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Analytics & Reports</h1>
        <Select defaultValue="6months">
          <SelectTrigger className="w-40 bg-slate-800 border-slate-600 text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-slate-800 border-slate-600">
            <SelectItem value="1month">Last Month</SelectItem>
            <SelectItem value="3months">Last 3 Months</SelectItem>
            <SelectItem value="6months">Last 6 Months</SelectItem>
            <SelectItem value="1year">Last Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-slate-400 text-sm">Total Streams</p>
              <p className="text-3xl font-bold text-white">1.6M</p>
              <p className="text-green-400 text-sm">+18.5% vs last period</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-slate-400 text-sm">Average Revenue per Stream</p>
              <p className="text-3xl font-bold text-white">$0.0039</p>
              <p className="text-blue-400 text-sm">Industry average: $0.0033</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-slate-400 text-sm">Monthly Growth Rate</p>
              <p className="text-3xl font-bold text-white">12.8%</p>
              <p className="text-yellow-400 text-sm">Consistent upward trend</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Streaming Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={streamingData}>
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
                <Line type="monotone" dataKey="streams" stroke="#8B5CF6" strokeWidth={3} />
                <Line type="monotone" dataKey="listeners" stroke="#10B981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Platform Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={platformData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {platformData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#F9FAFB'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Genre Performance */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Genre Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {genreData.map((genre) => (
              <div key={genre.genre} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="text-white font-medium min-w-24">{genre.genre}</div>
                  <div className="flex-1 bg-slate-600 rounded-full h-2 min-w-40">
                    <div 
                      className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${genre.percentage}%` }}
                    ></div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-white font-medium">{genre.streams.toLocaleString()}</div>
                  <div className="text-slate-400 text-sm">{genre.percentage}%</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Revenue Chart */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Revenue Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={streamingData}>
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
              <Bar dataKey="revenue" fill="#10B981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

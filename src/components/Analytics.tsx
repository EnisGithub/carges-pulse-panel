
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Users, DollarSign, Music, MapPin, Globe, Eye } from "lucide-react";

const worldMapData = [
  { country: "United States", listeners: 145000, revenue: 2400, coordinates: [40, -100], flag: "🇺🇸" },
  { country: "Germany", listeners: 89000, revenue: 1800, coordinates: [51, 9], flag: "🇩🇪" },
  { country: "United Kingdom", listeners: 67000, revenue: 1350, coordinates: [54, -2], flag: "🇬🇧" },
  { country: "Brazil", listeners: 123000, revenue: 980, coordinates: [-14, -51], flag: "🇧🇷" },
  { country: "Canada", listeners: 45000, revenue: 890, coordinates: [56, -106], flag: "🇨🇦" },
  { country: "Australia", listeners: 34000, revenue: 720, coordinates: [-25, 133], flag: "🇦🇺" },
  { country: "France", listeners: 56000, revenue: 1120, coordinates: [46, 2], flag: "🇫🇷" },
  { country: "Japan", listeners: 78000, revenue: 1560, coordinates: [36, 138], flag: "🇯🇵" }
];

const streamingData = [
  { name: 'Jan', streams: 125000, revenue: 2400, listeners: 89000 },
  { name: 'Feb', streams: 185000, revenue: 3200, listeners: 134000 },
  { name: 'Mar', streams: 215000, revenue: 4100, listeners: 156000 },
  { name: 'Apr', streams: 195000, revenue: 3800, listeners: 142000 },
  { name: 'May', streams: 275000, revenue: 5200, listeners: 189000 },
  { name: 'Jun', streams: 310000, revenue: 6100, listeners: 223000 },
];

const platformData = [
  { name: 'Spotify', value: 45, color: '#1DB954', revenue: 2800 },
  { name: 'Apple Music', value: 25, color: '#FA243C', revenue: 1900 },
  { name: 'YouTube Music', value: 15, color: '#FF0000', revenue: 1200 },
  { name: 'Amazon Music', value: 10, color: '#FF9900', revenue: 800 },
  { name: 'Others', value: 5, color: '#8B5CF6', revenue: 400 }
];

export const Analytics = () => {
  const [activeSection, setActiveSection] = useState("overview");
  const [selectedCountry, setSelectedCountry] = useState(null);

  const totalRevenue = worldMapData.reduce((sum, country) => sum + country.revenue, 0);
  const totalListeners = worldMapData.reduce((sum, country) => sum + country.listeners, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Analytics & World Map</h1>
        <div className="flex gap-2">
          <Button
            variant={activeSection === "overview" ? "default" : "outline"}
            onClick={() => setActiveSection("overview")}
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            Overview
          </Button>
          <Button
            variant={activeSection === "worldmap" ? "default" : "outline"}
            onClick={() => setActiveSection("worldmap")}
          >
            <Globe className="w-4 h-4 mr-2" />
            World Map
          </Button>
          <Button
            variant={activeSection === "platforms" ? "default" : "outline"}
            onClick={() => setActiveSection("platforms")}
          >
            <Music className="w-4 h-4 mr-2" />
            Platforms
          </Button>
        </div>
      </div>

      {activeSection === "overview" && (
        <div className="space-y-6">
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
                    <p className="text-slate-400 text-sm">Global Listeners</p>
                    <p className="text-2xl font-bold text-white">{totalListeners.toLocaleString()}</p>
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
                    <p className="text-slate-400 text-sm">Estimated Revenue</p>
                    <p className="text-2xl font-bold text-white">${totalRevenue.toLocaleString()}</p>
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
                    <p className="text-slate-400 text-sm">Countries</p>
                    <p className="text-2xl font-bold text-white">{worldMapData.length}</p>
                    <p className="text-yellow-400 text-sm">Active markets</p>
                  </div>
                  <Globe className="h-8 w-8 text-yellow-500" />
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
                  <LineChart data={streamingData}>
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
                  <BarChart data={streamingData}>
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
        </div>
      )}

      {activeSection === "worldmap" && (
        <div className="space-y-6">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Global Listener Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-slate-700/30 p-4 rounded-lg">
                  <div className="text-center mb-4">
                    <div className="text-6xl mb-2">🌍</div>
                    <p className="text-slate-400">Interactive World Map</p>
                    <p className="text-slate-500 text-sm">Click on countries below to view detailed analytics</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {worldMapData.map((country, index) => (
                    <div 
                      key={country.country}
                      className="p-4 bg-slate-700/30 rounded-lg border border-slate-600 hover:bg-slate-700/50 transition-colors cursor-pointer"
                      onClick={() => setSelectedCountry(country)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{country.flag}</span>
                          <h3 className="text-white font-medium">{country.country}</h3>
                        </div>
                        <MapPin className="w-4 h-4 text-purple-400" />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-slate-400 text-sm">Listeners</span>
                          <span className="text-white font-medium">{country.listeners.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400 text-sm">Est. Revenue</span>
                          <span className="text-green-400 font-medium">${country.revenue}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400 text-sm">Revenue/Listener</span>
                          <span className="text-blue-400 font-medium">${(country.revenue / country.listeners * 1000).toFixed(3)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {selectedCountry && (
            <Card className="bg-slate-800/50 border-slate-700 border-purple-500">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <span className="text-2xl">{selectedCountry.flag}</span>
                  {selectedCountry.country} - Detailed Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-white font-medium">Listener Metrics</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Total Listeners</span>
                        <span className="text-white">{selectedCountry.listeners.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Growth Rate</span>
                        <span className="text-green-400">+12.5%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Avg. Session</span>
                        <span className="text-white">24:30 mins</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-white font-medium">Revenue Metrics</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Total Revenue</span>
                        <span className="text-green-400">${selectedCountry.revenue}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Revenue Growth</span>
                        <span className="text-green-400">+18.2%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Per Listener</span>
                        <span className="text-blue-400">${(selectedCountry.revenue / selectedCountry.listeners * 1000).toFixed(3)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-white font-medium">Top Tracks</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-400">1. Midnight Echoes</span>
                        <span className="text-white">34%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">2. Digital Dreams</span>
                        <span className="text-white">28%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">3. Cosmic Journey</span>
                        <span className="text-white">19%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {activeSection === "platforms" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                    label
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

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Platform Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {platformData.map((platform) => (
                  <div key={platform.name} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-4 h-4 rounded-full" 
                        style={{ backgroundColor: platform.color }}
                      ></div>
                      <span className="text-white font-medium">{platform.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-bold">${platform.revenue}</div>
                      <div className="text-slate-400 text-sm">{platform.value}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

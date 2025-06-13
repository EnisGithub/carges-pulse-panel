
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Plus, Calendar, Filter } from "lucide-react";

const promoOrders = [
  {
    id: 1,
    campaign: "Summer Vibes 2024",
    artist: "Luna Star",
    platform: "Instagram",
    budget: 2500,
    spent: 1850,
    impressions: "124K",
    clicks: "3.2K",
    conversions: 89,
    status: "Active",
    startDate: "2024-06-01",
    endDate: "2024-06-30"
  },
  {
    id: 2,
    campaign: "Digital Dreams Launch",
    artist: "Echo Wave",
    platform: "TikTok",
    budget: 1800,
    spent: 1800,
    impressions: "89K",
    clicks: "2.8K",
    conversions: 156,
    status: "Completed",
    startDate: "2024-05-15",
    endDate: "2024-06-15"
  },
  {
    id: 3,
    campaign: "Cosmic Journey Teaser",
    artist: "Neon Dreams",
    platform: "YouTube",
    budget: 3200,
    spent: 980,
    impressions: "67K",
    clicks: "1.9K",
    conversions: 45,
    status: "Active",
    startDate: "2024-06-10",
    endDate: "2024-07-10"
  },
  {
    id: 4,
    campaign: "Retro Synthwave Collection",
    artist: "Various Artists",
    platform: "Spotify",
    budget: 1500,
    spent: 750,
    impressions: "45K",
    clicks: "1.2K",
    conversions: 78,
    status: "Paused",
    startDate: "2024-06-05",
    endDate: "2024-07-05"
  }
];

export const PromoOrders = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [platformFilter, setPlatformFilter] = useState("all");

  const filteredOrders = promoOrders.filter(order => {
    const matchesSearch = order.campaign.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.artist.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesPlatform = platformFilter === "all" || order.platform.toLowerCase() === platformFilter.toLowerCase();
    
    return matchesSearch && matchesStatus && matchesPlatform;
  });

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-600";
      case "completed":
        return "bg-blue-600";
      case "paused":
        return "bg-yellow-600";
      default:
        return "bg-slate-600";
    }
  };

  const totalBudget = promoOrders.reduce((sum, order) => sum + order.budget, 0);
  const totalSpent = promoOrders.reduce((sum, order) => sum + order.spent, 0);
  const totalConversions = promoOrders.reduce((sum, order) => sum + order.conversions, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Promo Orders</h1>
        <Button className="bg-green-600 hover:bg-green-700">
          <Plus className="w-4 h-4 mr-2" />
          New Campaign
        </Button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-slate-400 text-sm">Total Budget</p>
              <p className="text-2xl font-bold text-white">${totalBudget.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-slate-400 text-sm">Total Spent</p>
              <p className="text-2xl font-bold text-white">${totalSpent.toLocaleString()}</p>
              <p className="text-yellow-400 text-sm">{((totalSpent / totalBudget) * 100).toFixed(1)}% of budget</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-slate-400 text-sm">Active Campaigns</p>
              <p className="text-2xl font-bold text-white">{promoOrders.filter(o => o.status === "Active").length}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-slate-400 text-sm">Total Conversions</p>
              <p className="text-2xl font-bold text-white">{totalConversions}</p>
              <p className="text-green-400 text-sm">Across all campaigns</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
          <Input
            placeholder="Search campaigns..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-slate-800 border-slate-600 text-white w-80"
          />
        </div>
        
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40 bg-slate-800 border-slate-600 text-white">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent className="bg-slate-800 border-slate-600">
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="paused">Paused</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={platformFilter} onValueChange={setPlatformFilter}>
          <SelectTrigger className="w-40 bg-slate-800 border-slate-600 text-white">
            <SelectValue placeholder="Platform" />
          </SelectTrigger>
          <SelectContent className="bg-slate-800 border-slate-600">
            <SelectItem value="all">All Platforms</SelectItem>
            <SelectItem value="instagram">Instagram</SelectItem>
            <SelectItem value="tiktok">TikTok</SelectItem>
            <SelectItem value="youtube">YouTube</SelectItem>
            <SelectItem value="spotify">Spotify</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Campaigns Table */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-700/50">
                <tr>
                  <th className="text-left p-4 text-slate-300">Campaign</th>
                  <th className="text-left p-4 text-slate-300">Artist</th>
                  <th className="text-left p-4 text-slate-300">Platform</th>
                  <th className="text-left p-4 text-slate-300">Budget</th>
                  <th className="text-left p-4 text-slate-300">Spent</th>
                  <th className="text-left p-4 text-slate-300">Performance</th>
                  <th className="text-left p-4 text-slate-300">Status</th>
                  <th className="text-left p-4 text-slate-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="border-t border-slate-700 hover:bg-slate-700/30">
                    <td className="p-4">
                      <div>
                        <div className="text-white font-medium">{order.campaign}</div>
                        <div className="text-slate-400 text-sm flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {order.startDate} - {order.endDate}
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-slate-300">{order.artist}</td>
                    <td className="p-4 text-slate-300">{order.platform}</td>
                    <td className="p-4 text-white">${order.budget.toLocaleString()}</td>
                    <td className="p-4">
                      <div>
                        <div className="text-white">${order.spent.toLocaleString()}</div>
                        <div className="text-slate-400 text-sm">
                          {((order.spent / order.budget) * 100).toFixed(0)}% used
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm">
                        <div className="text-white">{order.impressions} views</div>
                        <div className="text-slate-400">{order.conversions} conversions</div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 text-xs rounded-full text-white ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          Edit
                        </Button>
                        <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                          Analytics
                        </Button>
                      </div>
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

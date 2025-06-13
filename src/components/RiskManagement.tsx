
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  AlertTriangle, 
  XCircle, 
  CheckCircle, 
  Clock, 
  Search,
  Filter,
  TrendingDown,
  Shield,
  FileX,
  AlertCircle
} from "lucide-react";

const rejectedStreams = [
  {
    id: 1,
    platform: "Spotify",
    track: "Midnight Echoes - Luna Star",
    reason: "Copyright claim detected",
    date: "2024-01-12",
    status: "pending_review",
    severity: "high",
    estimatedLoss: 2400,
    submittedBy: "Auto-Detection"
  },
  {
    id: 2,
    platform: "YouTube Music",
    track: "Digital Dreams - Echo Wave",
    reason: "Audio quality below standards",
    date: "2024-01-11",
    status: "resolved",
    severity: "medium",
    estimatedLoss: 890,
    submittedBy: "Quality Control"
  },
  {
    id: 3,
    platform: "Apple Music",
    track: "Cosmic Journey - Neon Dreams",
    reason: "Metadata incomplete",
    date: "2024-01-10",
    status: "pending_fix",
    severity: "low",
    estimatedLoss: 340,
    submittedBy: "Distribution System"
  },
  {
    id: 4,
    platform: "TikTok",
    track: "Studio Vibes #aesthetic",
    reason: "Content flagged by community",
    date: "2024-01-09",
    status: "appealing",
    severity: "high",
    estimatedLoss: 1200,
    submittedBy: "Community Report"
  },
  {
    id: 5,
    platform: "SoundCloud",
    track: "Underground Beat Mix",
    reason: "Terms of service violation",
    date: "2024-01-08",
    status: "rejected",
    severity: "critical",
    estimatedLoss: 560,
    submittedBy: "Platform Moderation"
  }
];

const riskMetrics = [
  {
    title: "Total Rejected Streams",
    value: 23,
    change: "+3 this week",
    icon: XCircle,
    color: "text-red-400"
  },
  {
    title: "Estimated Revenue Loss",
    value: "$5,390",
    change: "-12% from last month",
    icon: TrendingDown,
    color: "text-red-400"
  },
  {
    title: "Pending Reviews",
    value: 8,
    change: "2 urgent",
    icon: Clock,
    color: "text-yellow-400"
  },
  {
    title: "Success Rate",
    value: "87.3%",
    change: "+2.1% improvement",
    icon: Shield,
    color: "text-green-400"
  }
];

const riskCategories = [
  { name: "Copyright Issues", count: 8, percentage: 35 },
  { name: "Quality Standards", count: 6, percentage: 26 },
  { name: "Metadata Problems", count: 4, percentage: 17 },
  { name: "Community Flags", count: 3, percentage: 13 },
  { name: "Terms Violations", count: 2, percentage: 9 }
];

export const RiskManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [severityFilter, setSeverityFilter] = useState("all");

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "bg-red-600";
      case "high": return "bg-red-500";
      case "medium": return "bg-yellow-600";
      case "low": return "bg-green-600";
      default: return "bg-slate-600";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending_review": return "bg-yellow-600";
      case "resolved": return "bg-green-600";
      case "pending_fix": return "bg-blue-600";
      case "appealing": return "bg-purple-600";
      case "rejected": return "bg-red-600";
      default: return "bg-slate-600";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "resolved": return <CheckCircle className="w-4 h-4" />;
      case "rejected": return <XCircle className="w-4 h-4" />;
      case "pending_review": return <Clock className="w-4 h-4" />;
      case "pending_fix": return <FileX className="w-4 h-4" />;
      case "appealing": return <AlertCircle className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const filteredStreams = rejectedStreams.filter(stream => {
    const matchesSearch = stream.track.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         stream.platform.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         stream.reason.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || stream.status === statusFilter;
    const matchesSeverity = severityFilter === "all" || stream.severity === severityFilter;
    return matchesSearch && matchesStatus && matchesSeverity;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Risk Management</h1>
        <div className="flex gap-2">
          <Button className="bg-red-600 hover:bg-red-700">
            <AlertTriangle className="w-4 h-4 mr-2" />
            Create Report
          </Button>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Risk Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {riskMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card key={index} className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm">{metric.title}</p>
                    <p className="text-2xl font-bold text-white">{metric.value}</p>
                    <p className={`text-sm ${metric.color}`}>{metric.change}</p>
                  </div>
                  <Icon className={`h-8 w-8 ${metric.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Risk Categories */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Risk Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {riskCategories.map((category, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-500" />
                  <span className="text-white font-medium">{category.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-slate-400">{category.count} issues</span>
                  <Badge className="bg-slate-600 text-white">
                    {category.percentage}%
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <div className="flex items-center gap-4 flex-wrap">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
          <Input
            placeholder="Search rejected streams..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-slate-800 border-slate-600 text-white"
          />
        </div>
        
        <select 
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 bg-slate-800 border border-slate-600 rounded-md text-white"
        >
          <option value="all">All Status</option>
          <option value="pending_review">Pending Review</option>
          <option value="resolved">Resolved</option>
          <option value="pending_fix">Pending Fix</option>
          <option value="appealing">Appealing</option>
          <option value="rejected">Rejected</option>
        </select>
        
        <select 
          value={severityFilter}
          onChange={(e) => setSeverityFilter(e.target.value)}
          className="px-3 py-2 bg-slate-800 border border-slate-600 rounded-md text-white"
        >
          <option value="all">All Severity</option>
          <option value="critical">Critical</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>

      {/* Rejected Streams List */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Rejected Streams ({filteredStreams.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredStreams.map((stream) => (
              <div key={stream.id} className="p-4 bg-slate-700/30 rounded-lg border border-slate-600">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {getStatusIcon(stream.status)}
                      <h3 className="text-white font-medium">{stream.track}</h3>
                    </div>
                    <p className="text-slate-400 text-sm">{stream.platform} • {stream.reason}</p>
                    <p className="text-slate-500 text-xs">Submitted by: {stream.submittedBy}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={`${getSeverityColor(stream.severity)} text-white`}>
                      {stream.severity}
                    </Badge>
                    <Badge className={`${getStatusColor(stream.status)} text-white`}>
                      {stream.status.replace('_', ' ')}
                    </Badge>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                  <div>
                    <p className="text-slate-400 text-sm">Date Rejected</p>
                    <p className="text-white font-medium">{stream.date}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Estimated Loss</p>
                    <p className="text-red-400 font-medium">${stream.estimatedLoss}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Days Since</p>
                    <p className="text-white font-medium">
                      {Math.floor((new Date().getTime() - new Date(stream.date).getTime()) / (1000 * 60 * 60 * 24))} days
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    View Details
                  </Button>
                  {stream.status === "pending_review" && (
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      Review Now
                    </Button>
                  )}
                  {stream.status === "pending_fix" && (
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      Apply Fix
                    </Button>
                  )}
                  {stream.status === "rejected" && (
                    <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                      Appeal Decision
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

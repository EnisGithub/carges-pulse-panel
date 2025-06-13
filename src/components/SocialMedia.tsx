
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Youtube, 
  Instagram, 
  Music, 
  Video, 
  Eye, 
  Heart, 
  MessageCircle, 
  Share, 
  TrendingUp,
  Play,
  Upload,
  Calendar,
  Users
} from "lucide-react";

const socialAccounts = [
  {
    id: 1,
    platform: "YouTube",
    handle: "@CargesRecords",
    followers: 234500,
    status: "live",
    currentStream: "Studio Session Live",
    viewers: 1240,
    icon: Youtube,
    color: "bg-red-600"
  },
  {
    id: 2,
    platform: "TikTok",
    handle: "@cargesrecords",
    followers: 89000,
    status: "active",
    currentStream: null,
    viewers: 0,
    icon: Music,
    color: "bg-black"
  },
  {
    id: 3,
    platform: "Instagram",
    handle: "@carges_records",
    followers: 156000,
    status: "scheduled",
    currentStream: "Behind the Scenes",
    viewers: 0,
    icon: Instagram,
    color: "bg-gradient-to-r from-purple-500 to-pink-500"
  },
  {
    id: 4,
    platform: "Twitch",
    handle: "CargesRecordsLive",
    followers: 45600,
    status: "offline",
    currentStream: null,
    viewers: 0,
    icon: Video,
    color: "bg-purple-600"
  }
];

const videoContent = [
  {
    id: 1,
    title: "Luna Star - Midnight Echoes (Official Video)",
    platform: "YouTube",
    type: "music_video",
    views: 145000,
    likes: 8900,
    comments: 234,
    uploadDate: "2024-01-10",
    duration: "3:45",
    status: "published"
  },
  {
    id: 2,
    title: "Studio Vibes #aesthetic",
    platform: "TikTok",
    type: "short",
    views: 89000,
    likes: 12400,
    comments: 567,
    uploadDate: "2024-01-12",
    duration: "0:30",
    status: "published"
  },
  {
    id: 3,
    title: "Echo Wave - Digital Dreams Preview",
    platform: "Instagram",
    type: "reel",
    views: 67000,
    likes: 5600,
    comments: 189,
    uploadDate: "2024-01-11",
    duration: "0:45",
    status: "published"
  },
  {
    id: 4,
    title: "New Release Coming Soon",
    platform: "YouTube",
    type: "short",
    views: 23000,
    likes: 1800,
    comments: 95,
    uploadDate: "2024-01-13",
    duration: "0:60",
    status: "scheduled"
  }
];

const liveStreams = [
  {
    id: 1,
    title: "Studio Session with Luna Star",
    platform: "YouTube",
    status: "live",
    viewers: 1240,
    startTime: "2024-01-13 14:30",
    duration: "02:15:30",
    peakViewers: 2100
  },
  {
    id: 2,
    title: "Behind the Scenes - Album Recording",
    platform: "Instagram",
    status: "scheduled",
    viewers: 0,
    startTime: "2024-01-13 18:00",
    duration: "00:00:00",
    peakViewers: 0
  },
  {
    id: 3,
    title: "Q&A with Echo Wave",
    platform: "Twitch",
    status: "ended",
    viewers: 0,
    startTime: "2024-01-12 20:00",
    duration: "01:45:22",
    peakViewers: 890
  }
];

export const SocialMedia = () => {
  const [activeSection, setActiveSection] = useState("accounts");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "live": return "bg-red-600 animate-pulse";
      case "active": return "bg-green-600";
      case "scheduled": return "bg-yellow-600";
      case "offline": return "bg-slate-600";
      case "ended": return "bg-slate-500";
      default: return "bg-slate-600";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "music_video": return "bg-blue-600";
      case "short": return "bg-purple-600";
      case "reel": return "bg-pink-600";
      default: return "bg-slate-600";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Social Media Dashboard</h1>
        <div className="flex gap-2">
          <Button
            variant={activeSection === "accounts" ? "default" : "outline"}
            onClick={() => setActiveSection("accounts")}
          >
            <Users className="w-4 h-4 mr-2" />
            Accounts
          </Button>
          <Button
            variant={activeSection === "content" ? "default" : "outline"}
            onClick={() => setActiveSection("content")}
          >
            <Video className="w-4 h-4 mr-2" />
            Content
          </Button>
          <Button
            variant={activeSection === "streams" ? "default" : "outline"}
            onClick={() => setActiveSection("streams")}
          >
            <Play className="w-4 h-4 mr-2" />
            Live Streams
          </Button>
        </div>
      </div>

      {activeSection === "accounts" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {socialAccounts.map((account) => {
            const Icon = account.icon;
            return (
              <Card key={account.id} className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-full ${account.color}`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <Badge className={`${getStatusColor(account.status)} text-white`}>
                      {account.status}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-white font-bold text-lg">{account.platform}</h3>
                    <p className="text-slate-400 text-sm">{account.handle}</p>
                    <p className="text-slate-300">
                      <span className="font-semibold">{account.followers.toLocaleString()}</span> followers
                    </p>
                    
                    {account.status === "live" && account.currentStream && (
                      <div className="mt-3 p-2 bg-red-600/20 rounded-lg border border-red-600/50">
                        <p className="text-red-400 text-sm font-medium">{account.currentStream}</p>
                        <p className="text-red-300 text-xs">{account.viewers} viewers</p>
                      </div>
                    )}
                    
                    {account.status === "scheduled" && account.currentStream && (
                      <div className="mt-3 p-2 bg-yellow-600/20 rounded-lg border border-yellow-600/50">
                        <p className="text-yellow-400 text-sm font-medium">{account.currentStream}</p>
                        <p className="text-yellow-300 text-xs">Scheduled</p>
                      </div>
                    )}
                  </div>
                  
                  <Button className="w-full mt-4 bg-purple-600 hover:bg-purple-700">
                    Manage
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {activeSection === "content" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Video Content</h2>
            <Button className="bg-green-600 hover:bg-green-700">
              <Upload className="w-4 h-4 mr-2" />
              Upload Content
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videoContent.map((video) => (
              <Card key={video.id} className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-4">
                  <div className="aspect-video bg-slate-700 rounded-lg mb-4 flex items-center justify-center">
                    <Video className="w-12 h-12 text-slate-500" />
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <h3 className="text-white font-medium text-sm leading-tight">{video.title}</h3>
                      <Badge className={`${getTypeColor(video.type)} text-white text-xs ml-2`}>
                        {video.type.replace('_', ' ')}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-4 text-xs text-slate-400">
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {video.views.toLocaleString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart className="w-3 h-3" />
                        {video.likes.toLocaleString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="w-3 h-3" />
                        {video.comments}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 text-xs">{video.platform} • {video.duration}</span>
                      <Badge className={video.status === "published" ? "bg-green-600" : "bg-yellow-600"}>
                        {video.status}
                      </Badge>
                    </div>
                    
                    <p className="text-slate-500 text-xs">{video.uploadDate}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {activeSection === "streams" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Live Streams</h2>
            <Button className="bg-red-600 hover:bg-red-700">
              <Play className="w-4 h-4 mr-2" />
              Start Stream
            </Button>
          </div>
          
          <div className="space-y-4">
            {liveStreams.map((stream) => (
              <Card key={stream.id} className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-white font-medium text-lg">{stream.title}</h3>
                      <p className="text-slate-400">{stream.platform}</p>
                    </div>
                    <Badge className={`${getStatusColor(stream.status)} text-white`}>
                      {stream.status}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-slate-400 text-sm">Current Viewers</p>
                      <p className="text-white font-bold text-xl">{stream.viewers.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 text-sm">Peak Viewers</p>
                      <p className="text-white font-bold text-xl">{stream.peakViewers.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 text-sm">Duration</p>
                      <p className="text-white font-bold text-xl">{stream.duration}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 text-sm">Start Time</p>
                      <p className="text-white font-medium">{stream.startTime}</p>
                    </div>
                  </div>
                  
                  {stream.status === "live" && (
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-slate-400">Stream Health</span>
                        <span className="text-green-400">Excellent (95%)</span>
                      </div>
                      <Progress value={95} className="h-2" />
                    </div>
                  )}
                  
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      View Analytics
                    </Button>
                    <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                      Manage Stream
                    </Button>
                    {stream.status === "live" && (
                      <Button size="sm" className="bg-red-600 hover:bg-red-700">
                        End Stream
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};


import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Music, Users, TrendingUp, ExternalLink, Play, Pause } from "lucide-react";

const playlists = [
  {
    id: 1,
    name: "Carges Top Hits",
    platform: "Spotify",
    followers: 125420,
    tracks: 34,
    monthlyListeners: 89000,
    status: "active",
    lastUpdated: "2024-01-10",
    genre: "Electronic",
    curator: "Carges Records"
  },
  {
    id: 2,
    name: "Underground Beats",
    platform: "Apple Music",
    followers: 78900,
    tracks: 28,
    monthlyListeners: 45000,
    status: "active",
    lastUpdated: "2024-01-08",
    genre: "Hip Hop",
    curator: "DJ Luna"
  },
  {
    id: 3,
    name: "Chill Vibes",
    platform: "YouTube Music",
    followers: 234500,
    tracks: 45,
    monthlyListeners: 156000,
    status: "pending",
    lastUpdated: "2024-01-12",
    genre: "Ambient",
    curator: "Carges Records"
  },
  {
    id: 4,
    name: "Rising Stars",
    platform: "SoundCloud",
    followers: 56700,
    tracks: 19,
    monthlyListeners: 23000,
    status: "active",
    lastUpdated: "2024-01-09",
    genre: "Indie",
    curator: "Echo Wave"
  }
];

const playlistSubmissions = [
  {
    id: 1,
    playlistName: "Fresh Electronic",
    curator: "ElectroVibes",
    trackSubmitted: "Midnight Echo - Luna Star",
    status: "pending",
    submittedDate: "2024-01-10",
    followers: 89000,
    estimatedReach: 4500
  },
  {
    id: 2,
    playlistName: "New Music Friday",
    curator: "Spotify Editorial",
    trackSubmitted: "Digital Dreams - Echo Wave",
    status: "accepted",
    submittedDate: "2024-01-05",
    followers: 2400000,
    estimatedReach: 120000
  },
  {
    id: 3,
    playlistName: "Indie Spotlight",
    curator: "IndieHub",
    trackSubmitted: "Cosmic Journey - Neon Dreams",
    status: "rejected",
    submittedDate: "2024-01-08",
    followers: 145000,
    estimatedReach: 0
  }
];

export const Playlists = () => {
  const [activeSection, setActiveSection] = useState("owned");
  const [searchTerm, setSearchTerm] = useState("");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-600";
      case "pending": return "bg-yellow-600";
      case "rejected": return "bg-red-600";
      case "accepted": return "bg-blue-600";
      default: return "bg-slate-600";
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case "Spotify": return "bg-green-500";
      case "Apple Music": return "bg-red-500";
      case "YouTube Music": return "bg-red-600";
      case "SoundCloud": return "bg-orange-500";
      default: return "bg-purple-500";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Playlists</h1>
        <div className="flex gap-2">
          <Button
            variant={activeSection === "owned" ? "default" : "outline"}
            onClick={() => setActiveSection("owned")}
          >
            Owned Playlists
          </Button>
          <Button
            variant={activeSection === "submissions" ? "default" : "outline"}
            onClick={() => setActiveSection("submissions")}
          >
            Submissions
          </Button>
          <Button className="bg-green-600 hover:bg-green-700">
            <Plus className="w-4 h-4 mr-2" />
            Create Playlist
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
          <Input
            placeholder="Search playlists..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-slate-800 border-slate-600 text-white"
          />
        </div>
      </div>

      {activeSection === "owned" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {playlists.map((playlist) => (
            <Card key={playlist.id} className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white text-lg">{playlist.name}</CardTitle>
                  <Badge className={`${getPlatformColor(playlist.platform)} text-white`}>
                    {playlist.platform}
                  </Badge>
                </div>
                <p className="text-slate-400 text-sm">{playlist.genre} • {playlist.curator}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-slate-400">Followers</p>
                      <p className="text-white font-medium">{playlist.followers.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-slate-400">Tracks</p>
                      <p className="text-white font-medium">{playlist.tracks}</p>
                    </div>
                    <div>
                      <p className="text-slate-400">Monthly Listeners</p>
                      <p className="text-white font-medium">{playlist.monthlyListeners.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-slate-400">Status</p>
                      <Badge className={`${getStatusColor(playlist.status)} text-white text-xs`}>
                        {playlist.status}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Play className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <Button size="sm" className="bg-purple-600 hover:bg-purple-700 flex-1">
                      <ExternalLink className="w-4 h-4 mr-1" />
                      Open
                    </Button>
                  </div>
                  
                  <p className="text-slate-500 text-xs">Last updated: {playlist.lastUpdated}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {activeSection === "submissions" && (
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Playlist Submissions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {playlistSubmissions.map((submission) => (
                <div key={submission.id} className="p-4 bg-slate-700/30 rounded-lg border border-slate-600">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="text-white font-medium">{submission.playlistName}</h3>
                      <p className="text-slate-400 text-sm">by {submission.curator}</p>
                    </div>
                    <Badge className={`${getStatusColor(submission.status)} text-white`}>
                      {submission.status}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                    <div>
                      <p className="text-slate-400 text-sm">Track Submitted</p>
                      <p className="text-white font-medium">{submission.trackSubmitted}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 text-sm">Playlist Followers</p>
                      <p className="text-white font-medium">{submission.followers.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 text-sm">Estimated Reach</p>
                      <p className="text-white font-medium">{submission.estimatedReach.toLocaleString()}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <p className="text-slate-500 text-sm">Submitted: {submission.submittedDate}</p>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        Follow Up
                      </Button>
                      <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

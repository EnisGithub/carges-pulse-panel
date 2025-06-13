import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Users, Music, Search, Plus, Edit, Trash2, Eye, Download, Upload, Star } from "lucide-react";

const artistsData = [
  {
    id: 1,
    name: "Luna Star",
    genre: "Electronic Pop",
    releases: 12,
    streams: "2.4M",
    revenue: "$12,400",
    status: "Active"
  },
  {
    id: 2,
    name: "Echo Wave",
    genre: "Synthwave",
    releases: 8,
    streams: "1.8M",
    revenue: "$9,200",
    status: "Active"
  },
  {
    id: 3,
    name: "Neon Dreams",
    genre: "Ambient",
    releases: 15,
    streams: "1.2M",
    revenue: "$6,800",
    status: "Active"
  },
];

const releasesData = [
  {
    id: 1,
    title: "Midnight Echoes",
    artist: "Luna Star",
    releaseDate: "2024-03-15",
    streams: "450K",
    revenue: "$2,100",
    status: "Released"
  },
  {
    id: 2,
    title: "Digital Dreams",
    artist: "Echo Wave",
    releaseDate: "2024-02-28",
    streams: "320K",
    revenue: "$1,800",
    status: "Released"
  },
  {
    id: 3,
    title: "Cosmic Journey",
    artist: "Neon Dreams",
    releaseDate: "2024-04-10",
    streams: "280K",
    revenue: "$1,400",
    status: "Released"
  },
];

export const Artists = () => {
  const [activeView, setActiveView] = useState("artists");
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Artists & Releases</h1>
        <div className="flex gap-2">
          <Button
            variant={activeView === "artists" ? "default" : "outline"}
            onClick={() => setActiveView("artists")}
            className="bg-purple-600 hover:bg-purple-700"
          >
            <Users className="w-4 h-4 mr-2" />
            Artists
          </Button>
          <Button
            variant={activeView === "releases" ? "default" : "outline"}
            onClick={() => setActiveView("releases")}
            className="bg-purple-600 hover:bg-purple-700"
          >
            <Music className="w-4 h-4 mr-2" />
            Releases
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
          <Input
            placeholder={`Search ${activeView}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-slate-800 border-slate-600 text-white w-80"
          />
        </div>
        <div className="flex gap-2">
          <Button className="bg-green-600 hover:bg-green-700">
            <Plus className="w-4 h-4 mr-2" />
            Add {activeView === "artists" ? "Artist" : "Release"}
          </Button>
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            Import
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {activeView === "artists" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {artistsData.map((artist) => (
            <Card key={artist.id} className="bg-slate-800/50 border-slate-700 hover:bg-slate-700/50 transition-colors">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  {artist.name}
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      artist.status === "Active" ? "bg-green-600" : "bg-slate-600"
                    }`}>
                      {artist.status}
                    </span>
                  </div>
                </CardTitle>
                <p className="text-slate-400">{artist.genre}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Releases:</span>
                    <span className="text-white">{artist.releases}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Total Streams:</span>
                    <span className="text-white">{artist.streams}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Revenue:</span>
                    <span className="text-green-400">{artist.revenue}</span>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <Button size="sm" variant="outline" className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    View
                  </Button>
                  <Button size="sm" className="bg-purple-600 hover:bg-purple-700 flex items-center gap-1">
                    <Edit className="w-3 h-3" />
                    Edit
                  </Button>
                  <Button size="sm" variant="outline" className="flex items-center gap-1">
                    <Music className="w-3 h-3" />
                    Releases
                  </Button>
                  <Button size="sm" variant="outline" className="text-red-400 hover:text-red-300 flex items-center gap-1">
                    <Trash2 className="w-3 h-3" />
                    Remove
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-700/50">
                  <tr>
                    <th className="text-left p-4 text-slate-300">Title</th>
                    <th className="text-left p-4 text-slate-300">Artist</th>
                    <th className="text-left p-4 text-slate-300">Release Date</th>
                    <th className="text-left p-4 text-slate-300">Streams</th>
                    <th className="text-left p-4 text-slate-300">Revenue</th>
                    <th className="text-left p-4 text-slate-300">Status</th>
                    <th className="text-left p-4 text-slate-300">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {releasesData.map((release) => (
                    <tr key={release.id} className="border-t border-slate-700 hover:bg-slate-700/30">
                      <td className="p-4 text-white font-medium">{release.title}</td>
                      <td className="p-4 text-slate-300">{release.artist}</td>
                      <td className="p-4 text-slate-300">{release.releaseDate}</td>
                      <td className="p-4 text-white">{release.streams}</td>
                      <td className="p-4 text-green-400">{release.revenue}</td>
                      <td className="p-4">
                        <span className="px-2 py-1 text-xs rounded-full bg-green-600 text-white">
                          {release.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-1">
                          <Button size="sm" variant="outline">
                            <Eye className="w-3 h-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                            <Download className="w-3 h-3" />
                          </Button>
                          <Button size="sm" variant="outline" className="text-red-400 hover:text-red-300">
                            <Trash2 className="w-3 h-3" />
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
      )}
    </div>
  );
};

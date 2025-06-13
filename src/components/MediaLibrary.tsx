
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Upload, Grid3x3, List, FileImage, FileAudio, FileVideo } from "lucide-react";

const mediaFiles = [
  {
    id: 1,
    name: "luna-star-midnight-echoes-cover.jpg",
    type: "image",
    size: "2.4 MB",
    uploadDate: "2024-03-15",
    artist: "Luna Star",
    url: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop&crop=center"
  },
  {
    id: 2,
    name: "echo-wave-digital-dreams.mp3",
    type: "audio",
    size: "8.7 MB",
    uploadDate: "2024-02-28",
    artist: "Echo Wave",
    url: ""
  },
  {
    id: 3,
    name: "neon-dreams-cosmic-journey-video.mp4",
    type: "video",
    size: "145 MB",
    uploadDate: "2024-04-10",
    artist: "Neon Dreams",
    url: ""
  },
  {
    id: 4,
    name: "studio-session-behind-scenes.jpg",
    type: "image",
    size: "3.1 MB",
    uploadDate: "2024-03-20",
    artist: "Various",
    url: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop&crop=center"
  },
  {
    id: 5,
    name: "promotional-banner-summer.png",
    type: "image",
    size: "1.8 MB",
    uploadDate: "2024-04-01",
    artist: "Marketing",
    url: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop&crop=center"
  },
  {
    id: 6,
    name: "live-performance-recording.mp4",
    type: "video",
    size: "89 MB",
    uploadDate: "2024-03-25",
    artist: "Luna Star",
    url: ""
  }
];

export const MediaLibrary = () => {
  const [viewMode, setViewMode] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const getFileIcon = (type: string) => {
    switch (type) {
      case "image":
        return <FileImage className="w-6 h-6 text-purple-500" />;
      case "audio":
        return <FileAudio className="w-6 h-6 text-green-500" />;
      case "video":
        return <FileVideo className="w-6 h-6 text-blue-500" />;
      default:
        return <FileImage className="w-6 h-6 text-slate-500" />;
    }
  };

  const filteredFiles = mediaFiles.filter(file =>
    file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    file.artist.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openLightbox = (file: any) => {
    if (file.type === "image" && file.url) {
      setSelectedFile(file);
      setLightboxOpen(true);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Media Library</h1>
        <div className="flex gap-2">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            onClick={() => setViewMode("grid")}
            size="sm"
          >
            <Grid3x3 className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            onClick={() => setViewMode("list")}
            size="sm"
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
          <Input
            placeholder="Search media files..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-slate-800 border-slate-600 text-white w-80"
          />
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <Upload className="w-4 h-4 mr-2" />
          Upload Files
        </Button>
      </div>

      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredFiles.map((file) => (
            <Card 
              key={file.id} 
              className="bg-slate-800/50 border-slate-700 hover:bg-slate-700/50 transition-colors cursor-pointer"
              onClick={() => openLightbox(file)}
            >
              <CardContent className="p-4">
                <div className="aspect-square bg-slate-700 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                  {file.type === "image" && file.url ? (
                    <img 
                      src={file.url} 
                      alt={file.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    getFileIcon(file.type)
                  )}
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-white font-medium text-sm truncate">{file.name}</h3>
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>{file.size}</span>
                    <span className={`px-2 py-1 rounded-full ${
                      file.type === "image" ? "bg-purple-600" :
                      file.type === "audio" ? "bg-green-600" : "bg-blue-600"
                    }`}>
                      {file.type}
                    </span>
                  </div>
                  <p className="text-slate-400 text-xs">{file.artist}</p>
                  <p className="text-slate-500 text-xs">{file.uploadDate}</p>
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
                    <th className="text-left p-4 text-slate-300">Name</th>
                    <th className="text-left p-4 text-slate-300">Type</th>
                    <th className="text-left p-4 text-slate-300">Size</th>
                    <th className="text-left p-4 text-slate-300">Artist</th>
                    <th className="text-left p-4 text-slate-300">Upload Date</th>
                    <th className="text-left p-4 text-slate-300">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredFiles.map((file) => (
                    <tr key={file.id} className="border-t border-slate-700 hover:bg-slate-700/30">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          {getFileIcon(file.type)}
                          <span className="text-white font-medium">{file.name}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          file.type === "image" ? "bg-purple-600" :
                          file.type === "audio" ? "bg-green-600" : "bg-blue-600"
                        }`}>
                          {file.type}
                        </span>
                      </td>
                      <td className="p-4 text-slate-300">{file.size}</td>
                      <td className="p-4 text-slate-300">{file.artist}</td>
                      <td className="p-4 text-slate-300">{file.uploadDate}</td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            Download
                          </Button>
                          <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                            View
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

      {/* Lightbox */}
      {lightboxOpen && selectedFile && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <div className="max-w-4xl max-h-full">
            <img 
              src={selectedFile.url} 
              alt={selectedFile.name}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            <div className="text-center mt-4">
              <h3 className="text-white font-medium">{selectedFile.name}</h3>
              <p className="text-slate-400">{selectedFile.artist} • {selectedFile.uploadDate}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

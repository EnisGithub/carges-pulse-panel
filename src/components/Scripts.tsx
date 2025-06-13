
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Play, 
  Pause, 
  Square, 
  RefreshCw, 
  Star, 
  Music, 
  Cpu, 
  Activity,
  Settings,
  Eye,
  Download
} from "lucide-react";

interface Script {
  id: string;
  name: string;
  description: string;
  status: 'running' | 'stopped' | 'paused' | 'error';
  progress: number;
  totalItems: number;
  processedItems: number;
  stars: number;
  lastRun: string;
  cpu: number;
  memory: number;
}

const initialScripts: Script[] = [
  {
    id: 'song-generator',
    name: 'AI Song Generation Worker',
    description: 'Generates new songs using AI algorithms',
    status: 'running',
    progress: 75,
    totalItems: 100,
    processedItems: 75,
    stars: 4.8,
    lastRun: '2 minutes ago',
    cpu: 85,
    memory: 62
  },
  {
    id: 'audio-processor',
    name: 'Audio Processing Pipeline',
    description: 'Processes and masters audio files',
    status: 'running',
    progress: 40,
    totalItems: 25,
    processedItems: 10,
    stars: 4.9,
    lastRun: '5 minutes ago',
    cpu: 72,
    memory: 45
  },
  {
    id: 'metadata-extractor',
    name: 'Metadata Extraction Service',
    description: 'Extracts and analyzes music metadata',
    status: 'stopped',
    progress: 0,
    totalItems: 500,
    processedItems: 485,
    stars: 4.6,
    lastRun: '1 hour ago',
    cpu: 0,
    memory: 8
  },
  {
    id: 'streaming-analyzer',
    name: 'Streaming Data Analyzer',
    description: 'Analyzes streaming platform data',
    status: 'running',
    progress: 90,
    totalItems: 1000,
    processedItems: 900,
    stars: 4.7,
    lastRun: '30 seconds ago',
    cpu: 45,
    memory: 35
  },
  {
    id: 'social-monitor',
    name: 'Social Media Monitor',
    description: 'Monitors social media mentions and trends',
    status: 'paused',
    progress: 55,
    totalItems: 200,
    processedItems: 110,
    stars: 4.4,
    lastRun: '15 minutes ago',
    cpu: 15,
    memory: 25
  }
];

export const Scripts = () => {
  const [scripts, setScripts] = useState<Script[]>(initialScripts);
  const [selectedScript, setSelectedScript] = useState<string | null>(null);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setScripts(prev => prev.map(script => {
        if (script.status === 'running') {
          const newProcessed = Math.min(script.processedItems + Math.floor(Math.random() * 3), script.totalItems);
          const newProgress = Math.round((newProcessed / script.totalItems) * 100);
          return {
            ...script,
            processedItems: newProcessed,
            progress: newProgress,
            cpu: Math.max(10, script.cpu + Math.floor(Math.random() * 20 - 10)),
            memory: Math.max(5, script.memory + Math.floor(Math.random() * 15 - 7))
          };
        }
        return script;
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleScriptAction = (scriptId: string, action: 'start' | 'pause' | 'stop') => {
    setScripts(prev => prev.map(script => {
      if (script.id === scriptId) {
        let newStatus: Script['status'] = script.status;
        switch (action) {
          case 'start':
            newStatus = 'running';
            break;
          case 'pause':
            newStatus = 'paused';
            break;
          case 'stop':
            newStatus = 'stopped';
            break;
        }
        return { ...script, status: newStatus };
      }
      return script;
    }));
  };

  const getStatusColor = (status: Script['status']) => {
    switch (status) {
      case 'running': return 'bg-green-500';
      case 'paused': return 'bg-yellow-500';
      case 'stopped': return 'bg-gray-500';
      case 'error': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: Script['status']) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const totalSongsGenerated = scripts.find(s => s.id === 'song-generator')?.processedItems || 0;
  const totalProcessedFiles = scripts.reduce((sum, script) => sum + script.processedItems, 0);
  const averageRating = scripts.reduce((sum, script) => sum + script.stars, 0) / scripts.length;
  const activeScripts = scripts.filter(s => s.status === 'running').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Scripts & Control Center</h1>
        <div className="flex gap-2">
          <Button className="bg-purple-600 hover:bg-purple-700">
            <RefreshCw size={16} className="mr-2" />
            Refresh All
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Songs Generated</p>
                <p className="text-2xl font-bold text-white">{totalSongsGenerated}</p>
                <p className="text-green-400 text-sm">+12 today</p>
              </div>
              <Music className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Active Scripts</p>
                <p className="text-2xl font-bold text-white">{activeScripts}</p>
                <p className="text-blue-400 text-sm">of {scripts.length} total</p>
              </div>
              <Activity className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Total Processed</p>
                <p className="text-2xl font-bold text-white">{totalProcessedFiles.toLocaleString()}</p>
                <p className="text-yellow-400 text-sm">files processed</p>
              </div>
              <Cpu className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Average Rating</p>
                <p className="text-2xl font-bold text-white">{averageRating.toFixed(1)}</p>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={12} 
                      className={i < Math.floor(averageRating) ? "text-yellow-400 fill-current" : "text-slate-600"} 
                    />
                  ))}
                </div>
              </div>
              <Star className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Scripts Control Panel */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Script Control Panel</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {scripts.map((script) => (
              <div key={script.id} className="bg-slate-700/30 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Badge className={`${getStatusColor(script.status)} text-white`}>
                      {getStatusText(script.status)}
                    </Badge>
                    <h3 className="text-white font-medium">{script.name}</h3>
                    <div className="flex items-center gap-1">
                      <Star size={14} className="text-yellow-400 fill-current" />
                      <span className="text-slate-300 text-sm">{script.stars}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleScriptAction(script.id, 'start')}
                      disabled={script.status === 'running'}
                      className="border-green-600 text-green-400 hover:bg-green-600 hover:text-white"
                    >
                      <Play size={14} />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleScriptAction(script.id, 'pause')}
                      disabled={script.status !== 'running'}
                      className="border-yellow-600 text-yellow-400 hover:bg-yellow-600 hover:text-white"
                    >
                      <Pause size={14} />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleScriptAction(script.id, 'stop')}
                      disabled={script.status === 'stopped'}
                      className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
                    >
                      <Square size={14} />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-slate-600 text-slate-400 hover:bg-slate-600 hover:text-white"
                    >
                      <Settings size={14} />
                    </Button>
                  </div>
                </div>

                <p className="text-slate-400 text-sm mb-3">{script.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-400">Progress</span>
                      <span className="text-white">{script.progress}%</span>
                    </div>
                    <Progress value={script.progress} className="h-2" />
                    <p className="text-xs text-slate-500 mt-1">
                      {script.processedItems} / {script.totalItems} items
                    </p>
                  </div>

                  <div className="flex justify-between">
                    <div>
                      <p className="text-slate-400 text-xs">CPU Usage</p>
                      <p className="text-white font-medium">{script.cpu}%</p>
                    </div>
                    <div>
                      <p className="text-slate-400 text-xs">Memory</p>
                      <p className="text-white font-medium">{script.memory}%</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-slate-400 text-xs">Last Run</p>
                    <p className="text-white text-sm">{script.lastRun}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

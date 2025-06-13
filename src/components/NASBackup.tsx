
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  HardDrive, 
  Play, 
  Pause, 
  RefreshCw, 
  Settings, 
  CheckCircle, 
  AlertCircle,
  Clock,
  Database
} from "lucide-react";

const backupJobs = [
  {
    id: 1,
    name: "Master Audio Files",
    source: "/studio/masters",
    destination: "NAS://backup/masters",
    status: "completed",
    progress: 100,
    lastBackup: "2024-01-12 14:30",
    size: "2.4 TB",
    schedule: "Daily at 2:00 AM"
  },
  {
    id: 2,
    name: "Artist Projects",
    source: "/projects/active",
    destination: "NAS://backup/projects",
    status: "running",
    progress: 67,
    lastBackup: "2024-01-12 09:15",
    size: "890 GB",
    schedule: "Every 6 hours"
  },
  {
    id: 3,
    name: "Media Library",
    source: "/media/library",
    destination: "NAS://backup/media",
    status: "scheduled",
    progress: 0,
    lastBackup: "2024-01-11 20:00",
    size: "1.2 TB",
    schedule: "Daily at 8:00 PM"
  },
  {
    id: 4,
    name: "Database Backups",
    source: "/database/dumps",
    destination: "NAS://backup/database",
    status: "error",
    progress: 0,
    lastBackup: "2024-01-10 02:00",
    size: "45 GB",
    schedule: "Daily at 2:00 AM"
  }
];

const nasStatus = {
  connected: true,
  totalSpace: "12 TB",
  usedSpace: "8.2 TB",
  freeSpace: "3.8 TB",
  health: "Good",
  temperature: "42°C",
  uptime: "45 days"
};

export const NASBackup = () => {
  const [selectedJob, setSelectedJob] = useState<number | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-600";
      case "running": return "bg-blue-600";
      case "scheduled": return "bg-yellow-600";
      case "error": return "bg-red-600";
      default: return "bg-slate-600";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle className="w-4 h-4" />;
      case "running": return <RefreshCw className="w-4 h-4 animate-spin" />;
      case "scheduled": return <Clock className="w-4 h-4" />;
      case "error": return <AlertCircle className="w-4 h-4" />;
      default: return <Database className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">NAS Backup</h1>
        <div className="flex gap-2">
          <Button className="bg-green-600 hover:bg-green-700">
            <Play className="w-4 h-4 mr-2" />
            Start All Backups
          </Button>
          <Button variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            Configure
          </Button>
        </div>
      </div>

      {/* NAS Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">NAS Status</p>
                <p className={`font-semibold ${nasStatus.connected ? 'text-green-400' : 'text-red-400'}`}>
                  {nasStatus.connected ? 'Connected' : 'Disconnected'}
                </p>
              </div>
              <HardDrive className={`w-8 h-8 ${nasStatus.connected ? 'text-green-400' : 'text-red-400'}`} />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Storage Used</p>
                <p className="text-white font-semibold">{nasStatus.usedSpace} / {nasStatus.totalSpace}</p>
              </div>
              <div className="text-right">
                <p className="text-slate-300 text-sm">{Math.round((8.2/12)*100)}%</p>
                <Progress value={68} className="w-16 h-2 mt-1" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Health Status</p>
                <p className="text-green-400 font-semibold">{nasStatus.health}</p>
              </div>
              <div className="text-right">
                <p className="text-slate-300 text-sm">{nasStatus.temperature}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Uptime</p>
                <p className="text-white font-semibold">{nasStatus.uptime}</p>
              </div>
              <div className="text-right">
                <p className="text-slate-300 text-sm">Free: {nasStatus.freeSpace}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Backup Jobs */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Database className="w-5 h-5" />
            Backup Jobs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {backupJobs.map((job) => (
              <div 
                key={job.id} 
                className="p-4 bg-slate-700/30 rounded-lg border border-slate-600 hover:bg-slate-700/50 transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(job.status)}
                    <div>
                      <h3 className="text-white font-medium">{job.name}</h3>
                      <p className="text-slate-400 text-sm">{job.source} → {job.destination}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={`${getStatusColor(job.status)} text-white`}>
                      {job.status}
                    </Badge>
                    <span className="text-slate-300 text-sm">{job.size}</span>
                  </div>
                </div>
                
                {job.progress > 0 && (
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-400">Progress</span>
                      <span className="text-white">{job.progress}%</span>
                    </div>
                    <Progress value={job.progress} className="h-2" />
                  </div>
                )}
                
                <div className="flex items-center justify-between">
                  <div className="text-sm text-slate-400">
                    <span>Last backup: {job.lastBackup}</span>
                    <span className="mx-2">•</span>
                    <span>Schedule: {job.schedule}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Play className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Pause className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Settings className="w-4 h-4" />
                    </Button>
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

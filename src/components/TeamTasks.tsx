
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Users, Clock } from "lucide-react";

const taskColumns = [
  {
    id: "todo",
    title: "To Do",
    color: "bg-slate-600",
    tasks: [
      {
        id: 1,
        title: "Master new Luna Star track",
        description: "Final mastering for 'Midnight Echoes'",
        assignee: "Audio Engineer",
        priority: "High",
        dueDate: "2024-06-20"
      },
      {
        id: 2,
        title: "Design album artwork",
        description: "Create cover art for Echo Wave's upcoming EP",
        assignee: "Design Team",
        priority: "Medium",
        dueDate: "2024-06-25"
      }
    ]
  },
  {
    id: "progress",
    title: "In Progress",
    color: "bg-yellow-600",
    tasks: [
      {
        id: 3,
        title: "Video editing",
        description: "Edit music video for 'Digital Dreams'",
        assignee: "Video Editor",
        priority: "High",
        dueDate: "2024-06-18"
      },
      {
        id: 4,
        title: "Social media campaign",
        description: "Create content for summer campaign",
        assignee: "Marketing Team",
        priority: "Medium",
        dueDate: "2024-06-22"
      }
    ]
  },
  {
    id: "review",
    title: "Review",
    color: "bg-blue-600",
    tasks: [
      {
        id: 5,
        title: "Contract review",
        description: "Review distribution agreement terms",
        assignee: "Legal Team",
        priority: "High",
        dueDate: "2024-06-17"
      }
    ]
  },
  {
    id: "done",
    title: "Done",
    color: "bg-green-600",
    tasks: [
      {
        id: 6,
        title: "Spotify playlist submission",
        description: "Submitted tracks to editorial playlists",
        assignee: "Promo Team",
        priority: "Medium",
        dueDate: "2024-06-15"
      },
      {
        id: 7,
        title: "Radio promotion setup",
        description: "Coordinated with radio partners",
        assignee: "Promo Team",
        priority: "Low",
        dueDate: "2024-06-14"
      }
    ]
  }
];

const teamMembers = [
  { name: "Audio Engineer", avatar: "AE", color: "bg-purple-600" },
  { name: "Design Team", avatar: "DT", color: "bg-blue-600" },
  { name: "Video Editor", avatar: "VE", color: "bg-green-600" },
  { name: "Marketing Team", avatar: "MT", color: "bg-yellow-600" },
  { name: "Legal Team", avatar: "LT", color: "bg-red-600" },
  { name: "Promo Team", avatar: "PT", color: "bg-indigo-600" }
];

export const TeamTasks = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [draggedTask, setDraggedTask] = useState(null);

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "bg-red-600";
      case "medium":
        return "bg-yellow-600";
      case "low":
        return "bg-green-600";
      default:
        return "bg-slate-600";
    }
  };

  const totalTasks = taskColumns.reduce((sum, col) => sum + col.tasks.length, 0);
  const doneTasks = taskColumns.find(col => col.id === "done")?.tasks.length || 0;
  const inProgressTasks = taskColumns.find(col => col.id === "progress")?.tasks.length || 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Team & Tasks</h1>
        <Button className="bg-green-600 hover:bg-green-700">
          <Plus className="w-4 h-4 mr-2" />
          New Task
        </Button>
      </div>

      {/* Team Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Total Tasks</p>
                <p className="text-2xl font-bold text-white">{totalTasks}</p>
              </div>
              <Clock className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">In Progress</p>
                <p className="text-2xl font-bold text-white">{inProgressTasks}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Completed</p>
                <p className="text-2xl font-bold text-white">{doneTasks}</p>
              </div>
              <Clock className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Team Members</p>
                <p className="text-2xl font-bold text-white">{teamMembers.length}</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Team Members */}
      <div className="flex items-center justify-between">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
          <Input
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-slate-800 border-slate-600 text-white w-80"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-slate-400 text-sm">Team:</span>
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className={`w-8 h-8 rounded-full ${member.color} flex items-center justify-center text-white text-xs font-bold cursor-pointer hover:opacity-80 transition-opacity`}
              title={member.name}
            >
              {member.avatar}
            </div>
          ))}
        </div>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {taskColumns.map((column) => (
          <Card key={column.id} className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-white flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${column.color}`}></div>
                {column.title}
                <Badge variant="secondary" className="ml-auto">
                  {column.tasks.length}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {column.tasks
                .filter(task => 
                  searchTerm === "" || 
                  task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  task.description.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((task) => (
                <div
                  key={task.id}
                  className="p-4 bg-slate-700/50 rounded-lg border border-slate-600 hover:bg-slate-700/70 transition-colors cursor-move"
                  draggable
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <h3 className="text-white font-medium text-sm">{task.title}</h3>
                      <Badge 
                        className={`text-xs ${getPriorityColor(task.priority)} text-white`}
                      >
                        {task.priority}
                      </Badge>
                    </div>
                    
                    <p className="text-slate-400 text-xs">{task.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-purple-600 rounded-full flex items-center justify-center text-white text-xs">
                          {task.assignee.split(' ').map(word => word[0]).join('')}
                        </div>
                        <span className="text-slate-400 text-xs">{task.assignee}</span>
                      </div>
                      <span className="text-slate-500 text-xs">{task.dueDate}</span>
                    </div>
                  </div>
                </div>
              ))}
              
              {column.tasks.length === 0 && (
                <div className="text-center py-8 text-slate-500">
                  No tasks in this column
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

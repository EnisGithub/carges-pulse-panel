
import { useState } from "react";
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  Database,
  FileText,
  DollarSign,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Terminal,
  HardDrive
} from "lucide-react";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "artists", label: "Artists & Releases", icon: Users },
  { id: "analytics", label: "Analytics & Reports", icon: Database },
  { id: "media", label: "Media Library", icon: FileText },
  { id: "finance", label: "Finance & Crypto", icon: DollarSign },
  { id: "promo", label: "Promo Orders", icon: Calendar },
  { id: "scripts", label: "Scripts & Control", icon: Terminal },
  { id: "backup", label: "NAS Backup", icon: HardDrive },
  { id: "team", label: "Team & Tasks", icon: Users },
  { id: "settings", label: "Settings & Admin", icon: Settings },
];

export const Sidebar = ({ activeTab, setActiveTab, collapsed, setCollapsed }: SidebarProps) => {
  return (
    <div className={`fixed left-0 top-0 h-full bg-slate-800/90 backdrop-blur-sm border-r border-slate-700 transition-all duration-300 z-50 ${collapsed ? 'w-16' : 'w-64'}`}>
      <div className="p-4 border-b border-slate-700 flex items-center justify-between">
        {!collapsed && (
          <h1 className="text-xl font-bold text-white">Carges Records</h1>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>
      
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                activeTab === item.id
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'text-slate-400 hover:text-white hover:bg-slate-700'
              }`}
            >
              <Icon size={20} />
              {!collapsed && <span className="font-medium">{item.label}</span>}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

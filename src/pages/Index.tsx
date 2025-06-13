
import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Dashboard } from "@/components/Dashboard";
import { Artists } from "@/components/Artists";
import { Analytics } from "@/components/Analytics";
import { MediaLibrary } from "@/components/MediaLibrary";
import { Finance } from "@/components/Finance";
import { PromoOrders } from "@/components/PromoOrders";
import { Scripts } from "@/components/Scripts";
import { NASBackup } from "@/components/NASBackup";
import { TeamTasks } from "@/components/TeamTasks";
import { Settings } from "@/components/Settings";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "artists":
        return <Artists />;
      case "analytics":
        return <Analytics />;
      case "media":
        return <MediaLibrary />;
      case "finance":
        return <Finance />;
      case "promo":
        return <PromoOrders />;
      case "scripts":
        return <Scripts />;
      case "backup":
        return <NASBackup />;
      case "team":
        return <TeamTasks />;
      case "settings":
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      <main className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        <div className="p-6">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default Index;

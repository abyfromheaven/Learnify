import { useState, useEffect } from "react";
import { BookOpen, Mic, FileText, History, Settings, Info, Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import TeacherPanel from "@/components/dashboard/TeacherPanel";
import TranscriptPanel from "@/components/dashboard/TranscriptPanel";
import HistoryPanel from "@/components/dashboard/HistoryPanel";

const Dashboard = () => {
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState<"teacher" | "transcript" | "history">("teacher");
  const [className] = useState(localStorage.getItem("learnify-class") || "XI RPL");

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border flex flex-col">
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <BookOpen className="w-8 h-8 text-primary" />
            <div>
              <h1 className="text-xl font-bold">Learnify</h1>
              <p className="text-xs text-muted-foreground">AI Learning Assistant</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          <Button
            variant={activeTab === "teacher" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("teacher")}
          >
            <Mic className="w-4 h-4 mr-2" />
            Guru & Rekaman
          </Button>
          <Button
            variant={activeTab === "transcript" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("transcript")}
          >
            <FileText className="w-4 h-4 mr-2" />
            Transkrip & Chat
          </Button>
          <Button
            variant={activeTab === "history" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("history")}
          >
            <History className="w-4 h-4 mr-2" />
            Riwayat
          </Button>
        </nav>

        <div className="p-3 border-t border-border space-y-1">
          <Button variant="ghost" className="w-full justify-start">
            <Settings className="w-4 h-4 mr-2" />
            Pengaturan
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Info className="w-4 h-4 mr-2" />
            Tentang
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={toggleTheme}
          >
            {theme === "light" ? (
              <>
                <Moon className="w-4 h-4 mr-2" />
                Dark Mode
              </>
            ) : (
              <>
                <Sun className="w-4 h-4 mr-2" />
                Light Mode
              </>
            )}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <DashboardHeader className={className} />
        
        <div className="flex-1 p-6 overflow-auto">
          {activeTab === "teacher" && <TeacherPanel />}
          {activeTab === "transcript" && <TranscriptPanel />}
          {activeTab === "history" && <HistoryPanel />}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

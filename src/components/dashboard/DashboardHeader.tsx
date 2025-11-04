import { useState, useEffect } from "react";
import { Calendar, Clock } from "lucide-react";

interface DashboardHeaderProps {
  className: string;
}

const DashboardHeader = ({ className }: DashboardHeaderProps) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("id-ID", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
  };

  return (
    <header className="bg-card border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Dashboard</h2>
          <p className="text-sm text-muted-foreground">Selamat datang di Learnify</p>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4 text-primary" />
            <span className="font-mono">{formatTime(currentTime)}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4 text-primary" />
            <span>{formatDate(currentTime)}</span>
          </div>
          <div className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-semibold">
            {className}
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, FileText, Calendar, Clock, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HistoryPanel = () => {
  const navigate = useNavigate();

  const historyItems = [
    {
      id: 1,
      teacher: "Pak Budi Santoso",
      subject: "Jaringan Komputer - IP Addressing",
      date: "2025-01-15",
      duration: "45:23",
      status: "completed" as const,
    },
    {
      id: 2,
      teacher: "Bu Siti Nurhaliza",
      subject: "Pemrograman Web - React Hooks",
      date: "2025-01-14",
      duration: "52:10",
      status: "completed" as const,
    },
    {
      id: 3,
      teacher: "Pak Ahmad Rifai",
      subject: "Basis Data - Normalisasi",
      date: "2025-01-13",
      duration: "48:30",
      status: "completed" as const,
    },
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Riwayat Pembelajaran</h3>
        <Badge variant="secondary">{historyItems.length} Rekaman</Badge>
      </div>

      <div className="grid gap-4">
        {historyItems.map((item) => (
          <Card key={item.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-3">
                  <div>
                    <h4 className="font-semibold text-lg mb-1">{item.subject}</h4>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <User className="w-4 h-4" />
                      <span>{item.teacher}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(item.date)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{item.duration}</span>
                    </div>
                    <Badge className="bg-success">Selesai</Badge>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(`/session/${item.id}`)}
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Lihat Detail
                  </Button>
                  <Button variant="outline" size="sm">
                    <Play className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HistoryPanel;

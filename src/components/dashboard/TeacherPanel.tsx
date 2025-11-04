import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mic, Square, Play, User, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const TeacherPanel = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isRecording, setIsRecording] = useState(false);

  const teachers = [
    {
      id: 1,
      name: "Pak Budi Santoso",
      subject: "Jaringan Komputer",
      startTime: "07:30",
      endTime: "09:00",
      status: "active" as const,
    },
    {
      id: 2,
      name: "Bu Siti Nurhaliza",
      subject: "Pemrograman Web",
      startTime: "09:15",
      endTime: "10:45",
      status: "scheduled" as const,
    },
    {
      id: 3,
      name: "Pak Ahmad Rifai",
      subject: "Basis Data",
      startTime: "11:00",
      endTime: "12:30",
      status: "scheduled" as const,
    },
  ];

  const handleStartRecording = () => {
    setIsRecording(true);
    toast({
      title: "Rekaman Dimulai",
      description: "Sedang merekam audio pembelajaran...",
    });
    // Navigate to recording page after 1 second
    setTimeout(() => {
      navigate("/recording");
    }, 1000);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    toast({
      title: "Rekaman Dihentikan",
      description: "Audio sedang diproses...",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-success">Sedang Mengajar</Badge>;
      case "scheduled":
        return <Badge variant="secondary">Terjadwal</Badge>;
      default:
        return <Badge variant="outline">Selesai</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-4">Guru & Pelajaran Hari Ini</h3>
        <div className="grid gap-4">
          {teachers.map((teacher) => (
            <Card key={teacher.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="w-6 h-6 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-semibold text-lg">{teacher.name}</h4>
                      <p className="text-muted-foreground">{teacher.subject}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>{teacher.startTime} - {teacher.endTime}</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {getStatusBadge(teacher.status)}
                    {teacher.status === "active" && (
                      <div className="flex gap-2">
                        {!isRecording ? (
                          <Button
                            onClick={handleStartRecording}
                            className="bg-gradient-primary"
                          >
                            <Mic className="w-4 h-4 mr-2" />
                            Mulai Rekam
                          </Button>
                        ) : (
                          <Button
                            onClick={handleStopRecording}
                            variant="destructive"
                          >
                            <Square className="w-4 h-4 mr-2" />
                            Stop
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <Card className="bg-gradient-primary text-white">
        <CardHeader>
          <CardTitle>Rekam Pembelajaran Baru</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-white/90">
            Mulai rekaman baru untuk mendapatkan transkripsi dan ringkasan materi secara otomatis
          </p>
          <Button
            onClick={handleStartRecording}
            variant="secondary"
            className="bg-white text-primary hover:bg-white/90"
          >
            <Mic className="w-4 h-4 mr-2" />
            Rekam Sekarang
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeacherPanel;

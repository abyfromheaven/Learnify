import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, MessageSquare, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TranscriptPanel = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Transkrip & Chatbot</h3>
        <Button variant="outline" size="sm">
          <RefreshCw className="w-4 h-4 mr-2" />
          Transkrip Ulang
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            Hasil Transkripsi Terbaru
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">Belum ada transkripsi aktif</p>
              <p className="text-sm">
                Mulai rekaman pembelajaran untuk mendapatkan transkripsi otomatis. Sistem akan secara otomatis mengubah
                audio menjadi teks dengan timestamp yang akurat.
              </p>
            </div>

            <Button
              onClick={() => navigate("/session/1")}
              className="w-full"
              variant="outline"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Lihat Contoh Sesi Chat
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-ai text-white">
        <CardHeader>
          <CardTitle>Chatbot AI Assistant</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-white/90">
            Tanyakan apapun tentang materi pembelajaran. AI akan menjawab berdasarkan konteks transkripsi dan ringkasan.
          </p>
          <div className="space-y-2">
            <div className="text-sm text-white/80">Contoh pertanyaan:</div>
            <ul className="list-disc list-inside space-y-1 text-sm text-white/90">
              <li>Jelaskan lagi tentang IP Address</li>
              <li>Apa perbedaan TCP dan UDP?</li>
              <li>Berikan contoh implementasi subnetting</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TranscriptPanel;

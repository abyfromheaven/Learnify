import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Play, Pause, RefreshCw, Send, Sparkles, FileText, MessageSquare } from "lucide-react";

const SessionDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState("00:00");
  const [message, setMessage] = useState("");
  
  type Message = {
    role: "user" | "assistant";
    content: string;
  };
  
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Halo! Saya AI assistant yang siap membantu kamu memahami materi tentang IP Addressing. Silakan tanya apapun!",
    },
  ]);

  const transcript = [
    { time: "00:00", text: "Selamat pagi semuanya, hari ini kita akan belajar tentang IP Address." },
    { time: "00:15", text: "IP Address adalah alamat unik yang diberikan ke setiap device di jaringan." },
    { time: "00:30", text: "Ada dua versi IP Address yang umum digunakan: IPv4 dan IPv6." },
    { time: "00:45", text: "IPv4 menggunakan format 32-bit yang ditulis dalam notasi desimal bertitik." },
    { time: "01:00", text: "Contohnya adalah 192.168.1.1, yang familiar buat kalian semua." },
  ];

  const summary = `
Materi Pembelajaran: IP Addressing dan Jaringan Komputer

Poin-Poin Penting:
1. IP Address adalah identitas unik untuk setiap perangkat dalam jaringan
2. Terdapat dua versi: IPv4 (32-bit) dan IPv6 (128-bit)
3. Format IPv4: xxx.xxx.xxx.xxx (contoh: 192.168.1.1)
4. IPv4 terbagi menjadi kelas-kelas (A, B, C, D, E)
5. Subnetting digunakan untuk membagi jaringan menjadi segmen-segmen lebih kecil

Konsep Kunci:
- Network Address: Bagian yang mengidentifikasi jaringan
- Host Address: Bagian yang mengidentifikasi device spesifik
- Subnet Mask: Menentukan bagian mana yang network dan host
- Gateway: Pintu keluar dari suatu jaringan lokal
  `;

  const handleSendMessage = () => {
    if (!message.trim()) return;

    setMessages([
      ...messages,
      { role: "user" as const, content: message },
      {
        role: "assistant" as const,
        content: "Berdasarkan materi yang dijelaskan Pak Budi, IP Address adalah alamat unik yang mengidentifikasi setiap device di jaringan. Untuk lebih jelasnya, coba perhatikan timestamp 00:15 di transkripsi.",
      },
    ]);
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => navigate("/dashboard")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali
          </Button>
          <Badge className="bg-success">Sesi Selesai</Badge>
        </div>

        {/* Header Info */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-2xl">Jaringan Komputer - IP Addressing</CardTitle>
                <p className="text-muted-foreground mt-1">Pak Budi Santoso • 15 Januari 2025 • 45:23</p>
              </div>
              <Button variant="outline" size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                Proses Ulang
              </Button>
            </div>
          </CardHeader>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Transcript & Summary */}
          <div className="lg:col-span-2 space-y-6">
            {/* Audio Player */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <Button
                    size="lg"
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="shrink-0"
                  >
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  </Button>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-mono">{currentTime}</span>
                      <span className="text-sm text-muted-foreground">45:23</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary w-1/4 transition-all" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Transcript */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  Transkripsi Audio
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px] pr-4">
                  <div className="space-y-4">
                    {transcript.map((item, index) => (
                      <div key={index} className="flex gap-3">
                        <Badge variant="outline" className="shrink-0 h-fit">
                          {item.time}
                        </Badge>
                        <p className="text-sm">{item.text}</p>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Summary */}
            <Card className="bg-gradient-ai text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Ringkasan & Penjelasan Materi
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px] pr-4">
                  <div className="text-sm whitespace-pre-line text-white/90">
                    {summary}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Chatbot */}
          <div className="lg:col-span-1">
            <Card className="h-[calc(100vh-12rem)] flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-primary" />
                  AI Assistant
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col p-0">
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {messages.map((msg, index) => (
                      <div
                        key={index}
                        className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg p-3 ${
                            msg.role === "user"
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted"
                          }`}
                        >
                          <p className="text-sm">{msg.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                <div className="p-4 border-t border-border">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Tanya tentang materi..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                    />
                    <Button onClick={handleSendMessage}>
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionDetail;

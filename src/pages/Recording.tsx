import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mic, Square, Play, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Recording = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isRecording, setIsRecording] = useState(true);
  const [duration, setDuration] = useState(0);
  const [audioLevel, setAudioLevel] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setDuration((prev) => prev + 1);
        // Simulate audio level changes
        setAudioLevel(Math.random() * 100);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    toast({
      title: "Rekaman Selesai",
      description: "Audio sedang diproses untuk transkripsi...",
    });
    // Simulate processing then redirect
    setTimeout(() => {
      navigate("/session/1");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <Button variant="ghost" onClick={() => navigate("/dashboard")}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali ke Dashboard
        </Button>

        <Card className="shadow-lg">
          <CardContent className="p-12">
            <div className="text-center space-y-8">
              {/* Recording Indicator */}
              <div className="relative">
                <div className="w-32 h-32 mx-auto rounded-full bg-gradient-primary flex items-center justify-center shadow-glow animate-pulse">
                  <Mic className="w-16 h-16 text-white" />
                </div>
                {isRecording && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-40 h-40 rounded-full border-4 border-primary animate-ping opacity-20" />
                  </div>
                )}
              </div>

              {/* Status */}
              <div>
                <h2 className="text-3xl font-bold mb-2">
                  {isRecording ? "Sedang Merekam..." : "Rekaman Dihentikan"}
                </h2>
                <p className="text-muted-foreground">
                  {isRecording
                    ? "Audio sedang direkam dan akan ditranskripsi secara otomatis"
                    : "Memproses audio untuk transkripsi"}
                </p>
              </div>

              {/* Duration */}
              <div className="text-6xl font-mono font-bold text-primary">
                {formatDuration(duration)}
              </div>

              {/* Audio Visualizer */}
              <div className="flex items-end justify-center gap-1 h-24">
                {Array.from({ length: 50 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-2 bg-primary rounded-full transition-all duration-150"
                    style={{
                      height: `${Math.max(10, (Math.sin(i * 0.5 + audioLevel / 10) + 1) * 30)}%`,
                      opacity: isRecording ? 1 : 0.3,
                    }}
                  />
                ))}
              </div>

              {/* Controls */}
              <div className="flex gap-4 justify-center pt-4">
                {isRecording ? (
                  <Button
                    size="lg"
                    variant="destructive"
                    onClick={handleStopRecording}
                    className="px-8"
                  >
                    <Square className="w-5 h-5 mr-2" />
                    Stop Rekaman
                  </Button>
                ) : (
                  <Button
                    size="lg"
                    onClick={() => setIsRecording(true)}
                    className="px-8 bg-gradient-primary"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Lanjut Rekam
                  </Button>
                )}
              </div>

              {/* Info */}
              <div className="pt-4 text-sm text-muted-foreground">
                <p>Format: Audio PCM 16-bit | Sample Rate: 24kHz</p>
                <p>Transkripsi otomatis akan dimulai setelah rekaman dihentikan</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Recording;

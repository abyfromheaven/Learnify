import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Mic, MessageSquare, Sparkles } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [classCode, setClassCode] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mockup login - langsung redirect ke dashboard
    localStorage.setItem("learnify-class", classCode || "XI RPL");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-primary flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding */}
        <div className="text-white space-y-6 hidden lg:block">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <BookOpen className="w-7 h-7" />
            </div>
            <h1 className="text-4xl font-bold">Learnify</h1>
          </div>
          <p className="text-2xl font-semibold">From Voices to Knowledge</p>
          <p className="text-white/90 text-lg">
            Ubah penjelasan guru menjadi teks, ringkasan, dan chatbot interaktif dengan teknologi AI
          </p>
          
          <div className="space-y-4 pt-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
                <Mic className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold">Rekam & Transkripsi</h3>
                <p className="text-white/80 text-sm">Rekam suara guru dan dapatkan transkripsi otomatis</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold">Ringkasan AI</h3>
                <p className="text-white/80 text-sm">Dapatkan ringkasan materi yang mudah dipahami</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold">Chatbot Interaktif</h3>
                <p className="text-white/80 text-sm">Tanya jawab tentang materi dengan AI assistant</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <Card className="shadow-2xl">
          <CardHeader className="space-y-1">
            <div className="flex lg:hidden items-center gap-2 mb-4">
              <BookOpen className="w-8 h-8 text-primary" />
              <span className="text-2xl font-bold">Learnify</span>
            </div>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>Masuk dengan akun kelas untuk memulai</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="classCode">Kode Kelas</Label>
                <Input
                  id="classCode"
                  placeholder="Contoh: XI RPL"
                  value={classCode}
                  onChange={(e) => setClassCode(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Masukkan password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Masuk
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;

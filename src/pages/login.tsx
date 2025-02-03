// pages/LoginPage.tsx
import { LoginForm } from "../components/LoginForm";
import logo from "../assets/logo-hos-sistemas.png";
import suportImg from "../assets/suporte-servicos.png";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast()

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = formData.get("user") as string;
    const password = formData.get("password") as string;

    const isAuthenticated = await login(username, password);

    if (isAuthenticated) {
      navigate("/dashboard");
    } else {
      toast({
        title: "Problema ao efetuar login",
        description: "Usuário e/ou senha inválidos!",
        variant: "destructive"
      })
    }
  };

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col px-6 md:px-20">
        <div className="flex justify-center gap-2 md:justify-start">
          <a
            href="https://hossistemas.com.br/"
            target="_blank"
            className="w-[64px] flex items-center gap-2 font-medium"
          >
            <img
              src={logo}
              alt="Logo HOS Sistemas"
              className="object-cover dark:brightness-[0.2] dark:grayscale"        
            />
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm handleLogin={handleLogin} />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-[#ff6052] lg:block">
        <img
          src={suportImg}
          alt="Suporte e Serviços"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}

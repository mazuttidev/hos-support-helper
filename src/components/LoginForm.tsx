import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface LoginFormProps extends React.ComponentPropsWithoutRef<"form"> {
    handleLogin: (event: React.FormEvent<HTMLFormElement>) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
    className,
    handleLogin,
    ...props
}) => {
    return (
        <form
            className={cn("flex flex-col gap-6", className)}
            onSubmit={handleLogin}
            {...props}
        >
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Bem-vindo ao HOS Helper</h1>
                <p className="text-balance text-sm text-muted-foreground">
                    Acompanhe suas solicitações e chats de ajuda
                </p>
            </div>
            <div className="grid gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="user">Usuário</Label>
                    <Input
                        id="user"
                        name="user"
                        type="text"
                        placeholder="Informe seu usuário..."
                        className="p-5"
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="password">Senha</Label>
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Informe sua senha..."
                        className="p-5"
                    />
                </div>
                <Button
                    type="submit"
                    className="w-full p-5 bg-[#cf3a3a] hover:bg-[#b03030]"
                >
                    Login
                </Button>
            </div>
        </form>
    );
};

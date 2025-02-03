import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import logo from '../assets/logo-hos-sistemas.png'

const Header: React.FC = () => {
    const { logout } = useAuth();
    const [email, setEmail] = useState<string | null>("Não Encontrado");

    useEffect(() => {
        const storedEmail = localStorage.getItem("email");
        if (storedEmail) {
            setEmail(storedEmail);
        }else{

        }
    }, []);
    

    const handleLogout = () => {
        logout();
    };

    return (
        <header className="flex items-center justify-between p-3 px-[84px] border-b shadow-sm">
            <div className="flex items-center">
                <img
                    src={logo}
                    alt="Logo"
                    className="h-full w-[64px] object-cover"
                />
            </div>

            {/* Dropdown de Logout à direita */}
            <div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="flex items-center space-x-2 p-6">
                            <img
                                src={logo}
                                alt="User Avatar"
                                className="h-8 w-8 rounded"
                            />
                            <span className="text-sm font-medium">{email}</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem onClick={handleLogout}>
                            Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
};

export default Header;

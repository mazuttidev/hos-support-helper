import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "./ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { FormNewRequest } from "@/types";
import { createCard } from "@/api/apiService";
import { Loader2 } from "lucide-react";

export const HelpForm = ({ onSuccess } : any) => {
    const [formData, setFormData] = useState<FormNewRequest>({
        title: "",
        costumer: "",
        product: "web",
        productVersion: "",
        description: "",
        connectionType: "",
        connectionData: "",
        files: null,
    });
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const { toast } = useToast()

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;

        if (id in formData) {
            if (e.target instanceof HTMLInputElement && e.target.type === "file") {
                const files = e.target.files;
                setFormData((prev) => ({
                    ...prev,
                    [id]: files ? Array.from(files) : [],
                }));
            } else {
                setFormData((prev) => ({
                    ...prev,
                    [id]: value,
                }));
            }
        }
    };

    const handleRadioChange = (id: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const validateForm = () => {
        const requiredFields = ["title", "costumer", "product", "description"];
        const missingFields = requiredFields.filter((field) => !formData[field as keyof FormNewRequest]);

        if (missingFields.length > 0) {
            toast({
                title: "Erro",
                description: "Preencha todos os campos obrigatórios.",
                variant: "destructive",
            });
            return false;
        }

        return true;
    };

    const handleCreateNewRequest = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateForm()) return;
        setIsLoading(true);

        try {
            await createCard(formData);
            toast({
                title: "Sucesso",
                description: "Solicitação criada com sucesso!",
                variant: "default",
            });

            // Limpa os campos após o sucesso
            setFormData({
                title: "",
                costumer: "",
                product: "web",
                productVersion: "",
                description: "",
                connectionType: "",
                connectionData: "",
                files: null,
            });
            setOpen(false);
            onSuccess();
        } catch (error) {
            console.error(error);
            toast({
                title: "Erro",
                description: "Erro ao criar a solicitação. Tente novamente.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="mr-3 bg-[#d32b32] hover:bg-[#e85b61]">Nova Ajuda</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] h-[90vh] min-w-[60vw]">
                <form
                    className={cn("relative flex flex-col gap-6", isLoading && "pointer-events-none")}
                    onSubmit={handleCreateNewRequest}
                >
                    <DialogHeader>
                        <DialogTitle>Nova Solicitação</DialogTitle>
                        <DialogDescription>
                            Precisa de ajuda ou tem dúvidas? Abra uma solicitação para o time de análise!
                        </DialogDescription>
                    </DialogHeader>
                    <div className="relative grid gap-4 py-4 overflow-y-auto max-h-[68vh]">
                        {/* Overlay de loading restrito ao contêiner */}
                        {isLoading && (
                            <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
                                <Loader2 className="w-8 h-8 animate-spin text-[#d32b32]" />
                            </div>
                        )}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="title" className="text-right">
                                Título<span className="text-[#d32b32] pl-1">*</span>
                            </Label>
                            <Input
                                id="title"
                                className="col-span-3"
                                value={formData.title}
                                onChange={handleInputChange}
                                disabled={isLoading}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="costumer" className="text-right">
                                Cliente<span className="text-[#d32b32] pl-1">*</span>
                            </Label>
                            <Input
                                id="costumer"
                                className="col-span-3"
                                placeholder="CRM - Razão Social/Nome Fantasia"
                                value={formData.costumer}
                                onChange={handleInputChange}
                                disabled={isLoading}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="product" className="text-right">
                                Produto<span className="text-[#d32b32] pl-1">*</span>
                            </Label>
                            <RadioGroup
                                value={formData.product}
                                className="col-span-3"
                                onValueChange={(value) => handleRadioChange("product", value)}
                                disabled={isLoading}
                            >
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="web" id="r1" />
                                    <Label htmlFor="r1">WEB</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="desktop" id="r2" />
                                    <Label htmlFor="r2">DESKTOP</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="integracao" id="r3" />
                                    <Label htmlFor="r3">Integração</Label>
                                </div>
                            </RadioGroup>
                        </div>
                        {formData.product !== "web" && (
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="productVersion" className="text-right">
                                    Versão do Produto<span className="text-[#d32b32] pl-1">*</span>
                                </Label>
                                <Input
                                    id="productVersion"
                                    className="col-span-3"
                                    placeholder={
                                        formData.product === "desktop"
                                            ? "Exemplo: FC: 8.0.2.262, Firibird 4.0"
                                            : "Exemplo: Hos Gestão v8.0.0.200"
                                    }
                                    value={formData.productVersion}
                                    onChange={handleInputChange}
                                    disabled={isLoading}
                                />
                            </div>
                        )}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="text-right">
                                Descrição<span className="text-[#d32b32] pl-1">*</span>
                            </Label>
                            <Textarea
                                id="description"
                                className="col-span-3 min-h-[150px]"
                                placeholder="Escreva aqui..."
                                value={formData.description}
                                onChange={handleInputChange}
                                disabled={isLoading}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="connectionType" className="text-right">
                                Tipo de Conexão
                            </Label>
                            <RadioGroup
                                value={formData.connectionType}
                                className="col-span-3"
                                onValueChange={(value) => handleRadioChange("connectionType", value)}
                                disabled={isLoading}
                            >
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="anydesk" id="anydesk" />
                                    <Label htmlFor="anydesk">Anydesk</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="teamviewer" id="teamviewer" />
                                    <Label htmlFor="teamviewer">TeamViewer</Label>
                                </div>
                            </RadioGroup>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="connectionData" className="text-right">
                                Dados de conexão
                            </Label>
                            <Input
                                id="connectionData"
                                className="col-span-3"
                                placeholder="ID da conexão - Senha"
                                value={formData.connectionData}
                                onChange={handleInputChange}
                                disabled={isLoading}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right" htmlFor="files">
                                Anexos
                            </Label>
                            <Input
                                className="col-span-3 min-h-[110px]"
                                id="files"
                                type="file"
                                onChange={handleInputChange}
                                multiple
                                accept=".txt,.json,.doc,.docx,.jpg,.jpeg,.png,.gif,.webp,.svg"
                                disabled={isLoading}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            type="button"
                            onClick={() =>
                                setFormData({
                                    title: "",
                                    costumer: "",
                                    product: "web",
                                    productVersion: "",
                                    description: "",
                                    connectionType: "",
                                    connectionData: "",
                                    files: null,
                                })
                            }
                            disabled={isLoading}
                        >
                            Limpar
                        </Button>
                        <Button
                            type="submit"
                            className="bg-[#d32b32] hover:bg-[#e85b61] min-w-[72px]">
                            {isLoading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                "Enviar"
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

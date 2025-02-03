import { useEffect, useRef, useState } from "react";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import formatMarkdownMessage from "@/utils";
import useTrelloCommentsCards from "@/hooks/useTrelloCommentsCards";
import { createComment } from "@/api/apiService";
import { Input } from "./ui/input";
import { Loader2, Images, SendHorizonal } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

function SheetComponent({
    sheetType,
    openRowId,
    handleCloseSheet,
    currentCard
}: any) {
    const { trelloCommentsData, refetchComments } = useTrelloCommentsCards(openRowId); // refetchComments para forçar a atualização
    const messagesScrollDown = useRef<HTMLDivElement | null>(null);
    const [commentText, setCommentText] = useState("");
    const [selectedImages, setSelectedImages] = useState<File[]>([]);
    const [isSending, setIsSending] = useState(false);

    const handleSendMessage = async () => {
        if (!commentText.trim() && (!selectedImages || selectedImages.length === 0)) return;

        if (commentText.trim() == "") {
            toast({
                title: "Erro ao enviar mensagem!",
                description: "Escreva algum texto na mensagem.",
                variant: "destructive"
            });
            return;
        }

        setIsSending(true);
        try {
            await createComment(openRowId, {
                text: commentText,
                files: selectedImages.length > 0 ? selectedImages : undefined, // Garante que seja um array válido
            });

            setCommentText("");
            setSelectedImages([]);
            refetchComments();
        } catch (error: any) {
            let description = "Verifique os dados da mensagem e tente novamente mais tarde.";

            if (error.response?.status === 403) {
                description = error.response?.data.error;
            }
            toast({
                title: "Erro ao enviar mensagem!",
                description: description,
                variant: "destructive"
            })
        }
        setIsSending(false);
    };

    useEffect(() => {
        if (messagesScrollDown.current) {
            messagesScrollDown.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [trelloCommentsData]);

    return (
        <Sheet open={!!openRowId} onOpenChange={handleCloseSheet}>
            <SheetContent className="min-w-[67%] sm:w-[540px]">
                <SheetHeader>
                    <SheetTitle className="flex">{currentCard?.name}</SheetTitle>
                    <SheetDescription>
                        {sheetType === "chat" ? "Chat" : "Cartão Trello"}
                    </SheetDescription>
                </SheetHeader>
                <div className={`snap-y overflow-y-auto ${sheetType === "chat" ? "h-[80%]" : "h-[92%]"}`}>

                    {sheetType === "chat" ? (
                        Array.isArray(trelloCommentsData) && trelloCommentsData.length > 0 ? (
                            trelloCommentsData.map((comment: any, index: number) => (
                                <>
                                    <div key={index} className={cn("flex items-start gap-2.5 pt-6", comment.isCreatedByChat && "flex items-start justify-end gap-2.5 pt-6 mr-4")}>
                                        <div className="flex flex-col gap-1 w-full max-w-[520px]">
                                            <div className="flex items-center space-x-2 rtl:space-x-reverse">
                                                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                                                    {comment.name}
                                                </span>
                                                <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                                    {new Date(comment.date).toLocaleString()}
                                                </span>
                                            </div>
                                            <div className="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                                                <p className="text-sm font-normal text-gray-900 dark:text-white">
                                                    <ReactMarkdown
                                                        className="prose leading-8"
                                                        components={{
                                                            p: ({ node, ...props }) => <p {...props} className="mb-4" />,
                                                            a: ({ node, ...props }) => (
                                                                <a {...props} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                                                                    {props.children}
                                                                </a>
                                                            ),
                                                        }}
                                                        skipHtml={false}
                                                        remarkPlugins={[remarkBreaks]}
                                                    >
                                                        {formatMarkdownMessage(comment.desc)}
                                                    </ReactMarkdown>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div ref={messagesScrollDown} />
                                </>
                            ))
                        ) : (
                            <p className="text-gray-500">Nenhum comentário encontrado.</p>
                        )
                    ) : (
                        <div className="snap-y h-[100%] overflow-y-auto">
                            <ReactMarkdown
                                className="prose leading-8"
                                components={{
                                    p: ({ node, ...props }) => <p {...props} className="mb-4" />,
                                    a: ({ node, ...props }) => (
                                        <a {...props} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                                            {props.children}
                                        </a>
                                    ),
                                }}
                                skipHtml={false}
                                remarkPlugins={[remarkBreaks]}
                            >
                                {formatMarkdownMessage(currentCard?.desc)}
                            </ReactMarkdown>
                        </div>
                    )}
                </div>
                <SheetFooter className="p-4 flex flex-col justify-between h-[18%]">
                    {sheetType === "chat" && (
                        <>
                            <Textarea
                                className="flex-1 resize-none mb-4"
                                placeholder="Escreva sua mensagem aqui..."
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                disabled={currentCard.status == "Finalizado" || isSending ? true : false}
                            />
                            <div className="flex flex-col min-w-[110px]">
                                {/* Botão de arquivo */}
                                <Button
                                    className="w-full mb-1 bg-[#d32b32] hover:bg-[#e85b61] flex justify-center items-center"
                                    disabled={currentCard.status === "Finalizado"}
                                    onClick={() => document.getElementById("fileInput")?.click()}
                                >
                                    <Input
                                        id="fileInput"
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) => {
                                            if (e.target.files) {
                                                setSelectedImages(Array.from(e.target.files)); // Converte FileList para um array
                                            }
                                        }}
                                        multiple
                                        disabled={currentCard.status === "Finalizado"}
                                    />
                                    <Images className="w-5 h-5 text-white" />
                                </Button>

                                {/* Botão de envio */}
                                <Button
                                    className="w-full bg-[#d32b32] hover:bg-[#e85b61]"
                                    onClick={handleSendMessage}
                                    disabled={currentCard.status == "Finalizado" || isSending ? true : false}
                                >
                                    {isSending ? (
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                    ) : (
                                        <>Enviar < SendHorizonal /></>
                                    )}
                                </Button>
                            </div>
                        </>
                    )}
                </SheetFooter>
            </SheetContent>
        </Sheet>

    );
}

export default SheetComponent;


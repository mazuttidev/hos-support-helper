"use client"

import React, { useState, useEffect } from "react";
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";
import { Label } from "@/components/ui/label";
import remarkBreaks from "remark-breaks";
import ReactMarkdown from "react-markdown";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import { BiChat, BiLogoTrello } from "react-icons/bi";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { TrelloCard } from "@/types/trelloTypes"
import useFetchTrelloCards from "@/hooks/useFetchTrelloCards"
import { Textarea } from "@/components/ui/textarea";
import useTrelloCommentsCards from "@/hooks/useTrelloCommentsCards";

const mockTrelloCards: TrelloCard[] = [
    {
        id: "1",
        name: "Integrar novo produto",
        desc: "Solicitação para integrar o novo produto ao sistema de vendas.",
        clientName: "TechCorp",
        requesterName: "John Doe",
        listName: "To Do",
        dateLastEdited: "2024-12-20T10:15:30.000Z",
        dateCreated: "2024-12-18T08:00:00.000Z",
    },
    {
        id: "2",
        name: "Corrigir erro na API",
        desc: "Erro reportado na integração com a API do fornecedor.",
        clientName: "DataFlow Inc.",
        requesterName: "Jane Smith",
        listName: "In Progress",
        dateLastEdited: "2024-12-21T12:45:00.000Z",
        dateCreated: "2024-12-19T09:30:00.000Z",
    },
    {
        id: "3",
        name: "Atualizar banco de dados",
        desc: "Requisição para atualização do banco de dados para a versão mais recente.",
        clientName: "CloudNet Solutions",
        requesterName: "Alice Johnson",
        listName: "Review",
        dateLastEdited: "2024-12-22T14:00:00.000Z",
        dateCreated: "2024-12-20T11:00:00.000Z",
    },
    {
        id: "4",
        name: "Configurar ambiente de teste",
        desc: "Solicitação para configurar um novo ambiente de teste para o cliente.",
        clientName: "GreenTech",
        requesterName: "Michael Brown",
        listName: "Done",
        dateLastEdited: "2024-12-21T16:30:00.000Z",
        dateCreated: "2024-12-17T07:45:00.000Z",
    },
    {
        id: "5",
        name: "Ajustar layout do painel",
        desc: "Requisição para ajustar o layout do painel administrativo.",
        clientName: "BrightStar",
        requesterName: "Emily Davis",
        listName: "To Do",
        dateLastEdited: "2024-12-20T09:15:00.000Z",
        dateCreated: "2024-12-19T10:00:00.000Z",
    },
];

export function DataTable() {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({});
    const boardId = import.meta.env.VITE_TRELLO_BOARD_ID;
    const { trelloCardData, loading, error } = useFetchTrelloCards(boardId);
    const [cardId, setCardId] = useState<string>(''); // Estado para armazenar o cardId
    const { trelloCommentsData, loadingComments, errorComments } = useTrelloCommentsCards(cardId); // Chama o hook com o cardId



    const [openRowId, setOpenRowId] = useState<string | null>(null);
    const [sheetType, setSheetType] = useState<"chat" | "trello" | null>(null);
    const handleOpenSheet = (id: string, type: "chat" | "trello") => {
        setOpenRowId(id);
        setSheetType(type);
        setCardId(id);
    };
    const handleCloseSheet = () => {
        setOpenRowId(null);
        setSheetType(null);
    };

    const columns: ColumnDef<TrelloCard>[] = [
        {
            id: "select",
            cell: ({ row }) => (
                <div className="flex gap-x-8 ">
                    <BiChat
                        className="cursor-pointer hover:scale-125"
                        size={18}
                        onClick={() => handleOpenSheet(row.original.id, "chat")}
                    />
                    <BiLogoTrello
                        className="cursor-pointer hover:scale-125"
                        size={18}
                        onClick={() => handleOpenSheet(row.original.id, "trello")}
                    />
                </div>
            ),
        },
        {
            accessorKey: "listName",
            header: "Status",
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("listName")}</div>
            ),
        },
        {
            accessorKey: "name",
            header: "Título",
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("name")}</div>
            ),
        },
        {
            accessorKey: "requesterName",
            header: "Técnico Responsável",
            cell: ({ row }) => <div className="lowercase">{row.getValue("requesterName")}</div>,
        },
        {
            accessorKey: "clientName",
            header: () => <div className="text-center">Cliente</div>,
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("clientName")}</div>
            ),
        },
        {
            accessorKey: "dateLastEdited",
            header: ({ column }) => {
                return (
                    <div className="text-center">
                        <Button
                            variant="ghost"
                            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        >
                            Altrerado em
                            <ArrowUpDown />
                        </Button>
                    </div>
                )
            },
            cell: ({ row }) => {
                const date = new Date(row.getValue("dateLastEdited"));
                const formattedDate = date.toLocaleDateString("pt-BR", {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: false,
                });
                return <div className="text-center">{formattedDate}</div>
            },
        },
        {
            accessorKey: "dateCreated",
            header: ({ column }) => {
                return (
                    <div className="text-center">
                        <Button
                            variant="ghost"
                            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        >
                            Altrerado em
                            <ArrowUpDown />
                        </Button>
                    </div>
                )
            },
            cell: ({ row }) => {
                const date = new Date(row.getValue("dateCreated"));
                const formattedDate = date.toLocaleDateString("pt-BR", {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: false,
                });
                return <div className="text-center">{formattedDate}</div>
            },
        },
    ]

    const table = useReactTable({
        data: trelloCardData,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    const currentCard = trelloCardData.find((card) => card.id === openRowId);

    const formatMessage = (jsonString: string): string => {
        const message = jsonString
            .replace(/\n\n/g, "\n") // Remove linhas extras
            .replace(/\\n/g, "\n") // Substitui caracteres escapados
            .replace(/(\*\w+):\*/g, "**$1:**") // Negrito para títulos
            .replace(/File \d <(https?:\/\/.+?)>/g, "- [File $1]($1)") // Converte links de anexos
            .replace(/<https?:\/\/.+?>/g, (match) => {
                const url = match.slice(1, -1);
                return `[${url}](${url})`;
            }); // Formata links
        return message.trim();
    }

    return (
        <div className="w-full">
            <div className="flex items-center py-4">
                <Input
                    placeholder="Filtre pelo título..."
                    value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("name")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Colunas <ChevronDown />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                )
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    Existem {table.getFilteredRowModel().rows.length} solicitações.
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div>


            {/* Sheet */}
            {openRowId && currentCard && (
                <Sheet open={!!openRowId} onOpenChange={handleCloseSheet}>
                    <SheetContent className="min-w-[67%] sm:w-[540px]">
                        <SheetHeader>
                            <SheetTitle>
                                {currentCard.name}
                            </SheetTitle>
                            <SheetDescription>
                                {
                                    sheetType === "chat"
                                        ? "Chat"
                                        : "Cartão Trello"
                                }
                            </SheetDescription>
                        </SheetHeader>
                        <div className="snap-y h-[80%] overflow-y-auto">
                            {
                                sheetType === "chat"
                                    ?
                                    trelloCommentsData.map((comment, index) => (
                                        <>
                                            <div key={index} className="flex items-start gap-2.5 pt-6">
                                                <div className="flex flex-col gap-1 w-full max-w-[520px]">
                                                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                                                        <span className="text-sm font-semibold text-gray-900 dark:text-white">{comment?.memberCreator?.fullName}</span>
                                                        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">{comment?.date}</span>
                                                    </div>
                                                    <div className="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                                                        <p className="text-sm font-normal text-gray-900 dark:text-white">
                                                            <ReactMarkdown
                                                                className="prose leading-8" // Opcional, para estilos
                                                                components={{
                                                                    p: ({ node, ...props }) => <p {...props} className="mb-4" />,
                                                                    a: ({ node, ...props }) => (
                                                                        <a {...props} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                                                                            {props.children}
                                                                        </a>
                                                                    ),
                                                                }}
                                                                skipHtml={false} // Processa HTML no conteúdo
                                                                remarkPlugins={[remarkBreaks]} // Adiciona suporte a quebras de linha
                                                            >
                                                                {formatMessage(comment?.data?.text)}
                                                            </ReactMarkdown></p>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <div className="flex items-start justify-end gap-2.5 pt-6 mr-4">
                                                <div className="flex flex-col gap-1 w-full max-w-[520px]">
                                                    <div className="flex items-center space-x-2 justify-end rtl:space-x-reverse">
                                                        <span className="text-sm font-semibold text-gray-900 dark:text-white">{comment.fullName}</span>
                                                        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">{comment.dateLastEdited}</span>
                                                    </div>
                                                    <div className="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                                                        <p className="text-sm font-normal text-gray-900 dark:text-white">{comment.text}</p>
                                                    </div>
                                                </div>
                                            </div> */}

                                        </>
                                    ))

                                    :
                                    <div className="snap-y h-[100%] overflow-y-auto">
                                        <ReactMarkdown
                                            className="prose leading-8" // Opcional, para estilos
                                            components={{
                                                p: ({ node, ...props }) => <p {...props} className="mb-4" />,
                                                a: ({ node, ...props }) => (
                                                    <a {...props} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                                                        {props.children}
                                                    </a>
                                                ),
                                            }}
                                            skipHtml={false} // Processa HTML no conteúdo
                                            remarkPlugins={[remarkBreaks]} // Adiciona suporte a quebras de linha
                                        >
                                            {formatMessage(currentCard.desc)}
                                        </ReactMarkdown>
                                    </div>
                            }
                        </div>
                        <SheetFooter className="p-4 flex flex-col h-[18%]">
                            {
                                sheetType === "chat"
                                    ?
                                    <>
                                        <Textarea className="flex-1 resize-none mb-4" placeholder="Escreva sua mensagem aqui..." />
                                        <Button className="self-end mb-4" onClick={handleCloseSheet}>Enviar</Button>
                                    </>
                                    :
                                    <></>
                            }

                        </SheetFooter>
                    </SheetContent>
                </Sheet>
            )}
        </div>
    )
}

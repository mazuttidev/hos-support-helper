"use client";

import React, { useEffect, useState } from "react";
import { ColumnDef, ColumnFiltersState, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable, VisibilityState } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { DataTable } from "../components/DataTable";
import SheetComponent from "../components/SheetComponent";
import useFetchTrelloCards from "@/hooks/useFetchTrelloCards";
import { TrelloCard } from "@/types";
import { BiChat, BiLogoTrello } from "react-icons/bi";
import { ArrowUpDown } from "lucide-react";
import Markdown from "react-markdown";

export default function Dashboard() {
    const [sorting, setSorting] = useState([{ id: "status", desc: false }]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = useState({});
    const [openRowId, setOpenRowId] = useState<string>('');
    const [sheetType, setSheetType] = useState<"chat" | "trello" | null>(null);
    const { trelloCardData, refetchCards } = useFetchTrelloCards();
    // Pega os responsáveis presentes na listagem
    const uniqueResponsibleNames = Array.from(
        new Set(trelloCardData.map((card) => card.requesterName))
    );
    const localUserName = localStorage.getItem("name") || "Todos"
    const responsibleOptions = Array.from(new Set(["Todos", localUserName, ...uniqueResponsibleNames.filter(name => name !== "Todos")]));
    const [responsibleFilter, setResponsibleFilter] = useState(localUserName);
    const handleResponsibleSelect = (value: string) => {
        setResponsibleFilter(value);
        table.getColumn("requesterName")?.setFilterValue(value === "Todos" ? "" : value);
    };
    //#region   Coluns of a Table 
    const columns: ColumnDef<TrelloCard>[] = [
        {
            id: "Ações",
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
            accessorKey: "status",
            header: ({ column }) => {
                return (
                    <div className="text-center w-[84px]">
                        <Button
                            variant="ghost"
                            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        >
                            Status
                            <ArrowUpDown />
                        </Button>
                    </div>
                )
            },
            cell: ({ row }) => (
                <div className="min-w-[84px]">{row.original.status}</div>
            ),
        },
        {
            accessorKey: "name",
            header: ({ column }) => {
                return (
                    <div className="text-center w-[84px]">
                        <Button
                            variant="ghost"
                            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        >
                            Título
                            <ArrowUpDown />
                        </Button>
                    </div>
                )
            },
            cell: ({ row }) => (
                <div className="min-w-[485px]">{row.original.name}</div>
            ),
        },
        {
            accessorKey: "requesterName",
            header: "Responsável",
            cell: ({ row }) => <div className="w-[168px]"><Markdown>{row.original.requesterName}</Markdown></div>,
        },
        {
            accessorKey: "clientName",
            header: ({ column }) => {
                return (
                    <div className="text-center w-[84px]">
                        <Button
                            variant="ghost"
                            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        >
                            Cliente
                            <ArrowUpDown />
                        </Button>
                    </div>
                )
            },
        },
        {
            accessorKey: "dateLastEdited",
            header: ({ column }) => {
                return (
                    <div className="text-center w-[150px]">
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
                const date = new Date(row.original.dateLastEdited);
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
                    <div className="text-center w-[150px]">
                        <Button
                            variant="ghost"
                            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        >
                            Criado em
                            <ArrowUpDown />
                        </Button>
                    </div>
                )
            },
            cell: ({ row }) => {
                return <div className="text-center">{row.original.dateCreated}</div>
            },
        },
    ]
    //#endregion

    const table = useReactTable({
        data: trelloCardData,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection
        },
    });
    const handleOpenSheet = (id: string, type: "chat" | "trello") => {
        setOpenRowId(id);
        setSheetType(type);
    };
    const handleCloseSheet = () => {
        setOpenRowId('');
        setSheetType(null);
    };
    const handleRefreshHelpForm = () => {
        refetchCards() 
    };

    useEffect(() => {
        refetchCards();

        const interval = setInterval(() => {
            refetchCards();
        }, 60000);
        return () => clearInterval(interval);
    }, [refetchCards]);

    useEffect(() => {
        table.getColumn("requesterName")?.setFilterValue(localUserName === "Todos" ? "" : localUserName);
    }, [table]);


    return (
        <div className="w-full">
            <DataTable
                table={table}
                columns={columns}
                responsibleOptions={responsibleOptions}
                responsibleFilter={responsibleFilter}
                handleResponsibleSelect={handleResponsibleSelect}
                handleRefreshHelpForm={handleRefreshHelpForm}
            />
            {openRowId && (
                <SheetComponent
                    sheetType={sheetType}
                    openRowId={openRowId}
                    handleCloseSheet={handleCloseSheet}
                    currentCard={trelloCardData.find((card) => card.id === openRowId)}
                />
            )}
        </div>
    );
}

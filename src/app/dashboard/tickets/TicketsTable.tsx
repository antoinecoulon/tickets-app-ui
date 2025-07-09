import Badge from "@/components/Badge";
import { Ticket } from "@/types/Ticket";
import { getPrioriteLabel, getPrioriteStyle, getStatutLabel, getStatutStyle } from "@/utils/ticketsBadges";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

type Props = {
  data: Ticket[];
};

export default function TicketsTable({ data }: Props) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const router = useRouter()

  const columns = useMemo<ColumnDef<Ticket>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
      },
      {
        accessorKey: "titre",
        header: ({ column }) => (
          <button onClick={() => column.toggleSorting()}>
            Titre{" "}
            {column.getIsSorted() === "asc"
              ? "↑"
              : column.getIsSorted() === "desc"
              ? "↓"
              : ""}
          </button>
        ),
      },
      {
        accessorKey: "description",
        header: "Description",
      },
      {
        accessorKey: "statut",
        header: ({ column }) => (
          <button onClick={() => column.toggleSorting()}>
            Statut{" "}
            {column.getIsSorted() === "asc"
              ? "↑"
              : column.getIsSorted() === "desc"
              ? "↓"
              : ""}
          </button>
        ),
        cell: ({ row }) => {
          const value = row.getValue("statut") as string
          return (
            <Badge label={getStatutLabel(value)} className={getStatutStyle(value)} />
          );
        },
      },
      {
        accessorKey: "priorite",
        header: ({ column }) => (
          <button onClick={() => column.toggleSorting()}>
            Priorité{" "}
            {column.getIsSorted() === "asc"
              ? "↑"
              : column.getIsSorted() === "desc"
              ? "↓"
              : ""}
          </button>
        ),
        cell: ({ row }) => {
          const value = row.getValue("priorite") as string;
          return (
            <Badge label={getPrioriteLabel(value)} className={getPrioriteStyle(value)} />
          );
        },
      },
      {
        accessorKey: "created_at",
        header: ({ column }) => (
          <button onClick={() => column.toggleSorting()}>
            Créé le{" "}
            {column.getIsSorted() === "asc"
              ? "↑"
              : column.getIsSorted() === "desc"
              ? "↓"
              : ""}
          </button>
        ),
        cell: ({ getValue }) => {
          const raw = getValue() as string;
          const date = new Date(raw);
          return date.toLocaleDateString("fr-FR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          });
        },
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="rounded-md border border-gray-300 overflow-x-auto">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-gray-100 text-gray-700">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="px-4 py-2 font-semibold">
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="divide-y divide-gray-200">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50 hover:cursor-pointer" onClick={() => router.push(`/dashboard/tickets/${row.original.id}`)}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-4 py-2">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

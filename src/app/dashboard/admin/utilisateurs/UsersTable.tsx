"use client";

import { User } from "@/types/User";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";

type Props = {
  data: User[];
};
export default function EntreprisesTable({ data }: Props) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns = useMemo<ColumnDef<User>[]>(
    () => [
      {
        accessorKey: "username",
        header: ({ column }) => (
          <button onClick={() => column.toggleSorting()}>
            Nom d'utilisateur{" "}
            {column.getIsSorted() === "asc"
              ? "↑"
              : column.getIsSorted() === "desc"
              ? "↓"
              : ""}
          </button>
        ),
      },
      {
        accessorKey: "email",
        header: ({ column }) => (
          <button onClick={() => column.toggleSorting()}>
            Email{" "}
            {column.getIsSorted() === "asc"
              ? "↑"
              : column.getIsSorted() === "desc"
              ? "↓"
              : ""}
          </button>
        ),
      },
      {
        accessorKey: "role",
        header: ({ column }) => (
          <button onClick={() => column.toggleSorting()}>
            Role{" "}
            {column.getIsSorted() === "asc"
              ? "↑"
              : column.getIsSorted() === "desc"
              ? "↓"
              : ""}
          </button>
        ),
      },
      {
        accessorKey: "entreprise.nom",
        header: ({ column }) => (
          <button onClick={() => column.toggleSorting()}>
            Entreprise{" "}
            {column.getIsSorted() === "asc"
              ? "↑"
              : column.getIsSorted() === "desc"
              ? "↓"
              : ""}
          </button>
        ),
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
            <tr key={row.id} className="hover:bg-gray-50">
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

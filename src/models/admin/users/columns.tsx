import { Button } from "@/components/ui/button.tsx";
import { ArrowUpDown } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

type User = {
  id: number;
  name: string;
  email: string;
  avatar_url: string;
  isAdmin: boolean;
  created_at: string;
  updated_at: string;
  role_id: number;
};

export const userColumns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "isAdmin",
    header: "Admin",
    cell: ({ row }) => {
      const isAdmin = row.original.isAdmin;
      return <div>{isAdmin ? "Yes" : "No"}</div>;
    },
  },
  {
    accessorKey: "created_at",
    header: "Created at",
    cell: ({ row }) => {
      const date = row.original.created_at;
      const formattedDate = date.slice(0, 10);
      return <div>{formattedDate}</div>;
    },
  },
  {
    accessorKey: "updated_at",
    header: "Updated at",
    cell: ({ row }) => {
      const date = row.original.updated_at;
      const formattedDate = date.slice(0, 10);
      return <div>{formattedDate}</div>;
    },
  },
];

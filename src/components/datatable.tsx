"use client";
import { cn } from "@/lib/utils/helpers";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationItem,
  PaginationContent,
  PaginationNext,
  PaginationPrevious,
  PaginationLink,
} from "@/components/ui/pagination";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  page: number;
  totalPages: number;
  actionsHandler?: ({
    action,
    data,
  }: {
    action: string;
    data?: TData | number;
  }) => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  page,
  totalPages,
  actionsHandler,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  const GeneratePagin = ({ count, page }: { count: number; page: number }) => {
    const paginationItems = [];
    for (let i = 0; i < count; i++) {
      paginationItems.push(
        <PaginationItem key={`pn${i + 1}`}>
          <PaginationLink
            isActive
            className={cn(page === i ? "bg-blue-300" : "")}
            onClick={() =>
              actionsHandler && actionsHandler({ action: "page", data: i })
            }
          >
            {i + 1}
          </PaginationLink>
        </PaginationItem>,
      );
    }
    return paginationItems;
  };
  return (
    <div className="rounded-md border flex flex-col justify-between">
      <div className="border">
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
                            header.getContext(),
                          )}
                    </TableHead>
                  );
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
                  {row
                    .getVisibleCells()
                    .map((cell) =>
                      cell.id != "actions" ? (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </TableCell>
                      ) : (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </TableCell>
                      ),
                    )}
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
      <div className="border">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => {
                  if (page > 0) {
                    if (actionsHandler)
                      actionsHandler({ action: "page", data: page - 1 });
                  } else {
                    console.log("the first page");
                  }
                }}
              />
            </PaginationItem>
            <GeneratePagin count={totalPages} page={page} />
            <PaginationItem>
              <PaginationNext
                onClick={() => {
                  if (page + 1 < totalPages) {
                    if (actionsHandler)
                      actionsHandler({ action: "page", data: page + 1 });
                  } else {
                    console.log("the last page");
                  }
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}

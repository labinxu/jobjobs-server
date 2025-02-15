import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/datatable";

interface TablePageProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  page: string;
  totalPages: number;
  actionsHandler?: ({
    action,
    data,
  }: {
    action: string;
    data?: TValue;
  }) => void;
}

export function TablePage<TData, TValue>({
  columns,
  data,
  page,
  totalPages,
  actionsHandler,
}: TablePageProps<TData, TValue>) {
  return (
    <main>
      <div className="container mx-auto">
        <DataTable<TData, TValue>
          data={data}
          columns={columns}
          page={page}
          totalPages={totalPages}
          actionsHandler={actionsHandler}
        />
      </div>
    </main>
  );
}

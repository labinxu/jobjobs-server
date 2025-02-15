"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
export type Task = {
  id: string;
  name: string;
  syncData: string;
  status: "pending" | "processing" | "success" | "failed";
};
export interface ICreateTaskTableColumns<TData> {
  tableAction: ({ action, data }: { action: string; data: TData }) => void;
}
export function CreateColumns<TData>({
  tableAction,
}: ICreateTaskTableColumns<TData>): ColumnDef<TData>[] {
  return [
    { accessorKey: "name", header: "任务名称" },
    { accessorKey: "id", header: "任务ID" },
    { accessorKey: "syncData", header: "同步数据" },
    { accessorKey: "status", header: "运行状态" },
    {
      id: "actions",
      header: "操作",
      cell: ({ row }) => {
        const data = row.original;

        if (data.status !== "processing") {
          return (
            <div>
              <Button
                variant="link"
                onClick={() => tableAction({ action: "start", data })}
              >
                启动
              </Button>
              <Button
                variant="link"
                onClick={() => tableAction({ action: "delete", data })}
              >
                删除
              </Button>
            </div>
          );
        } else {
          return (
            <Button
              variant="link"
              onClick={() => tableAction({ action: "stop", data })}
            >
              停止
            </Button>
          );
        }
      },
    },
  ];
}

export const columns1: ColumnDef<Task>[] = [
  { accessorKey: "name", header: "任务名称" },
  { accessorKey: "id", header: "任务ID" },
  {
    accessorKey: "syncData",
    header: "同步数据",
  },
  {
    accessorKey: "status",
    header: "运行状态",
  },
  {
    id: "actions",
    header: "操作",
    cell: ({ row }) => {
      const data = row.original;
      console.log(data.status);

      if (data.status != "processing") {
        return (
          <div>
            <Button variant={"link"}>启动</Button>
            <Button variant={"link"}>删除</Button>
          </div>
        );
      } else {
        return <Button variant={"link"}>停止</Button>;
      }
    },
  },
];

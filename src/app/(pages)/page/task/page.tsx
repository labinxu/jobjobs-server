"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Task, CreateColumns } from "./columns";
import { TaskDialog } from "./_components/task-dialog";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { DataTable } from "@/components/datatable";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { redirect } from "next/navigation";
const headers = { "Content-Type": "application/json" };
export default function TaskPage() {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [rowData, setRowData] = useState([]);
  const [total, setTotal] = useState(0);
  const { isPending, error, data } = useQuery({
    queryKey: ["task", page, pageSize],
    queryFn: () =>
      fetch(`/api/task?page=${page}&size=${pageSize}`, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      }).then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          toast.error("please login");
          return { page: 0, size: 0, rowData: [] };
        }
      }),
  });
  useEffect(() => {
    if (isPending) return;
    const { page, size, total, rowData } = data;
    setPage(page);
    setPageSize(size);
    setRowData(rowData);
    setTotal(total);
  }, [data]);

  if (isPending) return "Loading...";

  const deleteTask = (task: Task | undefined) => {
    if (!task) return;
    fetch("/api/task", {
      method: "DELETE",
      credentials: "include",
      headers: headers,
      body: JSON.stringify(task),
    }).then((resp) => {
      if (resp.ok) {
        toast.info("Task delete successfully!");
        queryClient.invalidateQueries();
      } else {
        toast.error("Tassk delete faild!");
        redirect("/auth/login");
      }
    });
  };
  const handlePageChange = (page: number) => {
    setPage(page);
  };
  const totalPages = Math.ceil(total / pageSize);
  const tableActionsHandler = ({
    action,
    data,
  }: {
    action: string;
    data?: Task | number;
  }) => {
    console.log("action", action, data);
    if (action === "delete") {
      if (typeof data !== "number") {
        deleteTask(data);
      }
    } else if (action === "page" && typeof data === "number") {
      if (page != data) {
        handlePageChange(data);
      }
    }
  };
  if (error) return "An error has occurred: " + error.message;
  const columns = CreateColumns<Task>({ tableAction: tableActionsHandler });
  return (
    <main>
      <div className="flex flex-2 justify-between2 gap-5 p-2">
        <Label className="flex items-center">商品查询</Label>
        <Button
          variant="link"
          className="hover:text-blue-500 "
          onClick={() => {
            console.log("sync task");
          }}
        >
          同步任务
        </Button>
      </div>
      <Separator />
      <div className="flex flex-col gap-4">
        <div className="flex justify-start p-2">
          <TaskDialog />
        </div>
        <div className="container w-full">
          <DataTable
            data={rowData}
            columns={columns}
            page={page}
            totalPages={totalPages}
            actionsHandler={tableActionsHandler}
          />
        </div>
      </div>
    </main>
  );
}

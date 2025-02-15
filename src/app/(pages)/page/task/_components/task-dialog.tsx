"use client";
import { useQueryClient } from "@tanstack/react-query";
import * as z from "zod";
import { useRef } from "react";
import { CreateTaskSchema } from "@/schemas";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useState } from "react";
import { toast } from "sonner";
import { TaskForm, TaskFormRef } from "./form";

export function TaskDialog() {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const taskFormRef = useRef<TaskFormRef>(null);

  const onSubmit = async (values: z.infer<typeof CreateTaskSchema>) => {
    values.status = "created";
    try {
      const resp = await fetch("/api/task", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!resp.ok) {
        const errorData = await resp.json();
        toast.error(
          `Task creation failed: ${errorData.message || resp.statusText}`,
        );
        return;
      }

      toast.info("Task create successful!");
      queryClient.invalidateQueries(); // Invalidate only the tasks query
      setOpen(false);
    } catch (error) {
      toast.error(
        `Task creation failed: ${error || "An unexpected error occurred."}`,
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="link">新增任务</Button>
      </DialogTrigger>
      <DialogContent className="max-w-fit">
        <DialogHeader className="flex">
          <DialogTitle className="flex justify-center">新增任务</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <TaskForm handleSubmit={onSubmit} ref={taskFormRef} />
        <DialogFooter className="sm:justify-end">
          <Button
            variant={"link"}
            key={"submit"}
            onClick={() => {
              taskFormRef.current?.onSubmit();
            }}
          >
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

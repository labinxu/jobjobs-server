import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { forwardRef, useImperativeHandle } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CreateTaskSchema } from "@/schemas";

const platforms = [
  { id: "taobao/tianmao", label: "淘宝/天猫" },
  { id: "jingdong", label: "京东" },
  { id: "pingduoduo", label: "平多多" },
  { id: "douyinshangchen", label: "抖音商城" },
];

interface Platform {
  id: string;
  label: string;
}

export interface TaskFormRef {
  onSubmit: () => void;
}

interface FormProps {
  handleSubmit: (values: z.infer<typeof CreateTaskSchema>) => void;
}

const TaskForm = forwardRef<TaskFormRef, FormProps>(({ handleSubmit }, ref) => {
  const form = useForm<z.infer<typeof CreateTaskSchema>>({
    resolver: zodResolver(CreateTaskSchema),
    defaultValues: {
      name: "任务1",
      keywords: "",
      platform: ["taobao/tianmao"],
      syncStrategy: false,
      status: "created",
      syncData: "商品,商家,价格",
      update_time: new Date().toISOString(),
    },
  });

  useImperativeHandle(ref, () => ({
    onSubmit: async () => {
      try {
        const isValid = await form.trigger();
        if (isValid) {
          const values = form.getValues();
          values.syncStrategy = values.syncStrategy ? "true" : "false";
          handleSubmit(values);
        } else {
          console.log("Validation failed");
        }
      } catch (error) {
        console.error("Error during form submission:", error);
      }
    },
  }));

  return (
    <Form {...form}>
      <form className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center py-4 gap-4">
              <FormLabel htmlFor="id_taskname" className="w-20">
                任务名称
              </FormLabel>
              <FormControl>
                <Input id="id_taskname" {...field} className="w-60" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="keywords"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center py-4 gap-4">
              <FormLabel htmlFor="id_keywords" className="w-20">
                关键字
              </FormLabel>
              <FormControl>
                <Input id="id_keywords" {...field} className="w-60" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="platform"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center gap-4">
              <span className="w-20">同步平台</span>
              {platforms.map((platform: Platform) => (
                <FormItem
                  key={platform.id}
                  className="flex flex-row items-start space-x-3 space-y-0"
                >
                  <FormControl>
                    <Checkbox
                      checked={field.value?.includes(platform.id)}
                      onCheckedChange={(checked: boolean | undefined) => {
                        const newValues = new Set(field.value);
                        if (checked) {
                          newValues.add(platform.id);
                        } else {
                          newValues.delete(platform.id);
                        }
                        field.onChange(Array.from(newValues));
                      }}
                    />
                  </FormControl>
                  <span className="text-sm font-normal w-20">
                    {platform.label}
                  </span>
                </FormItem>
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="syncStrategy"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center py-4 gap-4">
              <span className="w-20">同步策略</span>
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={(checked: boolean) => {
                    field.onChange(checked);
                  }}
                />
              </FormControl>
              <span className="text-sm font-normal w-40">每天晚上12点同步</span>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="syncData"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center py-4 gap-4">
              <FormLabel htmlFor="id_syncData" className="w-20">
                同步数据
              </FormLabel>
              <FormControl>
                <Input id="id_syncData" {...field} className="w-60" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
});

TaskForm.displayName = "TaskForm";
export { TaskForm };

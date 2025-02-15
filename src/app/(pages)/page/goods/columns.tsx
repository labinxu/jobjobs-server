"use client";
import { ColumnDef } from "@tanstack/react-table";
export interface IGoods {
  id: string;
  sku_name: string;
  sku_id: string;
  shop_name: string;
  final_price: string;
  jd_price: string;
  detail: string;
  taskId: string;
  source: string;
  update_time: Date;
}
const CreateColumns = (): ColumnDef<IGoods>[] => [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "taskId", header: "任务ID" },
  { accessorKey: "sku_name", header: "SKU" },
  { accessorKey: "shop_name", header: "商家" },
  { accessorKey: "final_price", header: "价格" },
  { accessorKey: "jd_price", header: "JD价" },
  { accessorKey: "detail", header: "详情" },
  { accessorKey: "update_time", header: "更新时间" },
];

export default CreateColumns;

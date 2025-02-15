"use client";
import { useState, useEffect } from "react";
import { subDays } from "date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import CreateColumns, { IGoods } from "./columns";
import { TablePage } from "./_pages/table";
import { ChartsPage } from "./_pages/charts";
import { SelectShop } from "./_pages/selectShop";
import { Button } from "@/components/ui/button";
import { DatePickerWithRange } from "@/components/date-picker";
import { DateRange } from "react-day-picker";

export default function DataPage() {
  const [pn, setPn] = useState("0");
  const [size, setSize] = useState(10);
  const [rowData, setRowData] = useState<IGoods[]>([]);
  const [total, setTotal] = useState(0);
  const [shop, setShop] = useState("ALL");
  const [shops, setShops] = useState<string[]>([]);
  const [timeFrom, setTimeForm] = useState<string>();
  const [timeTo, setTimeTo] = useState<string>();
  const [date, setDate] = useState<DateRange | undefined>({
    from: subDays(new Date(), 30),
    to: new Date(),
  });

  const { isPending, error, data } = useQuery({
    queryKey: ["data", pn, size, timeFrom, timeTo],
    queryFn: () =>
      fetch(
        `/api/goods?page=${pn}&size=${size}`, //`&start=${timeFrom}&end=${timeTo}`,
        {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        },
      ).then((res) => {
        console.log(res.status);
        if (res.ok) {
          return res.json();
        } else {
          return { page: 0, size: 0, rowData: [] };
        }
      }),
  });
  useEffect(() => {
    if (isPending) return;
    const { page, size, total, rowData } = data;
    setPn(page);
    setSize(size);
    setTotal(total);
    if (!rowData) {
      console.log("fetch goods data failed");
      setRowData([]);
      return;
    }
    const shops_ = rowData.map((v: IGoods) => v.shop_name);
    shops_.unshift("ALL");
    setShops(Array.from(new Set(shops_)));
    if (shop === "ALL" || shop === "") {
      setRowData(rowData);
    } else {
      const shopData = rowData.filter((r: IGoods) => r.shop_name === shop);

      setRowData(shopData);
    }
  }, [data, shop, pn, isPending]);
  if (isPending) return <div>Data Loading... </div>;
  if (error) return "An error has occurred: " + error.message;
  const totalPages = Math.ceil(total / size);

  const columns = CreateColumns();
  const handlePageChange = (page: string) => {
    setPn(page);
  };
  const tableActionsHandler = ({
    action,
    data,
  }: {
    action: string;
    data?: string;
  }) => {
    console.log("action", action, data);
    if (action === "page") {
      handlePageChange(data || "0");
    }
  };
  const handleShopChange = (value: string) => {
    setShop(value);
  };
  return (
    <div>
      <div className="flex flex-row items-center">
        <DatePickerWithRange date={date} setDateAction={setDate} />
        <Button
          variant="link"
          onClick={() => {
            setPn("0");
            setTimeForm(date?.from?.toISOString());
            setTimeTo(date?.to?.toISOString());
          }}
        >
          查询
        </Button>
        <SelectShop
          shops={shops}
          value={shop}
          onValueChangeAction={handleShopChange}
        />
      </div>
      <Tabs defaultValue="account" className="w-full">
        <TabsList>
          <TabsTrigger value="goods">数据</TabsTrigger>
          <TabsTrigger value="charts">图表</TabsTrigger>
        </TabsList>
        <TabsContent value="goods">
          <TablePage<IGoods, string>
            data={rowData}
            page={pn}
            totalPages={totalPages}
            columns={columns}
            actionsHandler={tableActionsHandler}
          />
        </TabsContent>
        <TabsContent value="charts">
          <div className="w-80 h-80">
            <ChartsPage
              data={rowData}
              title={`from ${date?.from?.toLocaleString()} to ${date?.to?.toLocaleString()}`}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

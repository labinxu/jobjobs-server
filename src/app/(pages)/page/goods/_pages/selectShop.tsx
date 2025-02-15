"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SelectShop({
  shops,
  value,
  onValueChangeAction,
}: {
  shops: string[];
  value: string;
  onValueChangeAction: (value: string) => void;
}) {
  return (
    <div className="p-1">
      <Select onValueChange={onValueChangeAction} value={value}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="选择商家" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {shops.map((shop) => (
              <SelectItem key={shop} value={shop}>
                {shop}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

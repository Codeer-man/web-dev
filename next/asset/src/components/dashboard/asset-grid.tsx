import Image from "next/image";
import React from "react";
import { Badge } from "../ui/badge";

type Assets = {
  id: string;
  title: string;
  description: string | null;
  fileUrl: string;
  isAppreoved: string;
  categoryId: number;
  createdAt: Date | null;
};

interface AssetGridProp {
  assets: Assets[];
}
export default function AssetGrid({ assets }: AssetGridProp) {
  return (
    <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {assets.map((assets) => (
        <div
          key={assets.id}
          className="border rounded-lg overflow-hidden bg-white shadow-sm hover:shadow transition-shadow"
        >
          <div className="h-48 bg-slate-100 relative">
            <Image
              src={assets.fileUrl}
              alt={assets.title}
              fill
              className=" object-cover"
            />
            <div className=" absolute top-2 right-2">
              <Badge
                className={
                  assets.isAppreoved === "approved"
                    ? "bg-teal-500"
                    : assets.isAppreoved === "rejected"
                    ? "bg-red-500"
                    : "bg-yellow-500"
                }
                variant={"default"}
              >
                {assets.isAppreoved === "approved"
                  ? "Approved"
                  : assets.isAppreoved === "rejected"
                  ? "Rejected"
                  : "Pending"}
                s
              </Badge>
            </div>
          </div>
          <div className="p-4">
            <h3 className=" font-medium truncate">
              {assets.description && (
                <p className="text-xs text-slate-600">{assets.description} </p>
              )}
            </h3>
          </div>
        </div>
      ))}
    </div>
  );
}

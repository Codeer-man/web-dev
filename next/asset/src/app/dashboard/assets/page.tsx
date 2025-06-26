import { getCategoriesAction } from "@/actions/admin/dashboard-user";
import AssetGrid from "@/components/dashboard/asset-grid";
import UploadAsset from "@/components/dashboard/upload";
import React from "react";

export default async function DashBoardAssets() {
  const [categories] = await Promise.all([getCategoriesAction()]);

  return (
    <div className=" container py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-extrabold"> My Assets</h1>
        <UploadAsset categories={categories || []} />
      </div>
      <div>
        <AssetGrid />
      </div>
    </div>
  );
}

import {
  getCategoriesAction,
  getUserAssetsActions,
} from "@/actions/admin/dashboard-user";
import AssetGrid from "@/components/dashboard/asset-grid";
import UploadAsset from "@/components/dashboard/upload";
import { auth } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";
import { headers } from "next/headers";
import React from "react";

export default async function DashBoardAssets() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session === null) return null;

  const [categories, assets] = await Promise.all([
    getCategoriesAction(),
    getUserAssetsActions(session?.user?.id),
  ]);

  console.log(assets);

  return (
    <div className=" container py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-extrabold"> My Assets</h1>
        <UploadAsset categories={categories || []} />
      </div>
      <div>
        <AssetGrid assets={assets} />
      </div>
    </div>
  );
}

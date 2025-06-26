import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User } from "lucide-react";
import CategoryManagement from "@/components/category/category-manager";
import {
  getAllCategoryAction,
  getUserCountAction,
} from "@/actions/admin/admin-actoins";

export default async function Setting() {
  const [categories, totaluser] = await Promise.all([
    getAllCategoryAction(),
    getUserCountAction(),
  ]);

  return (
    <div className="container py-10 px-7">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Settings</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white shadow-md hover:shadow-lg transition duration-300">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-lg font-semibold text-gray-800">
              <User className="mr-2 h-5 w-5 text-teal-500" />
              Total Users
            </CardTitle>
            <CardDescription className="text-gray-500">
              All registered users on the platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-teal-600">{totaluser}</p>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-md hover:shadow-lg transition duration-300">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-lg font-semibold text-gray-800">
              <User className="mr-2 h-5 w-5 text-teal-500" />
              Total Assets
            </CardTitle>
            <CardDescription className="text-gray-500">
              All uplaoded assets on the platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-teal-600">1000</p>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Category Management</CardTitle>
        </CardHeader>
        <CardContent>
          <CategoryManagement categories={categories} />
        </CardContent>
      </Card>
    </div>
  );
}

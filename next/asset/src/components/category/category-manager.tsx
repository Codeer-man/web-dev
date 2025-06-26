"use client";

import { Ghost, icons, Plus, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Category, cateroryManageProps } from "@/types";
import { useState } from "react";
import {
  addNewCategoryAction,
  deleteCategoryAction,
} from "@/actions/admin/admin-actoins";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

export default function CategoryManagement({
  categories: initialCategory,
}: cateroryManageProps) {
  const [category, setCategory] = useState<Category[]>(initialCategory);
  const [newCategoryName, setNewCategory] = useState("");

  async function handleAddNewCategory(e: React.FormEvent) {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", newCategoryName);

      const result = await addNewCategoryAction(formData);

      if (result.success) {
        const newCategory = {
          id: Math.max(0, ...category.map((d) => d.id)) + 1,
          name: newCategoryName,
          createdAt: new Date(),
        };
        setCategory([...category, newCategory]);
        setNewCategory("");
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDelete(id: number) {
    try {
      const result = await deleteCategoryAction(id);

      if (result.success) {
        setCategory(category.filter((c) => c.id !== id));
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleAddNewCategory} className="space-y-4">
        <div className="space-y-2">
          <Label>New Category</Label>
          <div className="flex gap-2">
            <Input
              placeholder="Enter the category name"
              id="category"
              value={newCategoryName}
              onChange={(e) => setNewCategory(e.target.value)}
            />
            <Button
              type="submit"
              className="bg-teal-500 hover:bg-teal-600 text-white font-semibold cursor-pointer"
            >
              <Plus className="h-4  w-4 mr-2" />
              Add
            </Button>
          </div>
        </div>
      </form>
      <div>
        <h3 className="text-lg font-bold mb-4">
          {category.length === 0 ? (
            <p>No Categories Found.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {category.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.createdAt.toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Button
                        onClick={() => handleDelete(item.id)}
                        variant={"ghost"}
                        size={"icon"}
                        className="hover:text-red-600 cursor-pointer"
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </h3>
      </div>
    </div>
  );
}

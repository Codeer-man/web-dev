"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Plus, Upload } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { cateroryManageProps } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type formState = {
  title: string;
  description: string;
  categoryId: string;
  file: File | null;
};

type CloudinarySignature = {
  timestamp: number;
  apiKey: string;
  signature: string;
};

export default function UploadAsset({ categories }: cateroryManageProps) {
  const [open, setOpen] = useState(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadinProgessbar, setUplaodingProgessBar] = useState(0);
  const [formdata, setFormData] = useState<formState>({
    title: "",
    description: "",
    categoryId: "",
    file: null,
  });

  function handleInputChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (file) {
      setFormData((prev) => ({
        ...prev,
        file,
      }));
    }
  }

  function handleCategoryChange(value: string) {
    setFormData((prev) => ({ ...prev, categoryId: value }));
  }

  async function generateSignature(): Promise<CloudinarySignature> {
    const timestamp = Math.round(new Date().getTime()) / 1000;
    console.log(timestamp);

    const response = await fetch("/api/cloudinary/signature", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ timestamp }),
    });

    if (!response.ok) {
      throw new Error("Failed to create image signature");
    }

    return response.json();
  }

  async function handleAssetUpload(e: React.FormEvent) {
    e.preventDefault();
    try {
      const { apiKey, timestamp, signature } = await generateSignature();
      console.log(signature);

      const cloudinaryForm = new FormData();
      cloudinaryForm.append("file", formdata.file as File);
      cloudinaryForm.append("api_key", apiKey.toString());
      cloudinaryForm.append("timestamp", timestamp.toString());
      cloudinaryForm.append("signature", signature);
      cloudinaryForm.append("folder", "Next-asset-management");

      const xhr = new XMLHttpRequest();
      xhr.open(
        "POST",
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/auto/upload`
      );

      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          const progess = Math.round((e.loaded / e.total) * 100);
          setUplaodingProgessBar(progess);
        }
      };

      const cloudianryPromise = new Promise<any>((resolve, reject) => {
        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            const response = JSON.parse(xhr.responseText);
            resolve(response);
          } else {
            reject(new Error("upload to cloudinary failed"));
          }
        };
        xhr.onerror = () => reject(new Error("upload to cloudinary failed"));
      });

      xhr.send(cloudinaryForm);

      const cloudinaryResponse = await cloudianryPromise;
      console.log(cloudinaryResponse, "cloud res");

      const formData = new FormData();

      formData.append("title", formdata.title);
      formData.append("categoryId", formdata.categoryId);
      formData.append("description", formdata.description);
      formData.append("fileUrl", cloudinaryResponse.secure_url);
      formData.append("thumnail", cloudinaryResponse.secure_url);
      formData.append("publicId", cloudinaryResponse.public_id);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-5 px-4 rounded cursor-pointer">
          <Plus className="mr-2 w-4 h-4" />
          Upload Assets
        </Button>
      </DialogTrigger>
      <DialogContent className=" sm:max:w-[600px]">
        <DialogHeader>
          <DialogTitle>Upload New Assets</DialogTitle>
          <DialogDescription>Upload new </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleAssetUpload} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              onChange={handleInputChange}
              value={formdata.title}
              placeholder="Enter title..."
              id="title"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              onChange={handleInputChange}
              value={formdata.description}
              placeholder="Enter description..."
              id="description"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="file">Image</Label>

            <Input
              onChange={handleFileChange}
              id="file"
              type="file"
              accept="images/*"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select
              onValueChange={handleCategoryChange}
              value={formdata.categoryId}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
                <SelectContent>
                  {categories.map((item: any) => (
                    <SelectItem key={item.id} value={item.name}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </SelectTrigger>
            </Select>
          </div>
          <DialogFooter>
            <Button type="submit">
              <Upload className="mr-2 h-5 w-5" /> submit
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

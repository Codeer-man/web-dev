"use client";

import React from "react";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";

interface DeletePost {
  postId: number;
}

export default function PostDeleteButton({ postId }: DeletePost) {
  return (
    <>
      <Button variant={"destructive"} size={"sm"}>
        Delete <Trash2 />
      </Button>
    </>
  );
}

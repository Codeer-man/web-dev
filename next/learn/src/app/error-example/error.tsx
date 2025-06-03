"use client";

import React, { useEffect } from "react";

export default function ErrorUI({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    //log the error in here
  }, [error]);

  return (
    <div className="text-red-700 text-5xl">
      {error.message || "An error occured"}
    </div>
  );
}

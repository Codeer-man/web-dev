"use client";

import { useLinkStatus } from "next/link";

export default function loading() {
  const { pending } = useLinkStatus();

  return pending ? <div className="spinner">Loading</div> : null;
}

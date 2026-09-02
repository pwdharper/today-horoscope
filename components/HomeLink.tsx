"use client";

import { ArrowLeft } from "@phosphor-icons/react";
import Link from "next/link";
import { clearFortuneRequest } from "@/lib/fortune";

export function HomeLink() {
  return (
    <Link
      href="/"
      onClick={clearFortuneRequest}
      className="mt-12 inline-flex w-fit items-center gap-2 text-[15px] font-medium text-ink underline decoration-hairline underline-offset-4 transition-colors hover:text-coral focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-coral"
    >
      <ArrowLeft size={16} weight="bold" aria-hidden="true" />
      다른 이름으로 보기
    </Link>
  );
}

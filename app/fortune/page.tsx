import type { Metadata } from "next";
import { FortuneView } from "@/components/FortuneView";

export const metadata: Metadata = {
  title: "오늘의 편지",
};

export default function FortunePage() {
  return <FortuneView />;
}

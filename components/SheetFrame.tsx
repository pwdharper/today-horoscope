import type { ReactNode } from "react";
import { formatSeoulDate } from "@/lib/date";

type SheetFrameProps = {
  children: ReactNode;
  width?: "form" | "letter";
};

export function SheetFrame({ children, width = "form" }: SheetFrameProps) {
  const dateLabel = formatSeoulDate();
  const widthClass = width === "letter" ? "max-w-[40rem]" : "max-w-[28rem]";

  return (
    <div className="relative min-h-[100dvh] overflow-x-hidden bg-desk">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_640px_at_100%_-10%,color-mix(in_srgb,var(--coral)_18%,transparent),transparent_58%)]"
      />
      <div className={`relative mx-auto w-full px-4 py-10 sm:px-8 sm:py-14 lg:mx-0 lg:ml-[8vw] lg:px-0 ${widthClass}`}>
        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-0 z-[2] h-[52px] w-[38px] -translate-x-1/2 -translate-y-[18px] rounded-[3px] bg-[linear-gradient(180deg,#8b97a6_0%,#6d7888_100%)] shadow-[0_8px_16px_color-mix(in_srgb,var(--ink)_22%,transparent)]"
          >
            <span className="absolute left-1/2 top-[9px] h-[10px] w-[10px] -translate-x-1/2 rounded-full bg-[color-mix(in_srgb,var(--ink)_28%,#8b97a6)]" />
          </div>

          <div className="relative z-[1] border border-hairline bg-paper px-6 pb-10 pt-14 shadow-[0_18px_40px_color-mix(in_srgb,var(--ink)_12%,transparent)] sm:px-9 sm:pb-12 sm:pt-16">
            <header className="mb-10 flex items-baseline justify-between gap-4 border-b border-hairline pb-4">
              <p className="text-[15px] font-semibold tracking-tight text-ink">오늘의 편지</p>
              <time className="text-right text-[13px] leading-5 text-ink-soft">{dateLabel}</time>
            </header>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

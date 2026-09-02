import { FortuneForm } from "@/components/FortuneForm";
import { SheetFrame } from "@/components/SheetFrame";
import { seoulIsoDate } from "@/lib/date";

export const dynamic = "force-dynamic";

export default function HomePage() {
  const todayIso = seoulIsoDate();

  return (
    <SheetFrame>
      <h1 className="max-w-[12ch] text-[2rem] font-semibold leading-[1.2] tracking-tight text-ink sm:text-[2.35rem]">
        오늘 아침, 당신 앞으로.
      </h1>
      <p className="mt-4 mb-10 max-w-[36ch] text-[16px] leading-7 text-ink-soft">
        이름과 태어난 날을 적으면 오늘 하루의 편지를 엽니다.
      </p>
      <FortuneForm todayIso={todayIso} />
    </SheetFrame>
  );
}

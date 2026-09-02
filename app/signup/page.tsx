import type { Metadata } from "next";
import { SignupForm } from "@/components/SignupForm";
import { SheetFrame } from "@/components/SheetFrame";

export const metadata: Metadata = {
  title: "회원가입 · 오늘의 편지",
};

export default function SignupPage() {
  return (
    <SheetFrame>
      <h1 className="max-w-[12ch] text-[2rem] font-semibold leading-[1.2] tracking-tight text-ink sm:text-[2.35rem]">
        편지를 받을 자리를 만듭니다.
      </h1>
      <p className="mt-4 mb-10 max-w-[36ch] text-[16px] leading-7 text-ink-soft">
        구글로 바로 들어오거나, 이름과 이메일로 자리를 만들 수 있습니다.
      </p>
      <SignupForm />
    </SheetFrame>
  );
}

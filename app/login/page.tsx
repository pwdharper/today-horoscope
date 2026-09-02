import type { Metadata } from "next";
import { LoginForm } from "@/components/LoginForm";
import { SheetFrame } from "@/components/SheetFrame";

export const metadata: Metadata = {
  title: "로그인 · 오늘의 편지",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;

  return (
    <SheetFrame>
      <h1 className="max-w-[10ch] text-[2rem] font-semibold leading-[1.2] tracking-tight text-ink sm:text-[2.35rem]">
        다시 오셨군요.
      </h1>
      <p className="mt-4 mb-10 max-w-[36ch] text-[16px] leading-7 text-ink-soft">
        구글이나 이메일로 들어가면 오늘의 편지를 엽니다.
      </p>
      <LoginForm oauthFailed={params.error === "oauth"} />
    </SheetFrame>
  );
}

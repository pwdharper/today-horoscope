"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { AuthDivider, GoogleAuthButton } from "@/components/GoogleAuthButton";
import { mapAuthError, validateLogin, type LoginErrors } from "@/lib/auth";
import { createClient } from "@/lib/supabase/client";

type LoginFormProps = {
  oauthFailed?: boolean;
};

export function LoginForm({ oauthFailed = false }: LoginFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<LoginErrors>(
    oauthFailed
      ? { form: "구글 로그인을 끝내지 못했습니다. 다시 시도해 주세요." }
      : {},
  );
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateLogin(email, password);
    setErrors(nextErrors);
    if (nextErrors.email || nextErrors.password) return;

    setSubmitting(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    setSubmitting(false);

    if (error) {
      setErrors({ form: mapAuthError(error.message) });
      return;
    }

    router.replace("/");
    router.refresh();
  }

  return (
    <div className="flex flex-col gap-7">
      {errors.form ? (
        <p role="alert" className="text-[14px] leading-6 text-coral">
          {errors.form}
        </p>
      ) : null}

      <GoogleAuthButton
        disabled={submitting}
        onError={(message) => setErrors({ form: message })}
      />
      <AuthDivider />

      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-7">

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-[13px] font-medium text-ink">
          이메일
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
          className="h-11 border-0 border-b border-ink bg-transparent px-0 text-[16px] text-ink outline-none transition-[border-color] focus:border-coral"
        />
        {errors.email ? (
          <p id="email-error" role="alert" className="text-[13px] leading-5 text-coral">
            {errors.email}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="password" className="text-[13px] font-medium text-ink">
          비밀번호
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          aria-invalid={Boolean(errors.password)}
          aria-describedby={errors.password ? "password-error" : undefined}
          className="h-11 border-0 border-b border-ink bg-transparent px-0 text-[16px] text-ink outline-none transition-[border-color] focus:border-coral"
        />
        {errors.password ? (
          <p id="password-error" role="alert" className="text-[13px] leading-5 text-coral">
            {errors.password}
          </p>
        ) : null}
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="mt-1 h-[52px] w-full bg-coral text-[16px] font-semibold text-paper transition-colors hover:bg-coral-deep focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-coral active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-ink-soft disabled:text-paper"
      >
        {submitting ? "들어가는 중" : "로그인"}
      </button>

      <p className="text-[14px] leading-6 text-ink-soft">
        아직 계정이 없으면{" "}
        <Link
          href="/signup"
          className="font-medium text-ink underline decoration-hairline underline-offset-4 hover:text-coral"
        >
          회원가입
        </Link>
      </p>
    </form>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { AuthDivider, GoogleAuthButton } from "@/components/GoogleAuthButton";
import { mapAuthError, validateSignup, type SignupErrors } from "@/lib/auth";
import { createClient } from "@/lib/supabase/client";

export function SignupForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState<SignupErrors>({});
  const [notice, setNotice] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateSignup({ name, email, password, confirm });
    setErrors(nextErrors);
    setNotice("");
    if (nextErrors.name || nextErrors.email || nextErrors.password || nextErrors.confirm) {
      return;
    }

    setSubmitting(true);
    const supabase = createClient();
    const origin = window.location.origin;
    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        data: { full_name: name.trim() },
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });
    setSubmitting(false);

    if (error) {
      setErrors({ form: mapAuthError(error.message) });
      return;
    }

    if (!data.session) {
      setNotice("가입 확인 메일을 보내 드렸습니다. 메일 속 링크를 열면 로그인이 완료됩니다.");
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
      {notice ? (
        <p role="status" className="text-[14px] leading-6 text-ink">
          {notice}
        </p>
      ) : null}

      <GoogleAuthButton
        disabled={submitting}
        onError={(message) => setErrors({ form: message })}
      />
      <AuthDivider />

      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-7">

      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-[13px] font-medium text-ink">
          이름
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
          className="h-11 border-0 border-b border-ink bg-transparent px-0 text-[16px] text-ink outline-none transition-[border-color] focus:border-coral"
        />
        {errors.name ? (
          <p id="name-error" role="alert" className="text-[13px] leading-5 text-coral">
            {errors.name}
          </p>
        ) : null}
      </div>

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
          autoComplete="new-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          aria-invalid={Boolean(errors.password)}
          aria-describedby={errors.password ? "password-error" : "password-help"}
          className="h-11 border-0 border-b border-ink bg-transparent px-0 text-[16px] text-ink outline-none transition-[border-color] focus:border-coral"
        />
        <p id="password-help" className="text-[13px] leading-5 text-ink-soft">
          여섯 글자 이상이어야 합니다.
        </p>
        {errors.password ? (
          <p id="password-error" role="alert" className="text-[13px] leading-5 text-coral">
            {errors.password}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="confirm" className="text-[13px] font-medium text-ink">
          비밀번호 확인
        </label>
        <input
          id="confirm"
          name="confirm"
          type="password"
          autoComplete="new-password"
          value={confirm}
          onChange={(event) => setConfirm(event.target.value)}
          aria-invalid={Boolean(errors.confirm)}
          aria-describedby={errors.confirm ? "confirm-error" : undefined}
          className="h-11 border-0 border-b border-ink bg-transparent px-0 text-[16px] text-ink outline-none transition-[border-color] focus:border-coral"
        />
        {errors.confirm ? (
          <p id="confirm-error" role="alert" className="text-[13px] leading-5 text-coral">
            {errors.confirm}
          </p>
        ) : null}
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="mt-1 h-[52px] w-full bg-coral text-[16px] font-semibold text-paper transition-colors hover:bg-coral-deep focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-coral active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-ink-soft disabled:text-paper"
      >
        {submitting ? "만드는 중" : "회원가입"}
      </button>

      <p className="text-[14px] leading-6 text-ink-soft">
        이미 계정이 있으면{" "}
        <Link
          href="/login"
          className="font-medium text-ink underline decoration-hairline underline-offset-4 hover:text-coral"
        >
          로그인
        </Link>
      </p>
    </form>
    </div>
  );
}

"use client";

import { GoogleLogo } from "@phosphor-icons/react";
import { useState } from "react";
import { mapAuthError } from "@/lib/auth";
import { createClient } from "@/lib/supabase/client";

type GoogleAuthButtonProps = {
  disabled?: boolean;
  onError: (message: string) => void;
};

export function GoogleAuthButton({ disabled, onError }: GoogleAuthButtonProps) {
  const [pending, setPending] = useState(false);

  async function onClick() {
    setPending(true);
    const supabase = createClient();
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        skipBrowserRedirect: true,
      },
    });

    if (error || !data.url) {
      setPending(false);
      onError(mapAuthError(error?.message ?? "oauth"));
      return;
    }

    window.location.assign(data.url);
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || pending}
      className="flex h-[52px] w-full items-center justify-center gap-2 border border-ink bg-transparent text-[16px] font-semibold text-ink transition-colors hover:border-coral hover:text-coral focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-coral active:scale-[0.98] disabled:cursor-not-allowed disabled:border-ink-soft disabled:text-ink-soft"
    >
      <GoogleLogo size={18} weight="bold" aria-hidden="true" />
      {pending ? "구글로 연결하는 중" : "Google로 계속하기"}
    </button>
  );
}

export function AuthDivider() {
  return (
    <div className="flex items-center gap-3" aria-hidden="true">
      <span className="h-px flex-1 bg-hairline" />
      <span className="text-[12px] tracking-wide text-ink-soft">또는</span>
      <span className="h-px flex-1 bg-hairline" />
    </div>
  );
}
